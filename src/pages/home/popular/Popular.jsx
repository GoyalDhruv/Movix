import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import SwitchTabs from '../../../components/switchTabs/switchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/carousel'

function Popular() {
    const [endPoint, setEndPoint] = useState("movie")

    const { data, loading } = useFetch(`/${endPoint}/popular`)
    // console.log('popular', data)
    function onTabChange(tab) {
        setEndPoint(tab === 'Movie' ? 'movie' : 'tv')
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default Popular