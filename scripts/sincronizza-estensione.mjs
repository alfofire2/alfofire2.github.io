// Copia da config.js a index.html i dati che l'estensione del browser legge dalla homepage.
// L'estensione (versione 1.1.5) scarica la homepage e cerca, così come sono scritte:
//   const enable_aliexpress_squad = true|false;
//   const coupons = {...};
//   <a href="..." class="squad-card">
// Questo script le scrive in un blocco non eseguito nel <head>, tra i due commenti segnaposto.
// Lo lancia .github/workflows/sincronizza-estensione.yml quando cambia config.js e ogni ora,
// così la squadra si spegne nell'estensione anche quando finisce l'evento, e i coupon con le date
// (dal, al) compaiono e spariscono da soli.
//
// Uso: node scripts/sincronizza-estensione.mjs
// Per provare un altro momento: ORA_SIMULATA=2026-11-01T00:00:00+01:00 node scripts/sincronizza-estensione.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const root = new URL('../', import.meta.url);
const config = runInNewContext(readFileSync(new URL('config.js', root), 'utf8') + '\n;PRODIGEEK');

const ora = process.env.ORA_SIMULATA ? Date.parse(process.env.ORA_SIMULATA) : Date.now();
if (Number.isNaN(ora)) throw new Error(`ORA_SIMULATA non è una data: ${process.env.ORA_SIMULATA}`);

// Una data scritta male in dal o al ferma tutto, così l'errore si vede nella scheda Actions.
const sbagliati = Object.values(config.coupons).flatMap(b => b.codici)
    .filter(c => String(c.code || '').trim() !== '' && config.statoCoupon(c, ora) === 'errore');
if (sbagliati.length) {
    throw new Error('Date dal/al da correggere in config.js (scrivile \'AAAA-MM-GG\', con dal non dopo al): '
        + sbagliati.map(c => `${c.code} (dal: ${c.dal || '-'}, al: ${c.al || '-'})`).join(', '));
}

const { squadra } = config;
// Solo i coupon validi in questo momento (vedi fondo di config.js). Nota e date restano solo per il sito:
// all'estensione arrivano code, discount, min e currency, come si aspetta.
const coupons = Object.fromEntries(Object.entries(config.listeCouponAl(ora)).map(([nome, lista]) => [nome,
    lista.map(({ code, discount, min, currency }) => ({ code, discount, min, currency }))
]));
const fuori = Object.values(config.coupons).flatMap(b => b.codici)
    .filter(c => String(c.code || '').trim() !== '' && config.statoCoupon(c, ora) !== 'valido')
    .map(c => `${c.code} ${config.statoCoupon(c, ora)}`);
console.log(`Giorno in Italia: ${config.giornoItaliano(ora)}. Coupon fuori dalle date: ${fuori.join(', ') || 'nessuno'}`);
const squadraAttiva = squadra.attiva === true && ora >= Date.parse(squadra.inizio) && ora <= Date.parse(squadra.fine);

const INIZIO = '<!-- DATI PER L\'ESTENSIONE -->';
const FINE = '<!-- FINE DATI PER L\'ESTENSIONE -->';

const blocco = [
    INIZIO,
    '    <!-- Generati da config.js con scripts/sincronizza-estensione.mjs: non modificarli qui, cambia config.js. -->',
    '    <script type="text/plain" id="dati-estensione">',
    `const enable_aliexpress_squad = ${squadraAttiva};`,
    `const coupons = ${JSON.stringify(coupons)};`,
    `<a href="${squadra.link}" class="squad-card"></a>`,
    '    </script>',
    '    ' + FINE
].join('\r\n');

const percorso = new URL('index.html', root);
const html = readFileSync(percorso, 'utf8');
const i = html.indexOf(INIZIO), j = html.indexOf(FINE);
if (i < 0 || j < i) throw new Error('Segnaposto dei dati per l\'estensione non trovati in index.html');

const nuovo = html.slice(0, i) + blocco + html.slice(j + FINE.length);
if (nuovo === html) {
    console.log('index.html già aggiornato');
} else {
    writeFileSync(percorso, nuovo);
    console.log(`index.html aggiornato (squadra ${squadraAttiva ? 'attiva' : 'spenta'})`);
}
