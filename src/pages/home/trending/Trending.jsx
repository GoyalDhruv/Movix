import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import SwitchTabs from '../../../components/switchTabs/switchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/carousel'
import ClipLoader from "react-spinners/ClipLoader";

function Trending() {
    const [endPoint, setEndPoint] = useState("day")

    const { data, loading } = useFetch(`/trending/all/${endPoint}`)

    function onTabChange(tab) {
        setEndPoint(tab === 'Day' ? 'day' : 'week')
    }


    return (
        <>
            {
                loading ?
                    <div className='d-flex w-100 justify-content-center h-100 align-items-center'>
                        <ClipLoader />
                    </div>
                    :
                    <div className='carouselSection'>
                        <div className='container'>
                            <div className='row mb-3'>
                                <div className='col-xl-10 col-lg-9 col-md-8 col-sm-7 col-4'>
                                    <span className="carouselTitle">Trending</span>
                                </div>
                                <div className='col-xl-2 col-lg-3 col-md-4 col-sm-5 col-8'>
                                    <div className='d-flex justify-content-end'>
                                        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Carousel data={data?.results} loading={loading} />
                    </div>
            }
        </>
    )
}

export default Trending