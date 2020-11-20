import React, {createContext, useState} from "react";
import TopicCard from "../Topics/TopicCard";
import "./Play.css";

export const Context = createContext();

const Modal = ({show, close}) => {
  return (
    <div>
      <div
        className={`modal ${show ? "show" : null}`}
        style={{display: show ? "block" : null}}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row col-9 mx-auto mt-5">
                <div className="col-6 text-left">
                  <p>Total Questions</p>
                  <p>Correct</p>
                  <p>Wrong</p>
                </div>

                <div className="col-6  text-center">
                  <p>15</p>
                  <p>+5</p>
                  <p>-2</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-skip" onClick={close}>
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="backdrop" style={{display: show ? "block" : "none"}} />
    </div>
  );
};

export default Modal;
