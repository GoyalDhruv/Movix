import React from 'react'
import useFetch from '../../hooks/useFetch'
import Carousel from '../../components/carousel/carousel'
import ClipLoader from "react-spinners/ClipLoader";

function Upcoming() {
    const { data, loading } = useFetch(`/movie/upcoming`)
    // console.log('upcoming', data)

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
                                <div className='col'>
                                    <span className="carouselTitle">Upcoming Movies</span>
                                </div>
                            </div>
                        </div>
                        <Carousel data={data?.results} loading={loading} />
                    </div>
            }
        </>
    )
}

export default Upcoming