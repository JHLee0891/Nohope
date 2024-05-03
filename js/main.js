import { getCOFIXdata, getTMDBData, setCards, setRankings } from "./movie.js";

let rankingDatas = [];
let movieDatas;
let totalPage;
let nextPage;
let prevPage;
let historyPage;
let sortType = false;

let params = new URLSearchParams(location.search);

async function getLoadData(pageNumber = 1, info = "en-US") {
  let page = params.get("page");
  if (page !== null) {
    pageNumber = page;
  }

  let language = params.get("language");
  if (language !== null) {
    info = language;
  }

  //Top Rated API
  movieDatas = await getTMDBData(
    `https://api.themoviedb.org/3/movie/top_rated?language=${info}&page=${pageNumber}`
  );
  totalPage = movieDatas["total_pages"];
  movieDatas = movieDatas["results"];

  renderPagination(pageNumber);

  let sortType = params.get("sortType");
  if (sortType === null) {
    sortType = "vote";
  }

  sort(sortType);
}

async function getRankingData() {
  //영화진흥 위원회 박스 오피스
  rankingDatas = await getCOFIXdata(getDateWeekBefore());
  rankingDatas = rankingDatas["boxOfficeResult"]["weeklyBoxOfficeList"];

  setRankings(rankingDatas);
}

const searchMovie = (e) => {
  if (e.type === "click" || (e.type === "keypress" && e.key === "Enter")) {
    const searchInputValue = document.getElementById("search-input").value;

    setCards(
      movieDatas.filter((movie) => {
        const movieTitle = movie["title"].toLowerCase();
        return movieTitle.includes(searchInputValue.toLowerCase());
      })
    );
  }
};

// 정렬방식
const sort = function (sortType) {
  switch (sortType) {
    case "name":
      nameSort();
      break;
    case "vote":
      voteSort();
      break;
    default:
      alert("올바르지 않은 정렬방식을 대입했습니다.");
  }
};

//이름정렬
const nameSort = function () {
  movieDatas.sort((a, b) => {
    if (a["title"] < b["title"]) return -1;
    if (a["title"] > b["title"]) return 1;
    if (a["title"] === b["title"]) return 0;
  });
  sortType = true;
  let language = currentLanguage();
  setCards(movieDatas, language);
};

//평점 정렬
const voteSort = function () {
  movieDatas.sort((a, b) => {
    if (a["vote_average"] < b["vote_average"]) return 1;
    if (a["vote_average"] > b["vote_average"]) return -1;
    if (a["vote_average"] === b["vote_average"]) return 0;
  });
  sortType = false;
  let language = currentLanguage();
  setCards(movieDatas, language);
};

//정렬 방식을 주소에 대입
const initSortType = function (type) {
  params.set("sortType", type);
  window.location.search = params;
};

function currentLanguage() {
  let language = params.get("language");
  if (language !== null) {
    return language;
  } else {
    return "en-US";
  }
}

//한국어 설정
let set_Language = (language) => {
  let info;
  switch (language) {
    case "ko-KR":
      info = "ko-KR";
      break;
    case "en-US":
      info = "en-US";
      break;
    default:
      alert("지정하지 않은 언어가 들어왔습니다.");
      info = "en-US";
  }
  params.set("language", info);
  window.location.search = params;
};

const renderPagination = (pageNumber) => {
  const pageCount = 10;
  const pageGroup = Math.ceil(pageNumber / pageCount);
  let lastPageNumber = pageGroup * pageCount;

  if (lastPageNumber > totalPage) {
    lastPageNumber = totalPage;
  }

  let firstPageNumber = lastPageNumber - (pageCount - 1);

  nextPage = lastPageNumber + 1;
  prevPage = firstPageNumber - 1;

  updatePaginationVisibility("btn-prev", prevPage === 0 ? "hidden" : "visible");
  updatePaginationVisibility(
    "btn-next",
    nextPage > totalPage ? "hidden" : "visible"
  );

  const paginationList = document.getElementById("pagination-buttons");
  paginationList.innerHTML = "";
  for (let i = firstPageNumber; i <= lastPageNumber; i++) {
    const pageHTML = document.createElement("div");
    pageHTML.innerHTML = `<button class="page-number-btn" id="page-${i}">${i}</button>`;
    pageHTML.addEventListener("click", (e) => {
      params.set("page", i);
      window.location.search = params;
    });
    paginationList.appendChild(pageHTML);
  }
};

const pageGroupChange = (e) => {
  let page = params.get("page");
  let pageNumber = 1;
  if (page !== null) {
    pageNumber = page;
  } else pageNumber = 1;

  const pageCount = 10;
  const pageGroup = Math.ceil(pageNumber / pageCount);
  let lastPageNumber = pageGroup * pageCount;
  // 만약 뒷,앞페이지 버튼을 누르면 localStorage의 page값 변경 해주기
  if (e.target.id === "btn-next") {
    params.set("page", lastPageNumber + 1);
    window.location.search = params;
  } else {
    params.set("page", lastPageNumber - 19);
    window.location.search = params;
  }

  // 페이지의 영화정보 출력하기
  getLoadData(e.target.id === "btn-next" ? nextPage : prevPage);

  // 홈페이지를 최상단으로 올려주기
  window.scrollTo(0, 0);
};

const updatePaginationVisibility = (elementId, visibility) => {
  document.getElementById(elementId).style.visibility = visibility;
};

const getDateWeekBefore = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month1 = date.getMonth();
  const day1 = date.getDate();

  const dateData = new Date(year, month1, day1 - 7).toLocaleDateString();
  const result = dateData.split(". ");
  result[2] = result[2].slice(0, 2);
  const data =
    result[0] + ("0" + result[1]).slice(-2) + ("0" + result[2]).slice(-2);
  return data;
};

document.getElementById("search-button").addEventListener("click", searchMovie);

document.getElementById("namesort-button").addEventListener("click", () => {
  initSortType("name");
});

document.getElementById("votesort-button").addEventListener("click", () => {
  initSortType("vote");
});

document
  .getElementById("korean-language-button")
  .addEventListener("click", () => {
    set_Language("ko-KR");
  });
document
  .getElementById("english-language-button")
  .addEventListener("click", () => {
    set_Language("en-US");
  });

document
  .getElementById("search-input")
  .addEventListener("keypress", searchMovie);

document.querySelectorAll("#pagination-controls > span").forEach((elem) => {
  elem.addEventListener("click", pageGroupChange);
});

document.getElementById("movie-logo").addEventListener("click", () => {
  window.location.href = `index.html`;
});

window.onload = function () {
  document.getElementById("search-input").focus();
};

getLoadData();
getRankingData();
