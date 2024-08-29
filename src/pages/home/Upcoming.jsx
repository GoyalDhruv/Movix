import React from 'react'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../components/carousel/carousel'

function Upcoming() {
    const { data, loading } = useFetch(`/movie/upcoming`)
    // console.log('upcoming', data)

    return (
        <div className='carouselSection'>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col'>
                        <span className="carouselTitle">Upcoming Movies</span>
                    </div>
                </div>
            </div>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Upcoming