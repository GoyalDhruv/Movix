import React from 'react'
import useFetch from '../../../hooks/useFetch'
import CarouselActor from '../../../components/carouselActor/carouselActor'
import { RiseLoader } from 'react-spinners';


function popularActor() {
    const { data, loading } = useFetch(`/person/popular`)
    // console.log('actor', data)

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