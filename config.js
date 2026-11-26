// Tutti i valori di coupon.prodigeek.it in un posto solo.
// Modifica solo questo file: homepage e calcolatore lo leggono direttamente, e l'estensione del browser
// riceve coupon, link e stato della squadra entro qualche minuto (lo copia in index.html un'automazione su GitHub).
//
// Le date hanno il fuso orario in fondo: +01:00 è l'ora italiana d'inverno, +02:00 quella d'estate,
// -08:00 l'ora del Pacifico d'inverno (PST), -07:00 quella d'estate (PDT).

const PRODIGEEK = {

    // Coupon e soglie del pagamento che partono entro questi giorni si vedono già prima in homepage e nel calcolatore,
    // con una riga che dice da quando valgono (per esempio "Dal 19 novembre"): il giorno in cui partono la riga sparisce.
    // All'estensione del browser arrivano solo da quel giorno. 0 = niente anteprima.
    anteprimaGiorni: 7,

    // Coupon mostrati in homepage, usati dal calcolatore e dall'estensione.
    // Ogni blocco ha la sua valuta ('€' oppure '$') e una serie di posti già pronti:
    // per aggiungere un coupon riempi un posto vuoto (code, discount = sconto, min = spesa minima),
    // per toglierlo svuota il codice (code: ''). I posti con il codice vuoto non compaiono da nessuna parte,
    // e un blocco senza codici nasconde la sua sezione in homepage. Servono più posti? Copia una riga.
    // dal e al (facoltativi) sono il primo e l'ultimo giorno di validità, in ora italiana, scritti 'AAAA-MM-GG'.
    // Prima del giorno dal il coupon non compare; dopo la fine del giorno al sparisce da solo da homepage,
    // calcolatore ed estensione. Non serve cancellarlo: può restare qui come promemoria.
    // Con le date, sotto il coupon in homepage compare da sola una riga come 'Solo dall’1 al 3 novembre'.
    // nota (facoltativa) sostituisce quella riga con un testo scelto da te, per esempio nota: 'Solo nell’app'.
    // Un blocco può avere la sua nota (per esempio nota: 'Riscatto limitato'), che compare prima di quella delle date.
    // I blocchi, nell'ordine in cui compaiono in homepage (i titoli delle sezioni sono in index.html).
    coupons: {
        // Coupon Black Friday PRODIGEEK (in homepage la prima sezione)
        prodigeek: {
            valuta: '€',
            nota: 'Riscatto limitato',
            codici: [
                { code: 'PRODIGEEK03', discount: 3,    min: 18 },
                { code: 'PRODIGEEK05', discount: 5,    min: 37 },
                { code: 'PRODIGEEK13', discount: 13,   min: 79 },
                { code: 'PRODIGEEK20', discount: 20,   min: 125 },
                { code: 'PRODIGEEK40', discount: 40,   min: 245 },
                { code: 'PRODIGEEK55', discount: 55,   min: 335 },
                { code: 'PRODIGEEK70', discount: 70,   min: 435 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
            ]
        },

        // Coupon Black Friday ITBF
        generici: {
            valuta: '€',
            nota: 'Riscatto limitato',
            codici: [
                { code: 'ITBF03',     discount: 3,    min: 18, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'ITBF05',     discount: 5,    min: 37, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'ITBF13',     discount: 13,   min: 79, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'ITBF20',     discount: 20,   min: 125, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'ITBF40',     discount: 40,   min: 245, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'ITBF55',     discount: 55,   min: 335, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'ITBF70',     discount: 70,   min: 435, dal: '2026-11-19', al: '2026-12-03' },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
            ]
        },

        // Coupon Black Friday BFIT
        standardProdigeek: {
            valuta: '€',
            nota: 'Riscatto limitato',
            codici: [
                { code: 'BFIT03',     discount: 3,    min: 18, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'BFIT05',     discount: 5,    min: 37, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'BFIT13',     discount: 13,   min: 79, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'BFIT20',     discount: 20,   min: 125, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'BFIT40',     discount: 40,   min: 245, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'BFIT55',     discount: 55,   min: 335, dal: '2026-11-19', al: '2026-12-03' },
                { code: 'BFIT70',     discount: 70,   min: 435, dal: '2026-11-19', al: '2026-12-03' },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
            ]
        },

        // Coupon Nuovi Clienti. nuoviClienti: true = solo per chi non ha mai comprato su AliExpress: in homepage c'è,
        // ma il calcolatore e l'estensione lo ignorano, perché a tutti gli altri non vale.
        altriEsclusiviProdigeek: {
            valuta: '€',
            codici: [
                { code: 'IFP7LBUM',   discount: 3,    min: 18, dal: '2026-11-19' },
                { code: 'IFP7LBUM',   discount: 6,    min: 18, dal: '2026-11-19', nuoviClienti: true, nota: 'Solo per i nuovi clienti' },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
            ]
        },

        // Coupon Esclusivi Prodigeek
        esclusiviProdigeek: {
            valuta: '€',
            codici: [
                { code: 'IFP2BMWI',   discount: 8,    min: 45, dal: '2026-11-19' },
                { code: 'IFPEIENH',   discount: 13,   min: 79, dal: '2026-11-19' },
                { code: 'IFP59VVR',   discount: 24,   min: 139, dal: '2026-11-19' },
                { code: 'IFPRAKLK',   discount: 40,   min: 229, dal: '2026-11-19' },
                { code: 'IFPAMNLD',   discount: 60,   min: 349, dal: '2026-11-19' },
                { code: 'IFPZVTEV',   discount: 80,   min: 469, dal: '2026-11-19' },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                // Tolti il 18/11, erano in dollari: per rimetterli togli // e cambia valuta in '$' (o mettili in un blocco in dollari).
                // { code: 'OTD1103',    discount: 3,    min: 15 },
                // { code: 'OTD1104',    discount: 4,    min: 25 },
                // { code: 'OTD1111',    discount: 11,   min: 65 },
                // { code: 'OTD1120',    discount: 20,   min: 119 },
                // { code: 'OTD1136',    discount: 36,   min: 215 },
                // { code: 'OTD1153',    discount: 53,   min: 315 },
                // { code: 'OTD1170',    discount: 70,   min: 419 },
            ]
        }
    },

    // Squadra cashback AliExpress (evento "Unisciti a una squadra").
    // Fuori dalle date, o con attiva: false, spariscono da soli il popup e il banner in homepage,
    // il cashback nel calcolatore e la squadra nell'estensione.
    squadra: {
        attiva: false,                        // spenta: il budget del cashback è finito
        link: 'https://s.click.aliexpress.com/e/_c3yNnO8F',
        inizio: '2026-10-28T16:00:00-07:00',  // 28/10 alle 16:00 ora del Pacifico
        fine: '2026-11-18T14:59:59-08:00',    // 18/11 alle 23:59:59 ora italiana
        percentualeMassima: 7,                // popup: "fino al 7% di Cashback"
        premioMassimo: 168,                   // popup: "fino a 168 € in tutto"
        livelli: [3, 5, 7],                   // percentuali tra cui scegliere nel calcolatore (LV1, LV2, LV3...)
        percentualePredefinita: 7,
        massimoAlGiorno: 8                    // € di cashback al giorno
    },

    // Sconto per metodo di pagamento al checkout (PayPal, Klarna...).
    // Il calcolatore applica la soglia più alta che il prezzo dopo il coupon raggiunge.
    // blocco (facoltativo): il nome di un blocco di coupon che vale solo pagando così (per esempio codici PayPal):
    // i suoi coupon diventano le soglie, con il loro codice, e non arrivano all'estensione. Vuoto ('') = nessun blocco.
    // Senza blocco, o se il blocco non ha coupon validi oggi, valgono le soglie scritte qui sotto, per esempio { min: 99, sconto: 10 }.
    // Anche le soglie possono avere dal e al, come i coupon: fuori da quei giorni non contano.
    pagamento: {
        nome: 'PayPal',
        blocco: '',
        soglie: [
            // Primo round: 19 novembre
            { min: 99,  sconto: 10, dal: '2026-11-19', al: '2026-11-19' },
            { min: 159, sconto: 18, dal: '2026-11-19', al: '2026-11-19' },
            { min: 239, sconto: 28, dal: '2026-11-19', al: '2026-11-19' },
            // Secondo round: 27 novembre (restock di PayPal e codici alle 00:00 del 27)
            { min: 99,  sconto: 10, dal: '2026-11-27', al: '2026-11-27' },
            { min: 159, sconto: 18, dal: '2026-11-27', al: '2026-11-27' },
            { min: 239, sconto: 28, dal: '2026-11-27', al: '2026-11-27' }
        ]
    },

    // Coupon in dollari nel calcolatore: sconto e spesa minima vengono convertiti in euro al cambio del giorno
    // (scaricato da api.frankfurter.dev, dati della Banca centrale europea). Questo valore serve solo
    // la prima volta che qualcuno apre il calcolatore, se il cambio non si riesce a scaricare: quanti dollari vale un euro.
    cambio: {
        dollariPerEuro: 1.12
    }
};


// Da qui in giù non serve modificare nulla.

// Il giorno di oggi in Italia (fuso Europe/Rome) come 'AAAA-MM-GG', da confrontare con dal e al.
PRODIGEEK.giornoItaliano = function (ora = Date.now()) {
    try {
        const parti = {};
        new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' })
            .formatToParts(new Date(ora)).forEach(p => { parti[p.type] = p.value; });
        return `${parti.year}-${parti.month}-${parti.day}`;
    } catch (e) {
        // Browser molto vecchi senza fusi orari: ora italiana d'inverno, al massimo un'ora di scarto d'estate.
        return new Date(ora + 3600000).toISOString().slice(0, 10);
    }
};

// Una data 'AAAA-MM-GG' che esiste davvero (niente 31 novembre).
PRODIGEEK.dataValida = function (data) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return false;
    const [a, m, g] = data.split('-').map(Number), d = new Date(Date.UTC(a, m - 1, g));
    return d.getUTCFullYear() === a && d.getUTCMonth() === m - 1 && d.getUTCDate() === g;
};

