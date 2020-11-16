import React, {useEffect, useState} from "react";
import "./Play.css";
import NavigationBar from "../Commons/NavigationBar";
import {isAuthenticated} from "../Commons/Utils/authHelper";

const Play = (props) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isClicked, setIsClicked] = useState("");
  const [score, setScore] = useState(0);
  const [qNumber, setqnumber] = useState(14);
  const [timer, setTimer] = useState(20);
  const [isRunning, setIsRunning] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const [wrong, setWrong] = useState(0);
  const [attempted, setAttempted] = useState(1);
  const [correct, setCorrect] = useState(0);

  var timerId;
  const {user} = isAuthenticated();

  useEffect(() => {
    setData(props.location.state.quizData);
    _setOptions(props.location.state.quizData);
  }, []);

  useEffect(() => {
    if (timer != 0 && isRunning) {
      timerId = setTimeout(() => setTimer(timer - 1), 1000);
    }
    if (timer === 0 && isRunning) {
      setqnumber(qNumber + 1);
      setTimer(20);
    }
    if (qNumber === 15) {
      setTimer(0);
      setIsRunning(false);
      setIsOver(true);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [timer]);

  const _setOptions = (data) => {
    data.map((item) => {
      var suffledOptions = [];
      suffledOptions = options.concat(item.incorrect_answers);
      suffledOptions.push(item.correct_answer);
      shuffle(suffledOptions);
      setOptions((options) => [...options, suffledOptions]);
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
        onClick={(e) => handleOptionClick(option, correctAns, e)}
        key={index}
        className={`play-option ${
          isClicked ? (option === correctAns ? "correct disable" : null) : null
        } mt-4`}
      >
        {decodeHtml(option)}
      </li>
    );
  };

  const handleOptionClick = (option, correctAns, e) => {
    setAttempted(attempted + 1);
    e.preventDefault();
    if (option === correctAns) {
      setIsClicked(true);
      setScore(score + 5);
      setCorrect(correct + 1);
      e.currentTarget.className = "play-option correct disable mt-4";
      delayNextQ();
    } else {
      setIsClicked(true);
      setScore(score - 2);
      setWrong(wrong + 1);
      e.currentTarget.className = "play-option wrong disable mt-4";
      delayNextQ();
    }
  };

  const delayNextQ = () => {
    setTimeout(() => {
      setqnumber(qNumber + 1);
      setIsClicked(false);
      setTimer(20);
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

  const gameSummary = () => {
    return (
      <div className="play-summary">
        <h4 className="play-top ">Quiz Over</h4>
        <p className="summary-msg">
          {score < 10 || score < 5
            ? score < 5
              ? "You tried your best"
              : "Welldone"
            : "Excellent"}{" "}
          <span> {user.name}</span>
        </p>

        <div className="row col-9 mx-auto mt-5">
          <div className="col-6 text-left">
            <p>Total Question</p>
            <p>Questions Attempted</p>
            <p>Correct Answers</p>
            <p>Wrong Answers</p>
            <hr />
            <p>Score</p>
            <p>Total Score</p>
          </div>

          <div className="col-6  text-center">
            <p>15</p>
            <p>{attempted}</p>
            <p>{correct}</p>
            <p>{wrong}</p>
            <hr />
            <p className="score">{score}</p>
            <p className="score">{score}</p>
          </div>
        </div>
      </div>
    );
  };

  var quizBoardList = [];

  return (
    <>
      <NavigationBar />

      <div className="container">
        <div className="col-md-10 col-11 mx-auto play-area">
          {isOver ? (
            gameSummary()
          ) : (
            <>
              <div className="play-top pl-3">
                <span>
                  Q {qNumber}
                  <span>/15 </span>
                </span>
                Score: {score}
                <div className="play-timer">
                  <i class="fa fa-clock-o mr-2"></i>
                  {timer}
                </div>
              </div>
              {data.map((item, index) => {
                quizBoardList.push(quizBorad(index, item));
              })}
              {quizBoardList[qNumber - 1]}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Play;
