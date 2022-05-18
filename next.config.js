/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_STOREFRONT_ACCESSTOKEN:'544244918c7e36ff08a00d337fdd1734',
    SHOPIFY_STORE_DOMAIN:'joshuajabakumar.myshopify.com',
    STRAPI_CMS_DOMAIN:'http://localhost:1337'
  }
}

module.exports = nextConfig
