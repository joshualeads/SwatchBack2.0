import React from "react";
import Story from "./Story";

const TopStories = (props) => {
    const cover = props.story.attributes.cover.data.attributes || undefined;
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

    return(
        <Story 
            image={`${cover.url}`}
            imageAlt = {cover.alternativeText}
            title = {storyInfo.title}
            description = {storyInfo.description}
            tags={getStoryTags(storyInfo.categories.data)}
            author={storyInfo.author.data.attributes.name}
            authorAvatar={storyInfo.author.data.attributes.avatar.data ? `${storyInfo.author.data.attributes.avatar.data.attributes.url}` : undefined}
            slug={storyInfo.slug}
            date={storyInfo.updatedAt}
            storyType={"topStory"}
        />
    );
}

export default TopStories;