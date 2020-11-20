import React, {useEffect, useState} from "react";
import "./Leaderboard.css";
import NavigationBar from "../Commons/NavigationBar";
import {loadLeaderboard} from "../Commons/Utils/apiHelper";
import {isAuthenticated} from "../Commons/Utils/authHelper";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const {user} = isAuthenticated();

  useEffect(() => {
    loadLeaderboard().then((data) => {
      setData(data);
      setisLoading(false);
    });
  }, []);

  const tableRow = () => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{`${index + 1} ${
            item.name == user.name ? ">>" : ""
          }`}</th>
          <td>{item.name}</td>
          <td>{item.totalscore}</td>
        </tr>
      );
    });
  };

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
              {isLoading ? (
                <i className="fas fa-spinner fa-pulse loader"></i>
              ) : (
                tableRow()
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
{
  /* <i class="fas fa-spinner fa-pulse"></i> */
}
export default Leaderboard;
