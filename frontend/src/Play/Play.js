import React, {useEffect, useState} from "react";
import "./Play.css";
import NavigationBar from "../Commons/NavigationBar";

const Play = (props) => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isClicked, setIsClicked] = useState("");
  const [score, setScore] = useState(0);
  const [qNumber, setqnumber] = useState(1);
  const [timer, setTimer] = useState(20);

  var timerId;

  useEffect(() => {
    setData(props.location.state.quizData);
    _setOptions(props.location.state.quizData);
  }, []);

  useEffect(() => {
    if (timer != 0) {
      timerId = setTimeout(() => setTimer(timer - 1), 1000);
    }
    if (timer === 0) {
      setqnumber(qNumber + 1);
      setTimer(20);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [timer]);

  const stopTimer = (id) => {
    return () => clearTimeout(id);
  };

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
    e.preventDefault();

    if (option === correctAns) {
      setIsClicked(true);
      setScore(score + 5);
      e.currentTarget.className = "play-option correct disable mt-4";
      delayNextQ();
    } else {
      setIsClicked(true);
      setScore(score - 2);
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

  var quizBoardList = [];

  return (
    <>
      <NavigationBar />

      <div className="container">
        <div className="col-md-10 col-11 mx-auto play-area">
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
        </div>
      </div>
    </>
  );
};

export default Play;
