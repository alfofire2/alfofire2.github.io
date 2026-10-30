# AliExpress Coupon Codes Website

A clean, responsive, and easy-to-use single-page website designed to display AliExpress coupon codes. Values are kept in `config.js`.

## Features

-   **Modern & Responsive Design**: Looks great on desktop and mobile devices.
-   **Dynamic Coupon Generation**: Coupons are generated from a simple JavaScript object, making them easy to update.
-   **Click-to-Copy**: Users can easily copy coupon codes with a single click.
-   **SEO Optimized**: Includes meta tags and structured data for better search engine visibility and social media sharing.

## How to Use

Simply open the `index.html` file in any modern web browser to view the website.

## How to Update Coupons

All the values the site uses live in `config.js`: the coupons, the AliExpress cashback squad (on/off, link, event dates, percentages, daily cap) and the checkout payment discount (name and thresholds). Edit only that file; the comments in it explain each value.

- The homepage (`index.html`) and the calculator (`calculator.html`) read `config.js` directly.
- The browser extension reads its data from the homepage HTML, so the workflow `.github/workflows/sincronizza-estensione.yml` copies the coupons, the squad link and the squad switch from `config.js` into a block in `index.html` (between the `DATI PER L'ESTENSIONE` comments). It runs when `config.js` changes and every hour, so the squad also turns off in the extension when the event ends. Do not edit that block by hand; to run the copy locally: `node scripts/sincronizza-estensione.mjs`.

Each coupon block has its currency and a set of ready-made slots; fill a slot to add a coupon, empty its code to remove it:

```javascript
generici: {
    valuta: '€',            // '€' or '$', for the whole block
    codici: [
        { code: 'CODE',  discount: 10, min: 69 },
        { code: '',      discount: 0,  min: 0 }   // empty slot: ignored everywhere
    ]
}
```

Slots with an empty code are skipped, and a block with no codes hides its section on the homepage.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.