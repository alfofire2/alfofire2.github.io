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
    coupons: {
        // Coupon Esclusivi Prodigeek
        esclusiviProdigeek: {
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
                { code: 'ITAFF03',    discount: 3,    min: 18 },
                { code: 'ITAFF06',    discount: 6,    min: 39 },
                { code: 'ITAFF14',    discount: 14,   min: 79 },
                { code: 'ITAFF25',    discount: 25,   min: 149 },
                { code: 'ITAFF45',    discount: 45,   min: 259 },
                { code: 'ITAFF60',    discount: 60,   min: 349 },
                { code: 'ITAFF80',    discount: 80,   min: 469 },
                { code: 'ITD11100',   discount: 100,  min: 500 },
                { code: 'ITD11120',   discount: 120,  min: 600 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 },
                { code: '',           discount: 0,    min: 0 }
            ]
        }
    },

    // Squadra cashback AliExpress (evento "Unisciti a una squadra").
    // Fuori dalle date, o con attiva: false, spariscono da soli il popup e il banner in homepage,
    // il cashback nel calcolatore e la squadra nell'estensione.
    squadra: {
        attiva: true,
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
    }
};


// Da qui in giù non serve modificare nulla.
// Le liste di coupon come le usano homepage, calcolatore ed estensione: senza i posti vuoti e con la valuta su ogni coupon.
PRODIGEEK.listeCoupon = Object.fromEntries(Object.entries(PRODIGEEK.coupons).map(([nome, blocco]) => [nome,
    blocco.codici
        .filter(c => String(c.code || '').trim() !== '')
        .map(c => ({ code: String(c.code).trim(), discount: Number(c.discount), min: Number(c.min), currency: blocco.valuta || '€' }))
]));
