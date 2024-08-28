import React from "react";
import ContentWrapper from "../../components/contentWrapper/contentWrapper";

const Error404 = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "700px" }}>
      <ContentWrapper>
        <div className="text-center" style={{ color: "#173d77" }}>
          <div className="bigText" style={{ fontSize: "150px", fontWeight: "700" }}>404</div>
          <div className="smallText" style={{ fontSize: "44px" }}>Page not found!</div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Error404;
