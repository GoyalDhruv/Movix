import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/carousel'
import { RiseLoader } from 'react-spinners';


function Upcoming() {
    const { data, loading } = useFetch(`/movie/upcoming`)


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