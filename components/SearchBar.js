import { Box, HStack, Image, Text } from "@chakra-ui/react";
import React, {useState} from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchBar = (props) => {

    const { showIcon, placeholder } = props;

    const [items, setItems] = useState([]);

    const handleOnSearch = async (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results);

        if(string){
            const URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-07/graphql.json`;

            const shopQuery = `{
                products(first: 25, query: "${string}") {
                edges {
                    node {
                    id
                    title
                    handle
                    priceRange {
                        minVariantPrice {
                        amount
                        }
                    }
                    images(first: 5) {
                        edges {
                        node {
                            originalSrc
                            altText
                        }
                        }
                    }
                    vendor
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                }
            }`;

            const apiLoad = {
                endpoint: URL,
                method: "POST",
                headers: {
                "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
                "Accept": "application/json",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: shopQuery })
            }

            let promise = new Promise((resolve, reject)=> {
                try {
                    const data = fetch(URL, apiLoad)
                    .then(response => {
                    return response.json()
                    }).then(products => {              
                        console.log(products.data.products.edges);
                        const productList = products.data.products.edges;
        
                        items = productList.map((i) => ({
                            avatar_url: i.node.images.edges[0].node.originalSrc,
                            id: i.node.id,
                            name: i.node.title,
                            handle: i.node.handle
                        }));
        
                        resolve("done");
                    }).catch(error => {
                        reject("error");
                        throw new Error("Products not fetched");
                    })
                } catch (error) {
                    reject("error");
                    throw new Error("Products not fetched");
                }
            });

            let result = await promise;

            if(result === 'done'){
                console.log('Promise is done');
                setItems(items);
                //setIsLoading(false);
            } else {
                console.log('Promise not done');
                setItems([]);
                //setIsLoading(false);
            }
        }
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused');

    }

    const formatResult = (item) => {
        return (
            <HStack>
                <Image style={{ display: 'block', textAlign: 'left' }} src={item.avatar_url} alt={item.name}  width={"100px"} height={"100px"} />
                <Text style={{ display: 'block', textAlign: 'left' }} textOverflow={"ellipsis"}>{item.name}</Text>
            </HStack>
        )
    }

    return (
        <Box width={"100%"} minW={400} fontSize={"2xl"}>
            <ReactSearchAutocomplete
                className={'searchBox'}
                items={items}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus={true}
                formatResult={formatResult}
                showIcon={showIcon}
                placeholder={placeholder}
                styling={
                    {
                        fontSize: "1rem",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        fontFamily: "inherit",
                        textAlign: "center"
                    }
                }
            />
        </Box>
    )
}

export default SearchBar;