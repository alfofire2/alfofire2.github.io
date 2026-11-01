// Calcolo del carrello per calculator.html: dati i prezzi di più articoli, sceglie come dividerli in ordini
// e quale coupon usare in ognuno per risparmiare di più. Nessuna dipendenza: gira nel browser e in node (test).
//
// Regole:
// - ogni articolo va intero in un solo ordine; un ordine ha un coupon oppure nessuno;
// - ogni codice si usa una volta sola in tutta la combo (due ordini non possono usare lo stesso codice);
// - il coupon vale se il totale dell'ordine raggiunge la spesa minima e non lo porta mai sotto zero;
// - ogni ordine ha il suo sconto del pagamento (PayPal...): la soglia più alta raggiunta dal totale dopo il coupon;
// - il cashback della squadra ha un tetto al giorno unico per tutta la combo:
//   cashback = min(tetto, somma della % sui singoli ordini dopo il pagamento);
// - a parità di risparmio vince la combo con meno ordini. La spedizione non è considerata.
// - valute: come nel calcolatore singolo, i coupon in $ e in € valgono alla pari.
//
// Ottimo esatto. Il risparmio è D + min(tetto, % × (totale − D)), con D = coupon + pagamento di tutti gli ordini:
// con la % sotto il 100% cresce sempre con D, quindi basta trovare la combo con D massimo (a parità, meno ordini).
// D si massimizza con una programmazione dinamica sui sottoinsiemi di articoli: prima la miglior divisione
// di ogni sottoinsieme in ordini senza coupon, poi un coupon alla volta, usato per un ordine o lasciato.
// Sono (coupon + 1) × 3^n passi: con 12 articoli e 18 coupon una decina di milioni, pochi millisecondi.
(function (radice) {
    'use strict';

    const MAX_ARTICOLI = 12;
    const NEG = -1e300;   // al posto di -Infinity, costante locale
    const K = 64;   // chiave = risparmio in centesimi × 64 − numero di ordini: confronta prima il risparmio, poi meno ordini

    const centesimi = v => Math.round(Number(v) * 100);

    // Sconto del pagamento sul totale dopo il coupon: la soglia più alta raggiunta, mai oltre il totale.
    function scontoPagamento(importo, soglie) {
        for (const t of soglie) if (importo >= t.min) return Math.min(t.sconto, importo);
        return 0;
    }

    function preparaSoglie(soglie) {
        return (soglie || [])
            .map(t => ({min: centesimi(t.min), sconto: Math.max(0, centesimi(t.sconto))}))
            .filter(t => Number.isFinite(t.min) && Number.isFinite(t.sconto))
            .sort((a, b) => b.min - a.min);
    }

    function preparaCoupon(coupons, totale) {
        const lista = [];
        (coupons || []).forEach(c => {
            const codice = String(c.codice || '').trim(), sconto = centesimi(c.sconto), min = centesimi(c.minSpesa || 0);
            if (!codice || !(sconto > 0) || !Number.isFinite(min) || min > totale) return;
            if (lista.some(x => x.codice === codice)) return;
            lista.push({codice, sconto, min, originale: c});
        });
        return lista;
    }

    // Da gruppi {maschera, coupon} a ordini con tutti gli importi, in euro, con il cashback diviso tra gli ordini.
    function concludi(gruppi, p, soglie, perc, tetto) {
        const ordini = gruppi.map(({maschera, coupon}) => {
            const articoli = [];
            let subtotale = 0;
            for (let i = 0; i < p.length; i++) if ((maschera >> i) & 1) { articoli.push(i); subtotale += p[i]; }
            const scontoCoupon = coupon ? Math.min(coupon.sconto, subtotale) : 0;
            const dopoCoupon = subtotale - scontoCoupon;
            const scontoPag = scontoPagamento(dopoCoupon, soglie);
            return {articoli, coupon, subtotale, scontoCoupon, dopoCoupon, scontoPagamento: scontoPag, dopoPagamento: dopoCoupon - scontoPag};
        });
        ordini.sort((a, b) => b.subtotale - a.subtotale || a.articoli[0] - b.articoli[0]);
        // Tetto unico: il cashback totale si divide tra gli ordini in proporzione, in centesimi interi.
        const grezzo = ordini.map(o => o.dopoPagamento * perc), somma = grezzo.reduce((a, b) => a + b, 0);
        const cashTot = Math.round(Math.min(tetto, somma));
        let assegnato = 0;
        ordini.forEach((o, i) => {
            o.cashback = i === ordini.length - 1 ? cashTot - assegnato : (somma > 0 ? Math.round(grezzo[i] * cashTot / somma) : 0);
            assegnato += o.cashback;
            o.finale = o.dopoPagamento - o.cashback;
        });
        const tot = campo => ordini.reduce((a, o) => a + o[campo], 0);
        const e = v => v / 100;
        const r = {
            ordini: ordini.map(o => ({
                articoli: o.articoli,
                coupon: o.coupon ? {codice: o.coupon.codice, sconto: e(o.coupon.sconto), minSpesa: e(o.coupon.min)} : null,
                subtotale: e(o.subtotale), scontoCoupon: e(o.scontoCoupon), dopoCoupon: e(o.dopoCoupon),
                scontoPagamento: e(o.scontoPagamento), dopoPagamento: e(o.dopoPagamento), cashback: e(o.cashback), finale: e(o.finale)
            })),
            totale: e(tot('subtotale')), scontoCoupon: e(tot('scontoCoupon')), dopoCoupon: e(tot('dopoCoupon')),
            scontoPagamento: e(tot('scontoPagamento')), dopoPagamento: e(tot('dopoPagamento')), cashback: e(cashTot),
            finale: e(tot('finale'))
        };
        r.risparmio = e(tot('subtotale') - tot('finale'));
        return r;
    }

    // prezzi: euro (> 0). coupons: [{codice, sconto, minSpesa}]. opzioni: {soglie: [{min, sconto}], cashPerc: 0.07, cashCap: 8}.
    // Restituisce {migliore, unico, inPiu, coincide}: la combo migliore e il miglior ordine unico, con tutti gli importi.
    function ottimizza(prezzi, coupons, opzioni = {}) {
        const p = (prezzi || []).map(centesimi), n = p.length;
        if (n === 0) return null;
        if (n > MAX_ARTICOLI) throw new RangeError(`Al massimo ${MAX_ARTICOLI} articoli`);
        if (p.some(x => !(x > 0))) throw new RangeError('Ogni prezzo deve essere maggiore di zero');
        const soglie = preparaSoglie(opzioni.soglie);
        const perc = Math.min(Math.max(Number(opzioni.cashPerc) || 0, 0), 0.99);
        const tetto = Math.max(centesimi(opzioni.cashCap) || 0, 0);

        const N = 1 << n, PIENO = N - 1;
        const S = new Float64Array(N);       // totale di ogni sottoinsieme
        for (let m = 1; m < N; m++) S[m] = S[m & (m - 1)] + p[31 - Math.clz32(m & -m)];
        const cp = preparaCoupon(coupons, S[PIENO]);

        // Chiave di un ordine senza coupon e miglior divisione di ogni sottoinsieme in ordini senza coupon.
        const v0 = new Float64Array(N);
        for (let m = 1; m < N; m++) v0[m] = scontoPagamento(S[m], soglie) * K - 1;
        let f = new Float64Array(N);
        const sceltaSenza = new Int32Array(N);
        for (let m = 1; m < N; m++) {
            const basso = m & -m, resto = m ^ basso;   // il blocco che contiene l'articolo più basso, per non contare due volte
            let meglio = NEG, scelta = 0;
            for (let t = resto; ; t = (t - 1) & resto) {
                const sub = basso | t, k = v0[sub] + f[m ^ sub];
                if (k > meglio) { meglio = k; scelta = sub; }
                if (t === 0) break;
            }
            f[m] = meglio;
            sceltaSenza[m] = scelta;
        }

        // Un coupon alla volta: o resta inutilizzato o diventa il coupon di un ordine (un sottoinsieme).
        const scelte = [], vk = new Float64Array(N);
        for (const c of cp) {
            for (let s = 1; s < N; s++) {
                if (S[s] < c.min) { vk[s] = NEG; continue; }
                const sc = Math.min(c.sconto, S[s]), k = (sc + scontoPagamento(S[s] - sc, soglie)) * K - 1;
                vk[s] = k > v0[s] ? k : NEG;   // non migliora lo stesso ordine senza coupon: inutile provarlo
            }
            const g = new Float64Array(N), sc = new Int32Array(N);
            for (let m = 1; m < N; m++) {
                let meglio = f[m], scelta = 0;
                for (let sub = m; sub; sub = (sub - 1) & m) {
                    const v = vk[sub];
                    if (v === NEG) continue;
                    const k = v + f[m ^ sub];
                    if (k > meglio) { meglio = k; scelta = sub; }
                }
                g[m] = meglio;
                sc[m] = scelta;
            }
            f = g;
            scelte.push(sc);
        }

        // Ricostruzione della combo migliore.
        const gruppi = [];
        let m = PIENO;
        for (let i = cp.length - 1; i >= 0; i--) {
            const sub = scelte[i][m];
            if (sub) { gruppi.push({maschera: sub, coupon: cp[i]}); m ^= sub; }
        }
        while (m) { const sub = sceltaSenza[m]; gruppi.push({maschera: sub, coupon: null}); m ^= sub; }

        // Miglior ordine unico, per il confronto: tutti gli articoli insieme con il coupon che rende di più.
        let unicoCoupon = null, unicoChiave = v0[PIENO];
        for (const c of cp) {
            const sc = Math.min(c.sconto, S[PIENO]), k = (sc + scontoPagamento(S[PIENO] - sc, soglie)) * K - 1;
            if (k > unicoChiave) { unicoChiave = k; unicoCoupon = c; }
        }

        const migliore = concludi(gruppi, p, soglie, perc, tetto);
        const unico = concludi([{maschera: PIENO, coupon: unicoCoupon}], p, soglie, perc, tetto);
        const inPiu = Math.round((migliore.risparmio - unico.risparmio) * 100) / 100;
        return {migliore, unico, inPiu, coincide: migliore.ordini.length === 1};
    }

    const API = {MAX_ARTICOLI, ottimizza};
    radice.PRODIGEEK_CARRELLO = API;
    if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof globalThis !== 'undefined' ? globalThis : this);
