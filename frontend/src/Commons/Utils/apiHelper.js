export const loadQuiz = async (id) => {
  return await fetch(
    `https://opentdb.com/api.php?amount=20&category=${id}&type=multiple`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      }
      return data;
    });
};
