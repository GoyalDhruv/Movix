import React, { useState } from "react";
import useFetch from '../../../hooks/useFetch.jsx'
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
// import "../detailsBanner/detailsBanner.jsx";
import "./style.css";
import Carousel from "../../../components/carousel/carousel.jsx";

const actorDetails = ({ id }) => {

    const { url } = useSelector((state) => state.home)

    const { data, loading } = useFetch(`/person/${id}`)
    // console.log('data', data)
    const { data: combined_credits, loading: combined_credits_loading } = useFetch(`/person/${id}/combined_credits`)

    // console.log('combined_credits2', combined_credits?.cast)

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
                                <Img src={url.backdrop + data?.profile_path} />
                            </div>
                            <div className="opacity-layer">
                            </div>
                            <div className="container">
                                <div className="content">
                                    <div className="row">
                                        <div className="left col-md-3 text-white">
                                            {
                                                data.profile_path ?
                                                    <Img className='posterImg'
                                                        src={url.backdrop + data.profile_path}
                                                    />
                                                    :
                                                    <Img className='posterImg'
                                                        src={PosterFallback}
                                                    />
                                            }
                                            <div className="info mt-3">
                                                {data.known_for_department && (
                                                    <div className="infoItem">
                                                        <span className="text bold
                                                    ">
                                                            Known For{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.known_for_department}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.gender && (
                                                    <div className="infoItem">
                                                        <span className="text bold
                                                    ">
                                                            Gender{" "}
                                                        </span>
                                                        <span className="text">
                                                            {
                                                                data.gender == 2 ? "Male" : "Female"
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                {data.birthday && (
                                                    <div className="infoItem">
                                                        <span className="text bold
                                                    ">
                                                            Birthday{" "}
                                                        </span>
                                                        <span className="text">
                                                            {dayjs(data.birthday).format("MMMM DD, YYYY")}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.place_of_birth && (
                                                    <div className="infoItem">
                                                        <span className="text bold
                                                    ">
                                                            Place of Birth{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.place_of_birth}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="right col-md-9 ">
                                            <div className="title">
                                                {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
                                            </div>
                                            <div className="subtitle">
                                                {data.tagline}
                                            </div>
                                            <div className="overview mt-3">
                                                <h4 className="heading">
                                                    Biography
                                                </h4>
                                                <div className="description">
                                                    {data.biography}
                                                </div>
                                                <div>
                                                    <div className="heading">
                                                        <p className="text bold my-3">Known For</p>
                                                        <Carousel
                                                            data={combined_credits?.cast}
                                                            loading={combined_credits_loading}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
            )
            }
        </div >
    );
};

export default actorDetails;