import React from 'react'
import useFetch from '../../hooks/useFetch'
import CarouselActor from '../../components/carousel/carouselActor'
import ClipLoader from "react-spinners/ClipLoader";

function popularActor() {
    const { data, loading } = useFetch(`/person/popular`)
    // console.log('actor', data)

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
                                    <span className="carouselTitle">Popular Actors</span>
                                </div>
                            </div>
                        </div>
                        <CarouselActor data={data?.results} loading={loading} />
                    </div>
            }
        </>
    )
}

export default popularActor