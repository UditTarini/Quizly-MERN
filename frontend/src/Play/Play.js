import React, {useEffect, useState} from "react";
import "./Play.css";
import NavigationBar from "../Commons/NavigationBar";

const Play = (props) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [ansStatus, setAnsStatus] = useState("");
  const [score, setScore] = useState(0);
  const [qNumber, setqnumber] = useState(1);
  const [time, setTime] = useState(20);

  useEffect(() => {
    setData(props.location.state.quizData);

    _setOptions(props.location.state.quizData);
  }, []);

  const _setOptions = (data) => {
    data.map((item) => {
      var suffledOptions = [];

      suffledOptions = options.concat(item.incorrect_answers);
      suffledOptions.push(item.correct_answer);

      shuffle(suffledOptions);
      setOptions((options) => [...options, suffledOptions]);
      // data.options = options;
      // setData(data);
    });
  };
  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const optionView = (index, option, correctAns) => {
    return (
      <li
        onClick={() => handleOptionClick(option, correctAns)}
        key={index}
        className={`play-option ${ansStatus} mt-4`}
      >
        {option}
      </li>
    );
  };

  const handleOptionClick = (option, correctAns) => {
    if (option === correctAns) {
      setAnsStatus("correct");
      setScore(score + 5);

      delayNextQ();
    } else {
      setAnsStatus("wrong");
      setScore(score - 2);

      delayNextQ();
    }
  };

  const delayNextQ = () => {
    setTimeout(() => {
      setqnumber(qNumber + 1);
      setAnsStatus("");
    }, 1500);
  };

  const quizBorad = (index, item) => {
    return (
      <div className="play-board" key={index}>
        <p className="play-question m-4">{decodeHtml(item.question)}</p>
        <ul className=" m-4">
          {options[index].map((option, index) => {
            return optionView(index, option, item.correct_answer);
          })}
        </ul>
      </div>
    );
  };

  var quizBoardList = [];

  return (
    <>
      <NavigationBar />
      {console.log("option", data)}
      <div className="container">
        <div className="col-md-10 col-11 mx-auto play-area">
          <div className="play-top pl-3">
            <span>
              Q {qNumber}
              <span>/20 </span>
            </span>
            Score: {score}
            <div className="play-timer">
              <i class="fa fa-clock-o mr-2"></i>
              20
            </div>
          </div>

          {data.map((item, index) => {
            quizBoardList.push(quizBorad(index, item));
          })}
          {quizBoardList[qNumber - 1]}
        </div>
      </div>
    </>
  );
};

export default Play;
