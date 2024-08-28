import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from './../../../components/contentWrapper/contentWrapper';
import './style.css';  // Updated to CSS

function HeroBanner() {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch('/movie/upcoming');

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    function searchQueryHandler(e) {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className='heroBanner'>
            {!loading &&
                <div className="backdrop-img">
                    <Img src={background} alt="" />
                </div>
            }

            <div className="opacity_layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent text-center">
                    <span className="title display-4 font-weight-bold">
                        Welcome
                    </span>
                    <span className="subTitle h4 font-weight-normal">
                        Millions of movies, TV shows, and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput d-flex">
                        <input
                            type="text"
                            placeholder='Search for a movie or a TV show...'
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setQuery(e.target.value)}
                            className="form-control rounded-start"
                        />
                        <button className="btn btn-primary rounded-end">Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default HeroBanner;
