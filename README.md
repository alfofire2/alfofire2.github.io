# coupon.prodigeek.it

Il sito dei coupon AliExpress di Prezzone & Prodigeek, pubblicato con GitHub Pages dal branch `main`.

- `index.html`: la homepage con i coupon, il popup della squadra cashback e le FAQ.
- `calculator.html`: il calcolatore (coupon migliore, sconto del metodo di pagamento, cashback).
- `extension.html` e `privacy.html`: la pagina dell'estensione del browser e l'informativa sulla privacy.
- **`config.js`: tutti i valori che cambiano nel tempo. Di solito è l'unico file da toccare.**

## Come modificare `config.js`

1. Su GitHub apri `config.js` e clicca sulla matita (*Edit this file*).
2. Cambia i valori che ti servono (vedi sotto).
3. Clicca su *Commit changes…* e conferma.

Dopo uno o due minuti il sito è aggiornato. L'estensione del browser riceve i nuovi coupon entro un'ora al massimo (vedi [Estensione del browser](#estensione-del-browser)).

Ogni valore in `config.js` ha accanto un commento che spiega a cosa serve. Le righe in fondo al file, sotto "Da qui in giù non serve modificare nulla", non vanno toccate.

## Coupon

I coupon sono divisi in quattro blocchi, uno per sezione della homepage:

| Blocco in `config.js` | Sezione in homepage |
|---|---|
| `esclusiviProdigeek` | Coupon Esclusivi Prodigeek |
| `generici` | Coupon Generici |
| `standardProdigeek` | Altri Coupon Generici |
| `altriEsclusiviProdigeek` | Altri Coupon Esclusivi Prodigeek |

Ogni blocco ha la sua valuta e una serie di posti già pronti:

```js
generici: {
    valuta: '€',
    codici: [
        { code: 'ITAFF03',    discount: 3,    min: 18 },
        { code: 'ITAFF06',    discount: 6,    min: 39 },
        { code: '',           discount: 0,    min: 0 },
        { code: '',           discount: 0,    min: 0 }
    ]
}
```

- **`code`**: il codice, tra apici.
- **`discount`**: lo sconto.
- **`min`**: la spesa minima.
- **`valuta`**: `'€'` oppure `'$'`, vale per tutto il blocco.

Cosa fare:

- **Aggiungere un coupon**: riempi un posto vuoto, per esempio `{ code: 'ITAFF10', discount: 10, min: 99 },`.
- **Togliere un coupon**: svuota il codice, `code: ''`. Sconto e spesa minima possono restare: un posto con il codice vuoto non compare da nessuna parte.
- **Svuotare una sezione**: svuota tutti i codici del blocco. La sezione sparisce dalla homepage.
- **Servono più posti**: copia una riga `{ code: '', discount: 0, min: 0 },` sotto le altre.

I coupon compaiono nell'ordine in cui sono scritti. In homepage si possono anche ordinare per convenienza con il pulsante apposito.

## Squadra cashback

```js
squadra: {
    attiva: true,
    link: 'https://s.click.aliexpress.com/e/_c3yNnO8F',
    inizio: '2026-10-28T16:00:00-07:00',
    fine: '2026-11-18T14:59:59-08:00',
    percentualeMassima: 7,
    premioMassimo: 168,
    livelli: [3, 5, 7],
    percentualePredefinita: 7,
    massimoAlGiorno: 8
},
```

- **`attiva`**: `true` o `false`. Con `false` la squadra sparisce subito ovunque.
- **`link`**: il link per entrare nella squadra, usato dal popup, dal banner, dal calcolatore e dall'estensione.
- **`inizio`** e **`fine`**: il periodo dell'evento. Fuori da queste date la squadra sparisce da sola: niente popup e banner in homepage, niente cashback nel calcolatore, niente squadra nell'estensione. Non serve ricordarsi di spegnerla.
- **`percentualeMassima`** e **`premioMassimo`**: i numeri del popup ("fino al 7% di Cashback… fino a 168 € in tutto").
- **`livelli`**: le percentuali tra cui scegliere nelle impostazioni del calcolatore, mostrate come LV1, LV2, LV3…
- **`percentualePredefinita`**: quella già selezionata. Deve essere uno dei `livelli`.
- **`massimoAlGiorno`**: il tetto del cashback al giorno in euro.

Per un nuovo evento cambia `link`, `inizio`, `fine` e i numeri secondo il regolamento AliExpress.

### Come si scrivono le date

Anno-mese-giorno, `T`, ora, poi il fuso orario: `'2026-11-18T23:59:59+01:00'`.

| Fuso | Quando |
|---|---|
| `+01:00` | ora italiana d'inverno (dall'ultima domenica di ottobre all'ultima di marzo) |
| `+02:00` | ora italiana d'estate |
| `-08:00` | ora del Pacifico d'inverno (PST), quella dei regolamenti AliExpress |
| `-07:00` | ora del Pacifico d'estate (PDT) |

Se il regolamento dà le date in ora del Pacifico, conviene copiarle così come sono con il loro fuso.

## Sconto del metodo di pagamento

```js
pagamento: {
    nome: 'PayPal',
    soglie: [
        { min: 99, sconto: 10 },
        { min: 199, sconto: 20 },
        { min: 299, sconto: 45 }
    ]
}
```

- **`nome`**: compare nel calcolatore ("Sconto PayPal", "Dopo PayPal"…). Si può cambiare, per esempio in `'Klarna'`.
- **`soglie`**: per ogni soglia, la spesa minima dopo il coupon (`min`) e lo sconto in euro (`sconto`). Il calcolatore applica la soglia più alta raggiunta. Se ne possono aggiungere o togliere; con `soglie: []` non c'è nessuno sconto.

Chi usa il calcolatore può cambiare soglie e cashback dalle impostazioni della pagina, ma solo per sé e finché la tiene aperta: i valori di partenza sono sempre quelli di `config.js`.

## Errori comuni

`config.js` è codice JavaScript: un apice o una virgola fuori posto fermano homepage e calcolatore. Attenzione a:

- **codici tra apici**: `'ITAFF03'`, mai senza;
- **numeri senza apici**, con il punto per i decimali: `discount: 2.5`, non `'2,5'`;
- **una virgola tra un coupon e l'altro**: se ne manca una, si ferma tutto (dopo l'ultimo invece è facoltativa).

Se c'è un errore, l'automazione "Sincronizza i dati dell'estensione" fallisce. Nella scheda *Actions* del repository compare una X rossa, e di solito arriva un'email da GitHub. In quel caso, o se dopo un paio di minuti il sito non mostra più i coupon, riapri `config.js`, controlla l'ultima modifica e correggila. Nella *History* del file trovi anche la versione precedente, da cui ricopiare i valori.

## Estensione del browser

L'estensione pubblicata (Firefox e Chrome, versione 1.1.5) non legge `config.js`. Legge coupon, link e interruttore della squadra direttamente dall'HTML della homepage. Per questo l'automazione `.github/workflows/sincronizza-estensione.yml` copia quei dati da `config.js` in un blocco di `index.html`, tra i commenti `DATI PER L'ESTENSIONE`, nel formato che l'estensione si aspetta.

L'automazione parte:

- quando cambia `config.js`;
- ogni ora, così a fine evento la squadra si spegne anche nell'estensione;
- a mano, dalla scheda *Actions* (*Run workflow*).

Fa un commit su `main` solo se qualcosa è cambiato. Quel blocco di `index.html` non va modificato a mano: viene riscritto alla prossima esecuzione.

Quando l'estensione verrà aggiornata per leggere `config.js` direttamente, l'automazione e il blocco si potranno togliere.

## Provare in locale

```bash
python3 -m http.server 8000                # poi apri http://localhost:8000
node scripts/sincronizza-estensione.mjs    # aggiorna il blocco per l'estensione in index.html
```

Lo stesso script segnala un errore se `config.js` non è scritto bene: è un modo veloce per controllarlo prima di pubblicare.

## Licenza

Il progetto è distribuito con licenza **MIT**. Vedi il file [LICENSE](LICENSE).