// 'futuro' prima del giorno dal, 'scaduto' dopo il giorno al, 'valido' in mezzo (dal e al compresi),
// 'errore' se una data non è scritta bene: in quel caso il coupon non compare e l'automazione su GitHub fallisce.
PRODIGEEK.statoCoupon = function (c, ora = Date.now()) {
    const dal = String(c.dal || '').trim(), al = String(c.al || '').trim();
    if ((dal && !PRODIGEEK.dataValida(dal)) || (al && !PRODIGEEK.dataValida(al)) || (dal && al && dal > al)) return 'errore';
    const oggi = PRODIGEEK.giornoItaliano(ora);
    if (dal && oggi < dal) return 'futuro';
    if (al && oggi > al) return 'scaduto';
    return 'valido';
};

// La riga sotto il coupon ricavata dalle date: 'Solo dall’1 al 3 novembre', 'Solo l’11 e il 12 novembre',
// 'Solo il 5 novembre', 'Fino all’8 dicembre', 'Solo dal 30 novembre al 2 dicembre'.
PRODIGEEK.notaDalleDate = function (dal, al, inArrivo = false) {
    const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const parti = data => data.split('-').map(Number);
    const apostrofo = g => g === 1 || g === 8 || g === 11;   // l’1, l’8, l’11: si legge uno, otto, undici
    const il = g => (apostrofo(g) ? 'l’' : 'il ') + g, dalG = g => (apostrofo(g) ? 'dall’' : 'dal ') + g, alG = g => (apostrofo(g) ? 'all’' : 'al ') + g;
    if (!al) {
        // Solo dal: la riga serve solo prima che il coupon parta ("Dal 19 novembre").
        if (!inArrivo || !dal) return '';
        const [, m1, g1] = parti(dal), t = dalG(g1);
        return `${t[0].toUpperCase()}${t.slice(1)} ${MESI[m1 - 1]}`;
    }
    const [a2, m2, g2] = parti(al);
    if (!dal) return `Fino ${alG(g2)} ${MESI[m2 - 1]}`;
    const [a1, m1, g1] = parti(dal);
    if (dal === al) return `Solo ${il(g1)} ${MESI[m1 - 1]}`;
    if (a1 === a2 && m1 === m2) return g2 === g1 + 1 ? `Solo ${il(g1)} e ${il(g2)} ${MESI[m1 - 1]}` : `Solo ${dalG(g1)} ${alG(g2)} ${MESI[m1 - 1]}`;
    const anno = a1 === a2 ? ['', ''] : [' ' + a1, ' ' + a2];
    return `Solo ${dalG(g1)} ${MESI[m1 - 1]}${anno[0]} ${alG(g2)} ${MESI[m2 - 1]}${anno[1]}`;
};

