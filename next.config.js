/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_STOREFRONT_ACCESSTOKEN:'352c4e85a0242da524eb24ed9cce7c1d',
    SHOPIFY_STORE_DOMAIN:'swatchback.myshopify.com',
    STRAPI_CMS_DOMAIN:'http://localhost:1337'
  }
}

module.exports = nextConfig
