import React, { useState } from 'react'
import SwitchTabs from '../../../components/switchTabs/switchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/carousel'
import { RiseLoader } from 'react-spinners';

function Popular() {
    const [endPoint, setEndPoint] = useState("movie")

    const { data, loading } = useFetch(`/${endPoint}/popular`)
    function onTabChange(tab) {
        setEndPoint(tab === 'Movie' ? 'movie' : 'tv')
    }

    return (
        <>
            {loading ?

                <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
                    <RiseLoader />
                </div>
                :
                <div className='carouselSection'>
                    <div className='container mb-3'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-6 col-6'>
                                <span className="carouselTitle">
                                    What's Popular
                                </span>
                            </div>
                            <div className='offset-lg-4 offset-md-3 offset-sm-2 offset-1 col-lg-2 col-md-3 col-sm-4 col-5'>
                                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
                            </div>
                        </div>
                    </div>    <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
                </div>
            }
        </>
    )
}

export default Popular