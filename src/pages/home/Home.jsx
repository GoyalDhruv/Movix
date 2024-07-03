import React from 'react'
import './style.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import Upcoming from './upcoming/Upcoming'
import TopRated from './topRated/topRated'
import PopularActor from './popularActor/popularActor'

function Home() {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending />
            <TopRated />
            <Popular />
            <Upcoming />
            <PopularActor />
        </div>
    )
}


export default Home