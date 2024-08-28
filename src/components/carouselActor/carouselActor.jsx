import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/avatar.png";
import "./style.css";

function carouselActor({ data, loading }) {

    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()

    function navigation(dir) {
        const container = carouselContainer.current;
        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount, behavior: 'smooth'
        })
    }

    function skItem() {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton">
                            <div className="date skeleton">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="carousel">
            <div className="container">
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow text-white"
                    onClick={() => navigation('left')}
                    style={{ color: "white" }}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow text-white"
                    onClick={() => navigation('right')}
                    style={{ color: "white" }}
                />
                {!loading ?
                    <div className="carouselItems"
                        ref={carouselContainer}
                    >
                        {data?.map((item) => {
                            const posterUrl = item.profile_path ?
                                url.poster + item.profile_path :
                                PosterFallback;
                            return (
                                <div key={item.id} className="carouselItem"
                                    onClick={() => navigate(`/${item.name}/${item.id}`)}
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                }
            </div>
        </div>
    )
}

export default carouselActor



