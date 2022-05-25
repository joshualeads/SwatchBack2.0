import React from "react";
import Story from "./Story";

const TrendingStory = (props) => {
    const cover = props.story.attributes.cover.data.attributes;
    const storyInfo = props.story.attributes;

    const getStoryTags = (tags) => {
        let storyTags = [];
        if(tags && tags.length){
            tags.map((tag) => {
                storyTags.push(tag.attributes.name);
            });
        }
        return storyTags;
    }

    return(
        <Story 
            image={`${process.env.STRAPI_CMS_DOMAIN}${cover.url}`}
            imageAlt = {cover.alternativeText}
            title = {storyInfo.title}
            description = {storyInfo.description}
            tags={getStoryTags(storyInfo.categories.data)}
            author={storyInfo.author.data.attributes.name}
            authorAvatar={`${process.env.STRAPI_CMS_DOMAIN}`+`${storyInfo.author.data.attributes.avatar.data.attributes.url}`}
            slug={storyInfo.slug}
            date={storyInfo.updatedAt}
            storyType={"trendingStory"}
        />
    );
}

export default TrendingStory;