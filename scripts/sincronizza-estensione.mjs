// Copia da config.js a index.html i dati che l'estensione del browser legge dalla homepage.
// L'estensione (versione 1.1.5) scarica la homepage e cerca, così come sono scritte:
//   const enable_aliexpress_squad = true|false;
//   const coupons = {...};
//   <a href="..." class="squad-card">
// Questo script le scrive in un blocco non eseguito nel <head>, tra i due commenti segnaposto.
// Lo lancia .github/workflows/sincronizza-estensione.yml quando cambia config.js e ogni ora,
// così la squadra si spegne nell'estensione anche quando finisce l'evento.
//
// Uso: node scripts/sincronizza-estensione.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const root = new URL('../', import.meta.url);
const config = runInNewContext(readFileSync(new URL('config.js', root), 'utf8') + '\n;PRODIGEEK');

const { squadra, coupons } = config;
const ora = Date.now();
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