// Un coupon (o una soglia) che non vale ancora ma parte entro anteprimaGiorni.
PRODIGEEK.inArrivo = function (c, ora = Date.now()) {
    if (PRODIGEEK.statoCoupon(c, ora) !== 'futuro') return false;
    const giorni = (a, b) => (Date.UTC(...b.split('-').map((n, i) => +n - (i === 1))) - Date.UTC(...a.split('-').map((n, i) => +n - (i === 1)))) / 86400000;
    return giorni(PRODIGEEK.giornoItaliano(ora), String(c.dal).trim()) <= (Number(PRODIGEEK.anteprimaGiorni) || 0);
};

// Le liste di coupon come le usano homepage, calcolatore ed estensione in un certo momento: senza i posti vuoti,
// senza quelli fuori dalle date e con la valuta su ogni coupon. Con anteprima ci sono anche quelli in arrivo,
// con inArrivo: true e notaArrivo ("Dal 19 novembre") in testa alla nota.
PRODIGEEK.listeCouponAl = function (ora = Date.now(), anteprima = false) {
    return Object.fromEntries(Object.entries(PRODIGEEK.coupons).map(([nome, blocco]) => [nome,
        blocco.codici
            .filter(c => String(c.code || '').trim() !== ''
                && (PRODIGEEK.statoCoupon(c, ora) === 'valido' || (anteprima && PRODIGEEK.inArrivo(c, ora))))
            .map(c => {
                const dal = String(c.dal || '').trim(), al = String(c.al || '').trim();
                const arriva = PRODIGEEK.statoCoupon(c, ora) === 'futuro';
                const notaArrivo = arriva ? PRODIGEEK.notaDalleDate(dal, al, true) : '';
                const nota = arriva
                    ? [notaArrivo, String(c.nota || '').trim(), String(blocco.nota || '').trim()].filter(Boolean).join(' · ')
                    : String(c.nota || '').trim()
                        || [String(blocco.nota || '').trim(), PRODIGEEK.notaDalleDate(dal, al)].filter(Boolean).join(' · ');
                return { code: String(c.code).trim(), discount: Number(c.discount), min: Number(c.min), currency: blocco.valuta || '€',
                    ...(nota ? { nota } : {}), ...(dal ? { dal } : {}), ...(al ? { al } : {}),
                    ...(arriva ? { inArrivo: true, notaArrivo } : {}), ...(c.nuoviClienti ? { nuoviClienti: true } : {}) };
            })
    ]));
};

