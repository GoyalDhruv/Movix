import React from 'react'
import { useSelector } from 'react-redux'
import './style.css'

function Genres({ data }) {

    const { genres } = useSelector((state) => state.home)

    return (
        <div className='genres d-flex flex-wrap mb-4'>
            {
                data?.map((item) => {
                    if (!genres[item]?.name) return;
                    return (
                        <div key={item} className="genre">
                            {genres[item]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres