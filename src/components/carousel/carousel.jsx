import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/circleRating";
import Genres from "../genres/Genres";
import "./style.css";

function Carousel({ data, loading, endPoint, title, actor }) {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    function navigation(dir) {
        const container = carouselContainer.current;
        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    function skItem() {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock d-flex flex-column">
                        <div className="title skeleton mb-3 w-100"></div>
                        <div className="date skeleton w-75"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel">
            <div className="container">
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    color="white"
                    onClick={() => navigation('left')}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    color="white"
                    onClick={() => navigation('right')}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item?.poster_path ? url.poster + item?.poster_path : PosterFallback;
                            return (
                                <div
                                    key={item?.id}
                                    className="carouselItem"
                                    onClick={() => navigate(`/${item?.media_type || endPoint || 'movie'}/${item?.id}`)}
                                >
                                    <div className="posterBlock d-flex justify-content-between align-items-end">
                                        <Img src={posterUrl} />
                                        {!actor &&
                                            <CircleRating rating={item?.vote_average.toFixed(1)} />
                                        }
                                        <Genres data={item?.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item?.title || item?.name}</span>
                                        <span className="date">{dayjs(item?.release_date).format("MMM D, YYYY")}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton d-flex">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Carousel;
