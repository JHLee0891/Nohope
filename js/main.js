import { getTMDBData, setCards } from "./movie.js";

let movieDatas;
let totalPage;
let nextPage;
let prevPage;
let historyPage;
let sortType = false;

async function getLoadData(pageNumber = 1) {

  let page = new URLSearchParams(location.search).get("page");
  if(page !== null){
    pageNumber = page;
  }

  //Top Rated API
  movieDatas = await getTMDBData(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}`
  );
  totalPage = movieDatas["total_pages"];
  movieDatas = movieDatas["results"];


  renderPagination(pageNumber);

  if (sortType === false) voteSort();
  else nameSort();
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
      window.location.href = `index.html?page=${i}`;
      getLoadData(e.target.textContent);
    });
    paginationList.appendChild(pageHTML);
  }
};

const pageUnload = () => {
  localStorage.setItem("page",1);
}

const updatePaginationVisibility = (elementId, visibility) => {
  document.getElementById(elementId).style.visibility = visibility;
};

document.getElementById("search-button").addEventListener("click", searchMovie);
document.getElementById("namesort-button").addEventListener("click", nameSort);
document.getElementById("votesort-button").addEventListener("click", voteSort);
document
  .getElementById("search-input")
  .addEventListener("keypress", searchMovie);
document.querySelectorAll("#pagination-controls > span").forEach((elem) => {
  elem.addEventListener("click", (e) => {

    // 만약 뒷,앞페이지 버튼을 누르면 localStorage의 page값 변경 해주기
    if(e.target.id === "btn-next")
    {localStorage.setItem("page",nextPage)}
    else
    {localStorage.setItem("page",prevPage);}

    // 페이지의 영화정보 출력하기
    getLoadData(e.target.id === "btn-next" ? nextPage : prevPage);

    // 홈페이지를 최상단으로 올려주기
    window.scrollTo(0,0);
  });
});

window.onload = function () {
  document.getElementById("search-input").focus();
};

getLoadData();
