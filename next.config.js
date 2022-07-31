/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHOPIFY_STOREFRONT_ACCESSTOKEN:'352c4e85a0242da524eb24ed9cce7c1d',
    SHOPIFY_STORE_DOMAIN:'swatchback.myshopify.com',
    STRAPI_CMS_DOMAIN:'http://localhost:1337',
    NEXT_PUBLIC_API_URL: 'http://localhost:1337/api',
    NEXT_PUBLIC_DATABASE_URL: 'postgres://strapi:strapi@localhost:5432/strapi?synchronize=true',
    NEXT_PUBLIC_URL: 'http://localhost:3000/',
    GOOGLE_CLIENT_ID: '594857553850-uda2tdkk6bk9b3ucm1iripdekboj51i1.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    SECRET: 'I3J091HmiFN__FDb348NNJT_2Oqvkhf8PhoAC-Yt1avRPuRcBYEbonWADzdjWTrdlFZfath6ImgdNfDavj6upg'
  },
  images: {
    domains: ['cdn.shopify.com','strapi-swatchback-deploy.herokuapp.com','oyster-app-vxwdi.ondigitalocean.app']
  }
}

module.exports = nextConfig
