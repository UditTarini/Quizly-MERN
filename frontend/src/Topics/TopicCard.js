import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {loadQuiz} from "../Commons/Utils/apiHelper";
import Play from "../Play";
import {useHistory} from "react-router-dom";

import "./Topics.css";

const TopicCard = ({icon, name, id}) => {
  var history = useHistory();
  const play = (id) => {
    loadQuiz(id).then((data) =>
      history.push("/play", {
        quizData: data.results,
      })
    );
  };

  return (
    <>
      <div onClick={() => play(id)} className="card card-body mb-4 text-center">
        <i className={`fa ${icon} topic-icon my-5`} aria-hidden="true"></i>
        <h5 className="topic-name mt-3">{name}</h5>
      </div>
    </>
  );
};

export default TopicCard;
