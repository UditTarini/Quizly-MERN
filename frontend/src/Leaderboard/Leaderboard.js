import React, {useEffect, useState} from "react";
import "./Leaderboard.css";
import NavigationBar from "../Commons/NavigationBar";
import {loadLeaderboard} from "../Commons/Utils/apiHelper";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadLeaderboard().then((data) => {
      setData(data);
    });
  }, []);

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
              {console.log(data)}
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.totalscore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
