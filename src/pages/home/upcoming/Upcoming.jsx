import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/carousel'

function Upcoming() {
    const { data, loading } = useFetch(`/movie/upcoming`)
    // console.log('upcoming', data)

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Upcoming Movies</span>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Upcoming