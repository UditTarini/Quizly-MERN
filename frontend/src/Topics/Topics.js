import React from "react";
import NavigationBar from "../Commons/NavigationBar";
import TopicCard from "./TopicCard";

const Quizes = () => {
  return (
    <>
      <NavigationBar />
      <div className="container  mt-5">
        <div className="row">
          <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 mb-4">
            <TopicCard />
          </div>
          <div className="col-xl-2 col-lg-4 col-md-4  col-sm-6 col-6">
            <TopicCard />
          </div>{" "}
          <div className="col-xl-2 col-lg-4 col-md-4  col-sm-6 col-6">
            <TopicCard />
          </div>{" "}
          <div className="col-xl-2 col-lg-4 col-md-4  col-sm-6 col-6">
            <TopicCard />
          </div>{" "}
          <div className="col-xl-2 col-lg-4 col-md-4  col-sm-6 col-6">
            <TopicCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Quizes;
