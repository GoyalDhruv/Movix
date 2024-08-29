import React, { useState } from 'react'
import SwitchTabs from '../../components/switchTabs/switchTabs'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../components/carousel/carousel'

function topRated() {
    const [endPoint, setEndPoint] = useState("movie")

    const { data, loading } = useFetch(`/${endPoint}/top_rated`)
    // console.log('top_rated', data)
    function onTabChange(tab) {
        setEndPoint(tab === 'Movie' ? 'movie' : 'tv')
    }

    return (
        <div className='carouselSection'>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col-xl-10 col-lg-9 col-md-8 col-sm-7 col-5'>
                        <span className="carouselTitle">Top Rated</span>
                    </div>
                    <div className='col-xl-2 col-lg-3 col-md-4 col-sm-5 col-7'>
                        <div className='d-flex justify-content-end'>

                            <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
                        </div>
                    </div>
                </div>
            </div>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default topRated