// The "Product Site" link on a product's page: its own marketing site, by the product's slug. Left empty on purpose:
// a product gets an entry only once Kidus has approved its site and its address, so no address is guessed here. This
// map is the only place a product site URL lives; the page shows the link only for a product listed here, and
// src/content/projects/index.ts fails the build on an unknown slug or a link that isn't https.
// Format: '<product-slug>': 'https://<approved address>',
export const PRODUCT_SITES: Readonly<Record<string, string>> = {};
