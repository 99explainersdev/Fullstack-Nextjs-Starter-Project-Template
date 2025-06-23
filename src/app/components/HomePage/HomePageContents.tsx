import React from 'react';
import HomeHero from './HomeHero';
import HomeAbout from './HomeAbout';

const HomePageContents = () => {
    return (
        <div>
            <HomeHero/>
            <HomeAbout/>
        </div>
    );
};

export default HomePageContents;