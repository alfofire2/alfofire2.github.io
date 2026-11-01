// Prova del calcolo del carrello (carrello.js) contro una forza bruta indipendente.
// Uso: node scripts/test-carrello.mjs
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createRequire} from 'node:module';

const radice = new URL('..', import.meta.url);
const ctx = vm.createContext({Intl, Math, Number, String, JSON, Object, Array, Date});
vm.runInContext(readFileSync(new URL('config.js', radice), 'utf8') + ';globalThis.PRODIGEEK = PRODIGEEK;', ctx);
const {PRODIGEEK} = ctx;
// carrello.js caricato come un normale script (in un contesto vm le variabili globali sono molto più lente).
const C = createRequire(import.meta.url)('../carrello.js');

// Coupon reali del 1 novembre 2026, come li legge il calcolatore.
const OGGI = Date.parse('2026-11-01T12:00:00+01:00');
const REALI = Object.values(PRODIGEEK.listeCouponAl(OGGI)).flat().map(c => ({codice: c.code, sconto: c.discount, minSpesa: c.min}));
const SOGLIE = PRODIGEEK.pagamento.soglie.map(t => ({min: t.min, sconto: t.sconto}));
const OPZ = {soglie: SOGLIE, cashPerc: PRODIGEEK.squadra.percentualePredefinita / 100, cashCap: PRODIGEEK.squadra.massimoAlGiorno};

// Forza bruta: tutte le partizioni degli articoli, per ognuna tutte le assegnazioni di coupon distinti (o nessuno),
// risparmio calcolato per intero (coupon + pagamento + cashback con tetto condiviso), in virgola mobile.
function forzaBruta(prezzi, coupons, {soglie, cashPerc, cashCap}) {
    const ss = [...soglie].sort((a, b) => b.min - a.min);
    const pag = x => { const t = ss.find(t => x >= t.min - 1e-9); return t ? Math.min(Math.max(0, t.sconto), x) : 0; };
    const n = prezzi.length;
    let meglio = {risparmio: -1, ordini: Infinity};
    const blocchi = [];
    const valuta = (assegnati) => {
        let dopoPag = 0, d = 0;
        assegnati.forEach(({tot, c}) => {
            const sc = c ? Math.min(c.sconto, tot) : 0, a = tot - sc, pp = pag(a);
            d += sc + pp; dopoPag += a - pp;
        });
        const risparmio = d + Math.min(cashCap, dopoPag * cashPerc);
        const ordini = assegnati.length;
        if (risparmio > meglio.risparmio + 1e-7 || (Math.abs(risparmio - meglio.risparmio) <= 1e-7 && ordini < meglio.ordini))
            meglio = {risparmio, ordini};
    };
    const assegna = (i, usati, acc) => {
        if (i === blocchi.length) return valuta(acc);
        const tot = blocchi[i].reduce((a, j) => a + prezzi[j], 0);
        assegna(i + 1, usati, [...acc, {tot, c: null}]);
        coupons.forEach((c, k) => {
            if (!usati.has(k) && tot >= c.minSpesa) { usati.add(k); assegna(i + 1, usati, [...acc, {tot, c}]); usati.delete(k); }
        });
    };
    const partizioni = (i) => {
        if (i === n) return assegna(0, new Set(), []);
        for (const b of blocchi) { b.push(i); partizioni(i + 1); b.pop(); }
        blocchi.push([i]); partizioni(i + 1); blocchi.pop();
    };
    partizioni(0);
    return meglio;
}

// Controlli di coerenza interni del risultato.
function coerente(r, prezzi, coupons, opz) {
    const {migliore: m} = r;
    const visti = m.ordini.flatMap(o => o.articoli).sort((a, b) => a - b);
    if (JSON.stringify(visti) !== JSON.stringify(prezzi.map((_, i) => i))) return 'articoli non coperti una volta sola';
    const codici = m.ordini.filter(o => o.coupon).map(o => o.coupon.codice);
    if (new Set(codici).size !== codici.length) return 'codice usato due volte';
    for (const o of m.ordini) {
        const sub = o.articoli.reduce((a, i) => a + prezzi[i], 0);
        if (Math.abs(sub - o.subtotale) > 0.005) return 'subtotale sbagliato';
        if (o.coupon && o.subtotale + 1e-9 < o.coupon.minSpesa) return 'spesa minima non raggiunta';
        if (o.finale < -1e-9 || o.dopoCoupon < -1e-9 || o.dopoPagamento < -1e-9) return 'ordine negativo';
    }
    if (m.cashback > opz.cashCap + 0.005) return 'tetto cashback superato';
    if (Math.abs(m.totale - m.risparmio - m.finale) > 0.005) return 'totali incoerenti';
    if (r.inPiu < -0.005) return 'combo peggiore dell’ordine unico';
    return '';
}

let rnd = 12345;
const caso = () => (rnd = (rnd * 1103515245 + 12345) % 2147483648) / 2147483648;
const intero = (a, b) => a + Math.floor(caso() * (b - a + 1));

