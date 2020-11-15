import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {loadQuiz} from "../Commons/Utils/apiHelper";
import Play from "../Play";
import {useHistory} from "react-router-dom";

import "./Topics.css";

const TopicCard = ({icon, name, id}) => {
  const [isLoading, setisLoading] = useState(false);

  var history = useHistory();

  const play = (id) => {
    setisLoading(true);
    loadQuiz(id).then((data) => {
      history.push("/play", {
        quizData: data.results,
      });
      setisLoading(false);
    });
  };
  return (
    <>
      <div onClick={() => play(id)} className="card card-body mb-4 text-center">
        <i
          className={`fa ${
            isLoading ? "fa-spinner fa-spin" : icon
          } topic-icon my-5`}
          aria-hidden="true"
        ></i>
        <h5 className="topic-name mt-3">{name}</h5>
      </div>
    </>
  );
};

export default TopicCard;
