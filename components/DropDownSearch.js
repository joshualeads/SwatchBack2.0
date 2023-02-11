import React, {useState} from 'react';
//import  from 'next/link';
import Router from 'next/router';
import { HStack, Link, Stack } from '@chakra-ui/react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Image from 'next/image';
import UserAvatar from 'react-user-avatar';
import { Show, Hide } from '@chakra-ui/react'

const DropDownSearch = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    let [options, setOptions] = useState([]);

    const handleSearch = async (query) => {
        setIsLoading(true);

        const URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-07/graphql.json`;

        const shopQuery = `{
            products(first: 25, query: "product_type:${props.searchType} and title:*${query}* and description:*${query}*") {
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

        let promise = new Promise((resolve, reject) => {
            try {
                const data = fetch(URL, apiLoad)
                    .then(response => {
                        return response.json()
                    }).then(products => {
                        console.log(products.data.products.edges);
                        const productList = products.data.products.edges;

                        options = productList.map((i) => ({
                            avatar_url: i.node.images.edges.length ? i.node.images.edges[0].node.originalSrc : '',
                            id: i.node.id,
                            login: i.node.title,
                            handle: i.node.handle
                        }));

                        resolve("done");
                    }).catch(error => {
                        console.log(error);
                        reject("error");
                        throw new Error("Products not fetched");
                    })
            } catch (error) {
                reject("error");
                throw new Error("Products not fetched");
            }
        });

        let result = await promise;

        if (result === 'done') {
            setOptions(options);
            setIsLoading(false);
        } else {
            setOptions([]);
            setIsLoading(false);
        }
    };

    const handleKeyDown = (target) => {
        if (target.key === "Enter" || target.key === "enter") {
            console.log(target);
            if (document.getElementsByClassName('dropdown-item active').length) {
                document.getElementsByClassName('dropdown-item active')[0].lastChild.click();
                setIsLoading(true);
            } else {
                if (options[0].handle) {
                    Router.push(`/product/${options[0].handle}`);
                    setIsLoading(true);
                }
            }
        }
    }

    const handleChange = (event) => {
        
    }

    const handleLinkClick = (event) => {
        setIsLoading(true);
        const handleValue = event.target.attributes.handle.value;
        Router.push(`/product/${handleValue}`);
    }

    const renderMenuItems = (option, props) => {
        return (
            <HStack key={option.id} onClick={handleLinkClick} handle={option.handle} onKeyDown={handleLinkClick} >
                {/* Mobile Section */}
                <Show below='md'>
                    <Stack className='basis-1/2'>
                    {option.avatar_url ? 
                        <Image
                        alt={option.login}
                        src={option.avatar_url}
                        style={{
                            height: '75px',
                            marginRight: '10px',
                            width: '75px',
                        }}
                        width= '75px'
                        height= '75px'
                        handle={option.handle}
                        />
                        : 
                        <Image
                            alt={option.login}
                            src={'https://img.icons8.com/bubbles/100/null/no-image.png'}
                            style={{
                                height: '75px',
                                marginRight: '10px',
                                width: '75px',
                            }}
                            width= '75px'
                            height= '75px'
                            handle={option.handle}
                        />
                    }
                    </Stack>
                    
                    <span className='basis-1/2 my-auto' handle={option.handle}>{option.login}</span>
                </Show>

                {/* Desktop Section */}
                <Show above='md'>
                    {option.avatar_url ? 
                        <Image
                        alt={option.login}
                        src={option.avatar_url}
                        style={{
                            height: '75px',
                            marginRight: '10px',
                            width: '75px',
                        }}
                        width= '75px'
                        height= '75px'
                        className='basis-3/4'
                        handle={option.handle}
                        />
                        : 
                        <Image
                            alt={option.login}
                            src={'https://img.icons8.com/bubbles/100/null/no-image.png'}
                            style={{
                                height: '75px',
                                marginRight: '10px',
                                width: '75px',
                            }}
                            width= '75px'
                            height= '75px'
                            className='basis-3/4'
                            handle={option.handle}
                        />
                    }
                    
                    <span className='basis-1/4 my-auto' handle={option.handle}>{option.login}</span>
                </Show>
            </HStack>
        )
    }

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <AsyncTypeahead
            className=''
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="login"
            minLength={3}
            onSearch={handleSearch}
            onChange={handleChange}
            options={options}
            placeholder="Search a product..."
            useCache={false}
            clearButton={true}
            onKeyDown={handleKeyDown}
            renderMenuItemChildren={(option, props) => renderMenuItems(option, props)}
        />
    );
}

export default DropDownSearch;