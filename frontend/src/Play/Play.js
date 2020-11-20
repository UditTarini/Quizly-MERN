import React, {useEffect, useState} from "react";
import "./Play.css";
import NavigationBar from "../Commons/NavigationBar";
import {isAuthenticated} from "../Commons/Utils/authHelper";
import {saveScore} from "../Commons/Utils/apiHelper";
import Modal from "./Modal";

const Play = (props) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isClicked, setIsClicked] = useState("");
  const [score, setScore] = useState(0);
  const [totScore, setTotScore] = useState(0);
  const [qNumber, setqnumber] = useState(0);
  const [timer, setTimer] = useState(20);
  const [isRunning, setIsRunning] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const [wrong, setWrong] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [closed, setClosed] = useState(false);
  const [showModal, setShowModal] = useState(true);

  var timerId;
  const {user} = isAuthenticated();

  useEffect(() => {
    setData(props.location.state.quizData);
    _setOptions(props.location.state.quizData);
  }, []);

  useEffect(() => {
    console.log(false);
    if (closed) {
      if (timer != 0 && isRunning) {
        timerId = setTimeout(() => setTimer(timer - 1), 1000);
      }
      if (timer === 0 && isRunning) {
        setqnumber(qNumber + 1);
        setTimer(20);
      }
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [timer, closed]);

  useEffect(() => {
    if (qNumber === 15) {
      saveScore({name: user.name, score: score}).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setTotScore(data);
          setTimer(0);
          setIsRunning(false);
          setIsOver(true);
        }
      });
    }
  }, [qNumber]);

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
    setIsClicked(true);

    e.preventDefault();
    if (option == correctAns) {
      setScore(score + 5);
      setCorrect(correct + 1);

      e.currentTarget.className = "play-option correct disable mt-4";
      delayNextQ();
    } else {
      setScore(score - 2);
      setWrong(wrong + 1);

      e.currentTarget.className = "play-option wrong disable mt-4";
      delayNextQ();
    }
  };

  const delayNextQ = () => {
    setTimeout(() => {
      setqnumber(qNumber + 1);
      setIsClicked(qNumber === 14 ? true : false);
      setTimer(20);
    }, 1500);
  };

  const quizBoard = (index, item) => {
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

  const skipQuestion = () => {
    setqnumber(qNumber + 1);
    setTimer(20);
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
            : "Excellent"}
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
            <p>{score}</p>
            <p>{totScore}</p>
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
                <Modal
                  show={showModal}
                  close={() => {
                    setShowModal(false);
                    setClosed(true);
                  }}
                />
                <span>
                  Q {qNumber === 15 ? qNumber : qNumber + 1}
                  <span>/15 </span>
                </span>
                Score: {score}
                <div className="play-timer">
                  <i class="fa fa-clock-o mr-2"></i>
                  {timer}
                </div>
              </div>
              {data.map((item, index) => {
                quizBoardList.push(quizBoard(index, item));
              })}
              {quizBoardList[qNumber > 14 ? 14 : qNumber]}
              <button className="btn-skip" onClick={skipQuestion}>
                Skip
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Play;
