import React from "react";
import Head from "next/head";
import { Box, HStack, Tag, Image, Text, Heading } from '@chakra-ui/react';
import BlockType from "../../components/Blog/BlockType";

import { fetchAPI } from '../../lib/strapiCMS';

const BlogTags = (props) => {
    return (
      <HStack spacing={2} marginTop={props.marginTop} marginBottom={props.marginBottom} justifyContent={"right"}>
        {props.tags.map((tag) => {
          return (
            <Tag size={'sm'} variant="solid" colorScheme="blackAlpha" key={`${Math.random()}`}>
              {tag}
            </Tag>
          );
        })}
      </HStack>
    );
};

const BlogAuthor = (props) => {
    return (
      <HStack marginTop="3" marginBottom="3" spacing="2" display="flex" alignItems="center" textAlign={"center"} justifyContent={"center"}>
        <Image
          borderRadius="full"
          boxSize="40px"
          //src="https://100k-faces.glitch.me/random-image"
          src={props.authorAvatar}
          alt={`Avatar of ${props.name || ''}`}
        />
        <Text fontWeight="medium">{props.name}</Text>
        <Text>—</Text>
        <Text>{props.date? props.date : ''}</Text>
      </HStack>
    );
};

const getStoryTags = (tags) => {
    let storyTags = [];
    if(tags && tags.length){
        tags.map((tag) => {
            storyTags.push(tag.attributes.name);
        });
    }
    return storyTags;
}

const Blog = ({ story, categories }) => {
    
    console.log(story);
    //console.log(categories);

    const cover = story.attributes.cover.data.attributes;
    const storyInfo = story.attributes;
    const tags = getStoryTags(storyInfo.categories.data);
    let date = storyInfo.updatedAt;
    
    return(
        <main>
            <Head>
              <title>{storyInfo.title} - SwatchBack</title>
            </Head>
            <Box className="sb_container">
                <Box w="100%" alignItems={"center"} textAlign={"center"}>
                    
                    <BlogTags tags={tags} marginTop="3" marginBottom="3" />

                    <Box borderRadius="lg" overflow="hidden">
                        <Image
                            src={`${process.env.STRAPI_CMS_DOMAIN}${cover.url}`}
                            alt={cover.alternativeText}
                            objectFit="contain"
                            width="100%"
                            />
                    </Box>

                    <Heading fontSize="3xl" marginTop="3" marginBottom={"3"} textTransform={"capitalize"}>
                        {storyInfo.title}
                    </Heading>

                    <BlogAuthor
                        name={storyInfo.author.data.attributes.name}
                        date={date.split('T')[0]}
                        authorAvatar={`${process.env.STRAPI_CMS_DOMAIN}`+`${storyInfo.author.data.attributes.avatar.data.attributes.url}`}
                    />

                    <Text as="p" fontSize="md" marginTop={"2"} marginBottom={"3"}>
                        {storyInfo.description}
                    </Text>

                    {
                        storyInfo.blocks && storyInfo.blocks.length ? 
                            storyInfo.blocks.map((block) => 
                                <BlockType block={block} key={Math.random()} />
                            )
                            : <React.Fragment></React.Fragment>
                    }
                </Box>
            </Box>
        </main>
    )
}

export async function getStaticPaths() {

  const storiesResponse = [];
  let page = 1; // Current page
  let pageSize = 25; // Items per page
  let pageCount = 1; // Total no of pages
  let total = 0; // Total items

  for(page=1; page<=pageCount; page++){
    let res = await fetchAPI("/articles", 
    { 
      fields: ["slug"], 
      pagination: {
        page: page,
        pageSize: pageSize,
      } 
    });

    res.data.map((slug) => {
      storiesResponse.push(slug);
    })
    
    pageCount = res.meta.pagination.pageCount;
  }

  return {
    paths: storiesResponse.map((story) => ({
      params: {
        slug: story.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {

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
            fields: ["name", "slug"]
        },
        blocks: {
          populate: "*"
        }
    },
    filters: {
      slug: params.slug,
    }
  };

    const storiesRes = await fetchAPI("/articles", queryFilter);
    const categoriesRes = await fetchAPI("/categories");
  
    return {
      props: { story: storiesRes.data[0], categories: categoriesRes },
      revalidate: 1,
    }
}

export default Blog;