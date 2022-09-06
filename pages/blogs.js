import React from 'react';
import Head from 'next/head';
import { Container, Stack, Box, Divider, Heading, Text } from '@chakra-ui/react';

import { fetchAPI } from "../lib/strapiCMS";
import { useFetchUser } from '../lib/authContext';
import Layout from '../components/global/Layout'
import LatestStories from '../components/Blog/LatestStories';
import TopStories from '../components/Blog/TopStories';
import TrendingStory from '../components/Blog/TrendingStory';

const Blogs = ({ articles, categories, trending, topStories, recentStories }) => {

    console.log(articles);
    console.log(categories);
    console.log(trending);
    console.log(topStories);
    console.log(recentStories);

    const { user, loading } = useFetchUser();

    return (
        <Layout user={user}>
            <Head>
                <title>Blog - SwatchBack</title>
            </Head>
            <Box className={'sb_container'}>
            <Container
                as={Stack}
                maxW={'12xl'}
                py={4}
                px={0}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'top', md: 'top' }}
            >
                <Box w={{base: '100%', md: '100%', lg:'70%'}}>
                    {/* Trending */}
                    <Heading marginTop="1" fontSize={"2xl"}>
                        Trending...
                    </Heading>
                    {trending[0] ? 
                        <TrendingStory story={trending[0]} />
                        :
                        <Text>No Posts</Text>
                    }
                    <Divider marginTop="5" />
                    {/* Latest Stories */}
                    <Heading marginTop="1" fontSize={"2xl"}>
                        Recent Stories
                    </Heading>
                    {
                        recentStories.length > 0 ?
                        <>{
                            recentStories.map((recentStory) => {
                                return <LatestStories story={recentStory} key={Math.random()} />
                            })
                        }</>
                        :
                        <Text>No Posts</Text>
                    }
                    
                    <Divider marginTop="5" />
                </Box>

                <Box w={{base: '100%', md: '100%', lg:'30%'}}>
                    {/* Recent Stories */}
                    <Heading marginTop="1" fontSize={"2xl"}>
                        Top Stories
                    </Heading>
                    {
                        topStories.length > 0 ?
                        <>{
                            topStories.map((topStory) => {
                                return <TopStories story={topStory} key={Math.random()}/>
                            })
                        }</>
                        :
                        <Text>No Posts</Text>
                    }
                </Box>
            </Container>
            </Box>
        </Layout>
    )
}

export async function getServerSideProps () {
    // Run API calls in parallel

    const queryFilter = {
        populate: {
            cover: {
                fields: ["url", "name", "alternativeText", "caption"]
            },
            author: {
                fields: ["name","email"],
                populate: {
                    avatar: {
                        fields: ["name", "alternativeText", "url"]
                    }
                }
            },
            categories: {
                populate: "*"
            },
        },
        filter: {
            categories: {
                slug: {
                    $eq: "trending"
                }
            }
        }
    };

    const [articlesRes, categoriesRes, trendingRes, topStoriesRes, recentStoriesRes,] = await Promise.all([
        fetchAPI("/articles", { populate: "*" }),
        fetchAPI("/categories", { populate: "*" }),
        // Get Trending Blogs
        fetchAPI("/articles", queryFilter),
        // Get Top Stories Blog
        fetchAPI("/articles", queryFilter),
        // Get Recent Stories Blog
        fetchAPI("/articles", queryFilter)
    ])

    return {
        props: {
            articles: articlesRes.data,
            categories: categoriesRes.data,
            trending: trendingRes.data,
            topStories: topStoriesRes.data,
            recentStories: recentStoriesRes.data
        }
    }
}

export default Blogs;