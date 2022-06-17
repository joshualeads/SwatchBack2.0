import React from "react";
import ReactMarkdown from "react-markdown";
import {Stack, Divider, Image, Heading, Text, Container} from "@chakra-ui/react";
import Carousel from "../Carousel";

const BlockType = (props) => {
    
    const {block} = props;

    if(block.__component == "shared.rich-text") {
        return (
            <ReactMarkdown>
                {block.body}
            </ReactMarkdown>
        )        
    } else if (block.__component == "shared.quote") {
        const { title, body } = block;
        return (
            <Stack spacing={4} as={Container} textAlign={'center'} marginTop={"3"} marginBottom={"3"} >
                <Divider />
                <blockquote>
                    <Heading fontSize={'xl'}>{title}</Heading>
                    <Text color={'gray.600'} fontSize={'xl'}>{body}</Text>
                </blockquote>
                <Divider />
            </Stack>
        )
    } else if (block.__component == "shared.media") {
        const imageURL = `${block.file.data.attributes.url}`;
        const altText = block.file.data.attributes.alternativeText || block.file.data.attributes.caption;

        return (
            <Stack as={Container} textAlign={'center'} marginTop={"3"} marginBottom={"3"}>
                <Image src={imageURL} alt={altText} borderRadius={"md"} boxShadow={"md"} />
            </Stack>
        )
    } else if (block.__component == "shared.slider") {      
        let slides = [];

        if(block.files.data.length) {
            block.files.data.map((file)=>{
                slides.push(`${file.attributes.url}`);
            })
        }

        if(slides.length){
            return (
                <Stack marginTop={"3"} marginBottom={"3"}>
                    <Carousel slides={slides} type={"blog"} />
                </Stack>
            )
        } else {
            return (
                <></>
            )
        }
        
    } else {
        return (
            <></>
        )
    }
}

export default BlockType;