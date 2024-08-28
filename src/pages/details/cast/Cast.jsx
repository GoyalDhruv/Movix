import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap"; // Bootstrap import
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import './style.css'

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const skeleton = () => (
        <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );

    return (
        <div className="castSection">
            <Container>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item) => {
                            let ImgURL = item.profile_path ? url.profile + item.profile_path : avatar;
                            return (
                                <div key={item.id} className="listItem" onClick={() => navigate(`/${item.name}/${item.id}`)}>
                                    <div className="profileImg">
                                        <Img src={ImgURL} alt={item.name} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Cast;
