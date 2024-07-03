import React from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/contentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import "./style.scss";
import actorDetails from "../actorDetails/actorDetails";
import { useNavigate } from "react-router-dom";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    // console.log('cast', data)

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {
                            data?.map((item) => {
                                let ImgURL = item.profile_path ? url.profile + item.profile_path : avatar
                                return (
                                    <div key={item.id} className="listItem"
                                        onClick={()=>navigate(`/${item.name}/${item.id}`)}
                                    >
                                        <div className="profileImg">
                                            <Img src={ImgURL}></Img>
                                        </div>
                                        <div className="name">
                                            {item.name}
                                        </div>
                                        <div className="character">
                                            {item.character}
                                        </div>
                                    </div>
                                )
                            })
                        }
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
            </ContentWrapper>
        </div>
    );
};

export default Cast;
