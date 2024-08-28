import React, { useState } from "react";
import useFetch from '../../../hooks/useFetch.jsx'
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.css";
import Carousel from "../../../components/carousel/carousel.jsx";

const actorDetails = ({ id }) => {

    const { url } = useSelector((state) => state.home)

    const { data, loading } = useFetch(`/person/${id}`)

    const { data: combined_credits, loading: combined_credits_loading } = useFetch(`/person/${id}/combined_credits`)

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
                                <div className="content row">
                                    <div className="left col-md-3 col-12">
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
                                        <div className="info">
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
                                    <div className="right col-md-8 col-12">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Biography
                                            </div>
                                            <div className="description">
                                                {data.biography}
                                            </div>
                                            <div>
                                                <div className="heading">
                                                    <p className="text bold" style={{ marginTop: '10px', marginBottom: "10px" }}>Known For</p>
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

export default actorDetails;