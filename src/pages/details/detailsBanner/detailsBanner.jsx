import React, { useState } from "react";
import useFetch from '../../../hooks/useFetch.jsx'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper.jsx";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/circleRating.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.css";
import { PlayIcon } from "../PlayIcon.jsx";
import VideoPopup from "../../../components/videoPopup/videoPopup.jsx";


const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { url } = useSelector((state) => state.home)
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    // console.log(data)

    const director = crew?.filter((f) => f.job === 'Director')
    const writer = crew?.filter((f) => f.job === 'Screenplay' ||
        f.job === 'Story' || f.job === 'Writer')

    // console.log('directw', director, writer)

    const _genres = data?.genres?.map((item) => item.id)


    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer">
                            </div>
                            <div className="container">
                                <div className="content row">
                                    <div className="left col-md-3 col-12">
                                        {
                                            data.poster_path ?
                                                <Img className='posterImg'
                                                    src={url.backdrop + data.poster_path}
                                                />
                                                :
                                                <Img className='posterImg'
                                                    src={PosterFallback}
                                                />
                                        }
                                    </div>
                                    <div className="right col-md-8 col-12">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />
                                        <div className="row_1">
                                            <CircleRating rating={data.vote_average.toFixed(1)} />

                                            <div className="playbtn" onClick={() => {
                                                setShow(true);
                                                setVideoId(video.key);
                                            }}>
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold
                                                    ">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold
                                                    ">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data.release_date).format('MMM D, YYYY')}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold
                                                    ">
                                                        RunTime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director.map((d, i) =>
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length - 1 !== i && ', '}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer.map((d, i) =>
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length - 1 !== i && ', '}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.created_by.map((d, i) =>
                                                        <span key={i}>
                                                            {d.name}
                                                            {data.created_by.length - 1 !== i && ', '}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </div>
                        </>
                    )
                    }
                </>

            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;