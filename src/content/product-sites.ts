// The "Product Site" link on a product's page: its own marketing site, by the product's slug. Kidus approved these
// addresses on 2026-11-03/04 (DNS live, each one answering 200). This map is the only place a product site URL lives;
// the page shows the link only for a product listed here, and src/content/projects/index.ts fails the build on an
// unknown slug or a link that isn't https.
export const PRODUCT_SITES: Readonly<Record<string, string>> = {
  'versa-ops': 'https://ops.versalabs-studio.com',
  'versa-fx': 'https://fx.versalabs-studio.com',
  'versa-rent': 'https://rent.versalabs-studio.com',
  'safeframe': 'https://safeframe.versalabs-studio.com',
  'versa-estate': 'https://estate.versalabs-studio.com',
  'versalabs-ade': 'https://ade.versalabs-studio.com',
};
