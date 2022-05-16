import React from "react";
import {Box, Link, Image, Heading, Text, HStack, Tag, useColorModeValue} from '@chakra-ui/react';

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

const Story = (props) => {
    return(
        <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
            <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center">
                <Box
                width={{ base: '100%', sm: '85%' }}
                zIndex="2"
                marginLeft={{ base: '0', sm: '5%' }}
                marginTop="5%">
                    <Link textDecoration="none" _hover={{ textDecoration: 'none' }} href={`/blog/${props.slug}`}>
                        <Image
                            borderRadius="lg"
                            src={props.image}
                            alt={props.imageAlt}
                            objectFit="contain"
                            transform="scale(1.0)"
                            transition="0.2s ease-in-out"
                            _hover={{
                                transform: 'scale(1.05)',
                            }}
                        />
                    </Link>
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                    <Box
                        bgGradient={useColorModeValue(
                            'radial(orange.600 1px, transparent 1px)',
                            'radial(orange.300 1px, transparent 1px)'
                        )}
                        backgroundSize="20px 20px"
                        opacity="0.4"
                        height="100%"
                        />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flex="1"
                    flexDirection="column"
                    justifyContent="center"
                    marginTop={{ base: '3', sm: '0' }}>
                        { 
                            props.storyType === "latestStory" ? 
                            <BlogTags tags={props.tags} /> : null 
                        }

                        <Heading marginTop="1" fontSize={"xl"}>
                            <Link textDecoration="none" _hover={{ textDecoration: 'none' }} href={`/blog/${props.slug}`}>
                            {props.title}
                            </Link>
                        </Heading>

                        {
                            props.storyType === 'latestStory' ? 
                            <Text
                                as="p"
                                marginTop="2"
                                color={useColorModeValue('gray.700', 'gray.200')}
                                fontSize="lg">
                                {props.description}
                            </Text> : null
                        }

                        {
                            props.storyType === 'latestStory' ? 
                            <BlogAuthor name={props.author} date={props.date.split('T')[0]} /> : null
                        }
                        
                        {
                            props.storyType === 'topStory' || props.storyType === 'trendingStory' ?
                            <BlogTags tags={props.tags} marginTop="5" /> : null 
                        }
                </Box>
            </Box>);
}

export default Story;