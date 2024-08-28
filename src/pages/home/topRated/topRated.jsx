import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import SwitchTabs from '../../../components/switchTabs/switchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/carousel'

function topRated() {
    const [endPoint, setEndPoint] = useState("movie")

    const { data, loading } = useFetch(`/${endPoint}//top_rated`)
    // console.log('top_rated', data)
    function onTabChange(tab) {
        setEndPoint(tab === 'Movie' ? 'movie' : 'tv')
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default topRated