import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./Topics.css";

const TopicCard = () => {
  return (
    <div className="card card-body  text-center">
      <i className="fa fa-linux topic-icon my-5" aria-hidden="true"></i>

      <h5 className="topic-name">Linux</h5>
      <p></p>
    </div>
  );
};

export default TopicCard;
