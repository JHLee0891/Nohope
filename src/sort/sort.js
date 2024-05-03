import { setCards } from "../movie/movie.js";

export const addSortEvent = (sortType, movieDatas) => {
  //이름정렬
  const nameSort = function () {
    movieDatas.sort((a, b) => {
      if (a["title"] < b["title"]) return -1;
      if (a["title"] > b["title"]) return 1;
      if (a["title"] === b["title"]) return 0;
    });
    sortType = true;
    setCards(movieDatas);
  };

  //평점 정렬
  const voteSort = function () {
    movieDatas.sort((a, b) => {
      if (a["vote_average"] < b["vote_average"]) return 1;
      if (a["vote_average"] > b["vote_average"]) return -1;
      if (a["vote_average"] === b["vote_average"]) return 0;
    });

    sortType = false;
    setCards(movieDatas);
  };

  document.getElementById("namesort-button").addEventListener("click", nameSort);
  document.getElementById("votesort-button").addEventListener("click", voteSort);

  if (sortType) nameSort();
  else voteSort();
};
