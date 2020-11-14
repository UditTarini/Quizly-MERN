import React from "react";
import NavigationBar from "../Commons/NavigationBar";
import TopicCard from "./TopicCard";
import {topicsData} from "../Commons/Utils/data";

const Topics = () => {
  return (
    <>
      <NavigationBar />

      <div className="container  mt-5">
        <div className="row">
          {topicsData.map((data, index) => (
            <div
              key={index}
              className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4"
              // onClick={play(data.id)}
            >
              <TopicCard id={data.id} icon={data.icon} name={data.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Topics;