let ok = 0, ko = 0, divisi = 0;
const errori = [];
function prova(nome, prezzi, coupons, opz, atteso) {
    const r = C.ottimizza(prezzi, coupons, opz);
    const fb = forzaBruta(prezzi, coupons, opz);
    const problemi = [];
    if (Math.abs(r.migliore.risparmio - fb.risparmio) > 0.011) problemi.push(`risparmio ${r.migliore.risparmio} invece di ${fb.risparmio.toFixed(4)}`);
    if (r.migliore.ordini.length !== fb.ordini) problemi.push(`ordini ${r.migliore.ordini.length} invece di ${fb.ordini}`);
    const c = coerente(r, prezzi, coupons, opz);
    if (c) problemi.push(c);
    if (atteso) { const a = atteso(r); if (a) problemi.push(a); }
    if (r.migliore.ordini.length > 1) divisi++;
    if (problemi.length) { ko++; errori.push(`${nome} ${JSON.stringify(prezzi)}: ${problemi.join('; ')}`); } else ok++;
    return r;
}

// Casi scelti a mano con i coupon reali.
const mostra = r => r.migliore.ordini.map(o => `[${o.articoli.map(i => '#' + (i + 1)).join('+')} ${o.subtotale}€ ${o.coupon ? o.coupon.codice : 'nessuno'} -> ${o.finale}€]`).join(' ') +
    ` | risparmio ${r.migliore.risparmio}€, ordine unico ${r.unico.risparmio}€ (${r.unico.ordini[0].coupon?.codice || 'nessuno'}), in più ${r.inPiu}€`;
const esempi = [
    ['due da 520: conviene spezzare', [520, 520], r => r.migliore.ordini.length === 2 && r.inPiu > 100 ? '' : 'doveva spezzare'],
    ['tre articoli medi', [300, 250, 220], r => r.migliore.ordini.length > 1 ? '' : 'doveva spezzare'],
    ['piccoli: un ordine solo', [10, 15], r => r.coincide ? '' : 'doveva restare unico'],
    ['600 + 30: conviene staccare il piccolo', [600, 30], r => r.migliore.ordini.length === 2 ? '' : 'doveva spezzare'],
    ['200 + 150: un ordine solo', [200, 150], r => r.coincide ? '' : 'doveva restare unico'],
    ['carrello misto', [129.9, 89.5, 45.99, 19.99, 260], null],
    ['un articolo', [355], null],
    ['dodici articoli', [520, 510, 505, 330, 299, 150, 99, 80, 45, 39.9, 19, 18], null]
];
for (const [nome, prezzi, atteso] of esempi) {
    if (prezzi.length > 8) continue;
    const r = prova(nome, prezzi, REALI, OPZ, atteso);
    console.log(`${nome}: ${mostra(r)}`);
}

// Casuali con i coupon reali (fino a 5 articoli) e con coupon, soglie e cashback casuali (fino a 7 articoli).
for (let t = 0; t < 600; t++) {
    const n = intero(1, 5), prezzi = Array.from({length: n}, () => Math.round((caso() < 0.5 ? intero(5, 200) : intero(100, 650)) * 100 + intero(0, 99)) / 100);
    prova('reali', prezzi, REALI, {...OPZ, cashPerc: [0, 0.03, 0.05, 0.07][intero(0, 3)], cashCap: [0, 8, 1000][intero(0, 2)]});
}
for (let t = 0; t < 1500; t++) {
    const n = intero(1, 7), prezzi = Array.from({length: n}, () => intero(1, 120) + intero(0, 99) / 100);
    const nc = intero(0, 5), coupons = Array.from({length: nc}, (_, k) => { const min = intero(5, 250); return {codice: 'C' + k, sconto: intero(1, Math.max(1, Math.floor(min * 0.4))), minSpesa: min}; });
    if (caso() < 0.2 && nc) coupons.push({...coupons[0], codice: 'DOPPIO'});      // due codici con lo stesso valore
    if (caso() < 0.1) coupons.push({codice: 'GRANDE', sconto: 500, minSpesa: 10});  // coupon più grande dell’ordine
    const soglie = Array.from({length: intero(0, 3)}, () => ({min: intero(10, 300), sconto: intero(1, 30)}));
    prova('casuale', prezzi, coupons, {soglie, cashPerc: intero(0, 10) / 100, cashCap: [0, 3, 8, 50][intero(0, 3)]});
}
console.log(`\nConfronti con la forza bruta: ${ok} giusti, ${ko} sbagliati (${divisi} casi in cui conviene spezzare)`);
errori.slice(0, 10).forEach(e => console.log('  ' + e));

// Tempi con 12 articoli e i coupon reali.
const dodici = esempi.find(e => e[0] === 'dodici articoli')[1];
let peggiore = 0;
for (let t = 0; t < 20; t++) {
    const prezzi = t === 0 ? dodici : Array.from({length: 12}, () => intero(15, 650) + intero(0, 99) / 100);
    const t0 = performance.now(), r = C.ottimizza(prezzi, REALI, OPZ), dt = performance.now() - t0;
    peggiore = Math.max(peggiore, dt);
    const c = coerente(r, prezzi, REALI, OPZ);
    if (c) { ko++; console.log('12 articoli incoerente: ' + c); }
    if (t === 0) console.log(`dodici articoli: ${mostra(r)}`);
}
console.log(`12 articoli, ${REALI.length} coupon reali: caso peggiore ${peggiore.toFixed(1)} ms su 20 prove`);
let rifiuta = false;
try { C.ottimizza(Array(13).fill(10), REALI, OPZ); } catch (e) { rifiuta = e instanceof RangeError || e.name === 'RangeError'; }
console.log(`13 articoli rifiutati: ${rifiuta ? 'sì' : 'NO'}`);
process.exit(ko || !rifiuta ? 1 : 0);
