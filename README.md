# AliExpress Coupon Codes Website

A clean, responsive, and easy-to-use single-page website designed to display AliExpress coupon codes. The entire website is self-contained in `index.html`.

## Features

-   **Modern & Responsive Design**: Looks great on desktop and mobile devices.
-   **Dynamic Coupon Generation**: Coupons are generated from a simple JavaScript object, making them easy to update.
-   **Click-to-Copy**: Users can easily copy coupon codes with a single click.
-   **SEO Optimized**: Includes meta tags and structured data for better search engine visibility and social media sharing.

## How to Use

Simply open the `index.html` file in any modern web browser to view the website.

## How to Update Coupons

All coupon data is stored within a single JavaScript object called `coupons` inside the `<script>` tag at the bottom of `index.html`.

To edit, add, or remove coupons, modify the arrays within this `coupons` object. The coupons are categorized into four lists:

1.  `esclusiviProdigeek`
2.  `altriEsclusiviProdigeek`
3.  `standardProdigeek`
4.  `generici`

Each coupon is an object with the following structure:

```javascript
{
    discount: 10,   // The discount amount (number)
    min: 69,      // The minimum spend (number)
    code: 'CODE', // The coupon code (string)
    currency: '€' // The currency symbol (string, e.g., '€' or '$')
}
```

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.