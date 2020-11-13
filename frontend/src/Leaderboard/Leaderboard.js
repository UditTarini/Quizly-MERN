import React from "react";
import "./Leaderboard.css";
import NavigationBar from "../Commons/NavigationBar";

const Leaderboard = () => {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="col-md-10 mx-auto ">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Username</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Udit</td>
                <td>125</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Hari Tomat</td>
                <td>785</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Hari Tomat</td>
                <td>785</td>
              </tr>{" "}
              <tr>
                <th scope="row">2</th>
                <td>Hari Tomat</td>
                <td>785</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
