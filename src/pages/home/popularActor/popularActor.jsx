import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import useFetch from '../../../hooks/useFetch'
import CarouselActor from '../../../components/carouselActor/carouselActor'

function popularActor() {
    const { data, loading } = useFetch(`/person/popular`)
    // console.log('actor', data)

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Popular Actors</span>
            </ContentWrapper>
            <CarouselActor data={data?.results} loading={loading} />
        </div>
    )
}

export default popularActor