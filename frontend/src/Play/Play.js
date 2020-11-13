import React from "react";
import "./Play.css";
import NavigationBar from "../Commons/NavigationBar";

const Play = () => {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="col-md-10 col-11 mx-auto play-area">
          <div className="play-top pl-3">
            <span>
              Q 1<span>/20 </span>
            </span>
            Score: 50
            <div className="play-timer">
              <i class="fa fa-clock-o mr-2"></i>
              20
            </div>
          </div>
          <p className="play-question m-4">
            Which of the following is a correct format for declaration of
            function?
          </p>
          <div className="m-4">
            <div className="play-option  mt-4">
              {"return-type function-name(argument type);"}
            </div>
            <div className="play-option   mt-4">
              {"return-type function-name(argument type) {}"}
            </div>
            <div className="play-option  mt-4">
              {"return-type (argument type)function-name;"}
            </div>
            <div className="play-option  mt-4">{"Sports"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Play;
