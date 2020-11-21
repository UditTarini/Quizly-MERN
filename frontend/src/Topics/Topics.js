import React, {useEffect, useState} from "react";
import NavigationBar from "../Commons/NavigationBar";
import TopicCard from "./TopicCard";
import {topicsData} from "../Commons/Utils/data";
import {getUserInfo} from "../Commons/Utils/apiHelper";
import {isAuthenticated} from "../Commons/Utils/authHelper";

const Topics = () => {
  const [score, setScore] = useState(null);
  const {user} = isAuthenticated();

  useEffect(() => {
    getUserInfo({name: user.name}).then((data) => {
      setScore(data.toString());
    });
  }, []);

  return (
    <>
      <NavigationBar />

      <div className="container  mt-5">
        <span className="greet-msg">
          Welcome {user.name} <br />
          <span className="score-msg ">
            Your total score:{"  "}
            <span className="pl-1">
              {score ? score : <i class="fas fa-circle-notch fa-spin"></i>}{" "}
            </span>
          </span>
        </span>
        <div className="row mt-5">
          {topicsData.map((data, index) => (
            <div
              key={index}
              className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4"
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