// Le liste valide adesso, e con anche quelli in arrivo: ricalcolate ogni volta che si leggono.
Object.defineProperty(PRODIGEEK, 'listeCoupon', { get: () => PRODIGEEK.listeCouponAl(Date.now()), enumerable: true });
Object.defineProperty(PRODIGEEK, 'listeCouponConAnteprima', { get: () => PRODIGEEK.listeCouponAl(Date.now(), true), enumerable: true });

// Le soglie del pagamento scritte in pagamento.soglie per adesso: quelle valide oggi; se non ce ne sono, quelle in arrivo
// che partono per prime (con notaArrivo, per esempio "Solo il 19 novembre").
PRODIGEEK.soglieScritteAl = function (ora = Date.now()) {
    const soglie = PRODIGEEK.pagamento.soglie || [];
    const valide = soglie.filter(t => PRODIGEEK.statoCoupon(t, ora) === 'valido');
    if (valide.length) return valide.map(t => ({ min: t.min, sconto: t.sconto }));
    const inArrivo = soglie.filter(t => PRODIGEEK.inArrivo(t, ora));
    if (!inArrivo.length) return [];
    const primo = inArrivo.map(t => String(t.dal).trim()).sort()[0];
    return inArrivo.filter(t => String(t.dal).trim() === primo)
        .map(t => ({ min: t.min, sconto: t.sconto, notaArrivo: PRODIGEEK.notaDalleDate(String(t.dal).trim(), String(t.al || '').trim(), true) }));
};

// Per le pagine lasciate aperte: ogni minuto, e quando si torna sulla scheda, controlla se a mezzanotte
// qualche coupon è comparso o scaduto, e in quel caso chiama avvisa con le liste nuove.
PRODIGEEK.seCambianoICoupon = function (avvisa) {
    let prima = JSON.stringify(PRODIGEEK.listeCouponConAnteprima);
    const controlla = () => {
        const liste = PRODIGEEK.listeCouponConAnteprima, adesso = JSON.stringify(liste);
        if (adesso !== prima) { prima = adesso; avvisa(liste); }
    };
    setInterval(controlla, 60000);
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (!document.hidden) controlla(); });
};
