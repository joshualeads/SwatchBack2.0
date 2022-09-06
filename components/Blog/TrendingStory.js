import React from "react";
import Story from "./Story";

const TrendingStory = (props) => {
    const cover = (props.story.attributes.cover.data ? props.story.attributes.cover.data.attributes : undefined) || undefined;
    const storyInfo = props.story.attributes || undefined;

    const getStoryTags = (tags) => {
        let storyTags = [];
        if(tags && tags.length){
            tags.map((tag) => {
                storyTags.push(tag.attributes.name);
            });
        }
        return storyTags;
    }

    if(cover && storyInfo) {
        return(
            <Story 
                image={cover ? `${cover.url}` : ''}
                imageAlt = {cover ? cover.alternativeText : ''}
                title = {storyInfo.title}
                description = {storyInfo.description}
                tags={getStoryTags(storyInfo.categories.data)}
                author={storyInfo.author.data.attributes.name || 'Unknown'}
                authorAvatar={storyInfo.author.data.attributes.avatar.data ? `${storyInfo.author.data.attributes.avatar.data.attributes.url}` : undefined}
                slug={storyInfo.slug}
                date={storyInfo.updatedAt}
                storyType={"trendingStory"}
            />
        );
    } else {
        <></>
    }
}

export default TrendingStory;