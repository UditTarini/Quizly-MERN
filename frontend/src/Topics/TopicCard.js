import React from "react";
import Play from "../Play";
import "./Topics.css";

const TopicCard = ({icon, name, id}) => {
  const play = (id) => {
    alert(id);
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
