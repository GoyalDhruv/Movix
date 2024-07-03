import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/detailsBanner'
import ActorDetails from './actorDetails/actorDetails'
import Cast from './cast/Cast'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'
import './style.scss'

function Details() {
    const { mediaType, id } = useParams()
    let video = null, videoLoading = false, credits = null, creditsLoading = false

    if (mediaType === 'movie' || mediaType === 'tv') {
        const videoFetch = useFetch(`/${mediaType}/${id}/videos`)
        const creditsFetch = useFetch(`/${mediaType}/${id}/credits`)
        video = videoFetch.data
        videoLoading = videoFetch.loading
        credits = creditsFetch.data
        creditsLoading = creditsFetch.loading
    }

    // console.log('credit', credits)
    // console.log('video', video)


    return (
        <div>{
            mediaType === 'movie' || mediaType === 'tv' ?
                <>
                    <DetailsBanner
                        video={video?.results[0]}
                        crew={credits?.crew}
                    />
                    <Cast data={credits?.cast} loading={creditsLoading} />
                    <Similar mediaType={mediaType} id={id} />
                    <Recommendation mediaType={mediaType} id={id} />
                </>
                :
                <ActorDetails id={id} />
        }
        </div>
    )
}

export default Details