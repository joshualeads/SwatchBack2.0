import React from "react";
import { Box } from "@chakra-ui/react";
import { getProduct, recursiveCatalog } from "../../lib/shopify"

const ProductDetailPage = ({product}) => {
    console.log(product);
    return (
        <main>
            <Box className="sb_container">
              <p>Product Detail Page</p>
            </Box>
        </main>
    )
}

export async function getStaticPaths() {
    const products = await recursiveCatalog()
  
    const paths = products.map(item => {
      const product = String(item.node.handle)
  
      return {
        params: { product }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    const product = await getProduct(params.product)
  
    return {
      props: {
        product
      }
    }
}

export default ProductDetailPage;