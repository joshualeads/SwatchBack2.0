/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_STOREFRONT_ACCESSTOKEN:'352c4e85a0242da524eb24ed9cce7c1d',
    SHOPIFY_STORE_DOMAIN:'swatchback.myshopify.com',
    STRAPI_CMS_DOMAIN:'https://strapi-swatchback-deploy.herokuapp.com',
    NEXT_PUBLIC_STRAPI_API_URL: 'https://strapi-swatchback-deploy.herokuapp.com'
  },
  images: {
    domains: ['cdn.shopify.com','strapi-swatchback-deploy.herokuapp.com']
  }
}

module.exports = nextConfig
