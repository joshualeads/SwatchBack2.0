import React from "react";
import { Box, HStack, Tag, Image, Text, Link, Heading  } from '@chakra-ui/react';

import { fetchAPI } from '../../lib/strapiCMS';

const BlogTags = (props) => {
    return (
      <HStack spacing={2} marginTop={props.marginTop}>
        {props.tags.map((tag) => {
          return (
            <Tag size={'sm'} variant="solid" colorScheme="orange" key={`${Math.random()}`}>
              {tag}
            </Tag>
          );
        })}
      </HStack>
    );
};

export const BlogAuthor = (props) => {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Image
          borderRadius="full"
          boxSize="40px"
          src="https://100k-faces.glitch.me/random-image"
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
    console.log(categories);

    const cover = story.attributes.cover.data.attributes;
    const storyInfo = story.attributes;
    const tags = getStoryTags(storyInfo.categories.data);
    let date = storyInfo.updatedAt;
    
    return(
        <main>
            <Box className="sb_container">
                <Box w="100%">
                    <Box borderRadius="lg" overflow="hidden">
                        <Image
                            src={`http://localhost:1337${cover.url}`}
                            alt={cover.alternativeText}
                            objectFit="contain"
                            width="100%"
                            />
                    </Box>

                    <BlogTags tags={tags} marginTop="3" />

                    <Heading fontSize="3xl" marginTop="2">
                        {storyInfo.title}
                    </Heading>

                    <BlogAuthor
                        name={storyInfo.author.data.attributes.name}
                        date={date.split('T')[0]}
                    />

                    <Text as="p" fontSize="md" marginTop="2">
                        {storyInfo.description}
                    </Text>

                    {/* Rich Text */}

                    {/* Quote */}

                    {/* Media */}
                </Box>
            </Box>
        </main>
    )
}

export async function getStaticPaths() {
    const storiesRes = await fetchAPI("/articles", { fields: ["slug"] });
  
    return {
      paths: storiesRes.data.map((story) => ({
        params: {
          slug: story.attributes.slug,
        },
      })),
      fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const storiesRes = await fetchAPI("/articles", {
      filters: {
        slug: params.slug,
      },
      populate: "*",
    })
    const categoriesRes = await fetchAPI("/categories")
  
    return {
      props: { story: storiesRes.data[0], categories: categoriesRes },
      revalidate: 1,
    }
  }

export default Blog;