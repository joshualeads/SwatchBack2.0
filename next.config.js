/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_STOREFRONT_ACCESSTOKEN:'352c4e85a0242da524eb24ed9cce7c1d',
    SHOPIFY_STORE_DOMAIN:'swatchback.myshopify.com',
    STRAPI_CMS_DOMAIN:'https://oyster-app-vxwdi.ondigitalocean.app',
    NEXT_PUBLIC_STRAPI_API_URL: 'https://oyster-app-vxwdi.ondigitalocean.app'
  },
  images: {
    domains: ['cdn.shopify.com','strapi-swatchback-deploy.herokuapp.com','oyster-app-vxwdi.ondigitalocean.app']
  }
}

module.exports = nextConfig
