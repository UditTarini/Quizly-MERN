import {base_route} from "../../backend";

export const loadQuiz = async (id) => {
  return await fetch(
    `https://opentdb.com/api.php?amount=15&category=${id}&type=multiple`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      }
      return data;
    });
};

export const saveScore = (value) => {
  return fetch(
    // url
    `${base_route}/score/save`,
    {
      // data for url
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log("ERR", err));
};

export const loadLeaderboard = () => {
  return fetch(`${base_route}/leaderboard`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log(error));
};
