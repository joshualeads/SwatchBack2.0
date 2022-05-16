import React from 'react';
import { Container, Stack, Box, Divider, Heading } from '@chakra-ui/react';
import TrendingStory from '../components/global/Blog/TrendingStory';

import { fetchAPI } from "../lib/strapiCMS";
import LatestStories from '../components/global/Blog/LatestStories';
import TopStories from '../components/global/Blog/TopStories';

const Blogs = ({ articles, categories, trending, topStories, recentStories }) => {

    console.log(articles);
    console.log(categories);
    console.log(trending);
    console.log(topStories);
    console.log(recentStories);

    return (
        <main>
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
                    <TrendingStory story={trending[0]} />
                    <Divider marginTop="5" />
                    {/* Latest Stories */}
                    <Heading marginTop="1" fontSize={"2xl"}>
                        Recent Stories
                    </Heading>
                    {
                        recentStories.map((recentStory) => {
                            return <LatestStories story={recentStory} key={Math.random()} />
                        })
                    }
                    <Divider marginTop="5" />
                </Box>

                <Box w={{base: '100%', md: '100%', lg:'30%'}}>
                    {/* Recent Stories */}
                    <Heading marginTop="1" fontSize={"2xl"}>
                        Top Stories
                    </Heading>
                    {
                        topStories.map((topStory) => {
                            return <TopStories story={topStory} key={Math.random()}/>
                        })
                    }
                </Box>
            </Container>
            </Box>
        </main>
    )
}

export async function getStaticProps() {
    // Run API calls in parallel
    const [articlesRes, categoriesRes, trendingRes, topStoriesRes, recentStoriesRes,] = await Promise.all([
        fetchAPI("/articles", { populate: "*" }),
        fetchAPI("/categories", { populate: "*" }),
        // Get Trending Blogs
        fetchAPI("/articles", {
            populate: "*",
            filter: {
                categories: {
                    slug: {
                        $eq: "trending"
                    }
                }
            }
        }),
        // Get Top Stories Blog
        fetchAPI("/articles", {
            populate: "*",
            filter: {
                categories: {
                    slug: {
                        $eq: "top-stories"
                    }
                }
            }
        }),
        // Get Recent Stories Blog
        fetchAPI("/articles", {
            populate: "*",
            filter: {
                categories: {
                    slug: {
                        $eq: "recent-stories"
                    }
                }
            }
        })
    ])

    return {
        props: {
            articles: articlesRes.data,
            categories: categoriesRes.data,
            trending: trendingRes.data,
            topStories: topStoriesRes.data,
            recentStories: recentStoriesRes.data
        },
        revalidate: 1,
    }
}

export default Blogs;