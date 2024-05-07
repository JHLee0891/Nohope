import { setCards } from "../movie/movie.js";
import { setParamToUrl, getSortTypeFromUrl } from "../common.js";

export const addSortEvent = (movieDatas) => {
  //이름정렬
  const nameSort = function () {
    movieDatas.sort((a, b) => {
      if (a["title"] < b["title"]) return -1;
      if (a["title"] > b["title"]) return 1;
      if (a["title"] === b["title"]) return 0;
    });
    setCards(movieDatas);
  };

  //평점 정렬
  const voteSort = function () {
    movieDatas.sort((a, b) => {
      if (a["vote_average"] < b["vote_average"]) return 1;
      if (a["vote_average"] > b["vote_average"]) return -1;
      if (a["vote_average"] === b["vote_average"]) return 0;
    });
    setCards(movieDatas);
  };

  // Url Param의 SortType의 value값에 따른 정렬 (switch문 사용)
  const sortFromSortType = function () {
    const sortType = getSortTypeFromUrl();
    switch (sortType) {
      case "name":
        nameSort();
        break;
      case "vote":
        voteSort();
        break;
      default:
        voteSort();
        alert("올바르지 않은 정렬 방식을 대입했습니다. From sort.js");
    }
  }

  // Url Param의 SortType을 지정하는 구문
  const setSortType = (sortType) => {
    setParamToUrl("sortType",sortType);
  }

  document.getElementById("namesort-button").addEventListener("click", ()=>{setSortType("name")});
  document.getElementById("votesort-button").addEventListener("click", ()=>{setSortType("vote")});

  sortFromSortType();
};
