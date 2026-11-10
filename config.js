// Tutti i valori di coupon.prodigeek.it in un posto solo.
// Modifica solo questo file: homepage e calcolatore lo leggono direttamente, e l'estensione del browser
// riceve coupon, link e stato della squadra entro qualche minuto (lo copia in index.html un'automazione su GitHub).
//
// Le date hanno il fuso orario in fondo: +01:00 è l'ora italiana d'inverno, +02:00 quella d'estate,
// -08:00 l'ora del Pacifico d'inverno (PST), -07:00 quella d'estate (PDT).

const PRODIGEEK = {

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
    coupons: {
        // Coupon Esclusivi Prodigeek
        esclusiviProdigeek: {
            valuta: '$',
            codici: [
                { code: 'OTD1103',    discount: 3,    min: 15 },
                { code: 'OTD1104',    discount: 4,    min: 25 },
                { code: 'OTD1111',    discount: 11,   min: 65 },
                { code: 'OTD1120',    discount: 20,   min: 119 },
                { code: 'OTD1136',    discount: 36,   min: 215 },
                { code: 'OTD1153',    discount: 53,   min: 315 },
                { code: 'OTD1170',    discount: 70,   min: 419 },
                { code: 'IFPKEVIS',   discount: 100,  min: 500, dal: '2026-11-11', al: '2026-11-12' },
                { code: 'IFP7NWZS',   discount: 120,  min: 600, dal: '2026-11-11', al: '2026-11-12' },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                // Tolti per ora: per rimetterne uno basta togliere // all'inizio della riga.
                // { code: 'IFPBKCOQ',   discount: 3,    min: 18 },
                // { code: 'IFPWBJXE',   discount: 6,    min: 39 },
                // { code: 'IFPT3ULS',   discount: 14,   min: 79 },
                // { code: 'IFPB6VFW',   discount: 25,   min: 149 },
                // { code: 'IFPRBOY9',   discount: 45,   min: 259 },
                // { code: 'IFPMRJS7',   discount: 60,   min: 349 },
                // { code: 'IFPFWKQD',   discount: 80,   min: 469 },
                // { code: 'IFPMGSEF',   discount: 100,  min: 500, dal: '2026-11-01', al: '2026-11-03' },
                // { code: 'IFPFEIGQ',   discount: 120,  min: 600, dal: '2026-11-01', al: '2026-11-03' },
            ]
        },

        // Altri Coupon Esclusivi Prodigeek
        altriEsclusiviProdigeek: {
            valuta: '$',
            codici: [
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 }
            ]
        },

        // Altri Coupon Generici
        standardProdigeek: {
            valuta: '€',
            codici: [
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 }
            ]
        },

        // Coupon Generici
        generici: {
            valuta: '€',
            codici: [
                { code: 'ITAFF03',    discount: 3,    min: 18, al: '2026-11-18' },
                { code: 'ITAFF06',    discount: 6,    min: 39, al: '2026-11-18' },
                { code: 'ITAFF14',    discount: 14,   min: 79, al: '2026-11-18' },
                { code: 'ITAFF25',    discount: 25,   min: 149, al: '2026-11-18' },
                { code: 'ITAFF45',    discount: 45,   min: 259, al: '2026-11-18' },
                { code: 'ITAFF60',    discount: 60,   min: 349, al: '2026-11-18' },
                { code: 'ITAFF80',    discount: 80,   min: 469, al: '2026-11-18' },
                { code: 'ITD11100',   discount: 100,  min: 500, al: '2026-11-18' },
                { code: 'ITD11120',   discount: 120,  min: 600, al: '2026-11-18' },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
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
    pagamento: {
        nome: 'PayPal',
        soglie: [
            { min: 99, sconto: 10 },
            { min: 199, sconto: 20 },
            { min: 299, sconto: 45 }
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
PRODIGEEK.notaDalleDate = function (dal, al) {
    const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const parti = data => data.split('-').map(Number);
    const apostrofo = g => g === 1 || g === 8 || g === 11;   // l’1, l’8, l’11: si legge uno, otto, undici
    const il = g => (apostrofo(g) ? 'l’' : 'il ') + g, dalG = g => (apostrofo(g) ? 'dall’' : 'dal ') + g, alG = g => (apostrofo(g) ? 'all’' : 'al ') + g;
    if (!al) return '';
    const [a2, m2, g2] = parti(al);
    if (!dal) return `Fino ${alG(g2)} ${MESI[m2 - 1]}`;
    const [a1, m1, g1] = parti(dal);
    if (dal === al) return `Solo ${il(g1)} ${MESI[m1 - 1]}`;
    if (a1 === a2 && m1 === m2) return g2 === g1 + 1 ? `Solo ${il(g1)} e ${il(g2)} ${MESI[m1 - 1]}` : `Solo ${dalG(g1)} ${alG(g2)} ${MESI[m1 - 1]}`;
    const anno = a1 === a2 ? ['', ''] : [' ' + a1, ' ' + a2];
    return `Solo ${dalG(g1)} ${MESI[m1 - 1]}${anno[0]} ${alG(g2)} ${MESI[m2 - 1]}${anno[1]}`;
};

// Le liste di coupon come le usano homepage, calcolatore ed estensione in un certo momento: senza i posti vuoti,
// senza quelli fuori dalle date e con la valuta su ogni coupon.
PRODIGEEK.listeCouponAl = function (ora = Date.now()) {
    return Object.fromEntries(Object.entries(PRODIGEEK.coupons).map(([nome, blocco]) => [nome,
        blocco.codici
            .filter(c => String(c.code || '').trim() !== '' && PRODIGEEK.statoCoupon(c, ora) === 'valido')
            .map(c => {
                const dal = String(c.dal || '').trim(), al = String(c.al || '').trim();
                const nota = String(c.nota || '').trim() || PRODIGEEK.notaDalleDate(dal, al);
                return { code: String(c.code).trim(), discount: Number(c.discount), min: Number(c.min), currency: blocco.valuta || '€',
                    ...(nota ? { nota } : {}), ...(dal ? { dal } : {}), ...(al ? { al } : {}) };
            })
    ]));
};

// Le liste valide adesso: ricalcolate ogni volta che si leggono.
Object.defineProperty(PRODIGEEK, 'listeCoupon', { get: () => PRODIGEEK.listeCouponAl(Date.now()), enumerable: true });

// Per le pagine lasciate aperte: ogni minuto, e quando si torna sulla scheda, controlla se a mezzanotte
// qualche coupon è comparso o scaduto, e in quel caso chiama avvisa con le liste nuove.
PRODIGEEK.seCambianoICoupon = function (avvisa) {
    let prima = JSON.stringify(PRODIGEEK.listeCoupon);
    const controlla = () => {
        const liste = PRODIGEEK.listeCoupon, adesso = JSON.stringify(liste);
        if (adesso !== prima) { prima = adesso; avvisa(liste); }
    };
    setInterval(controlla, 60000);
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (!document.hidden) controlla(); });
};
