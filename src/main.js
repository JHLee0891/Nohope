import { fetchMovieData } from "./movie/movie.js";
import { addSearchEvent } from "./search/search.js";
import { addSortEvent } from "./sort/sort.js";
import { getLangFromUrl } from "./common.js";
import { addLangEvent } from "./setLang/setLang.js";
import { getRankingData } from "./movie/ranking.js";

let totalPage;
let nextPage;
let prevPage;

const renderPagination = (pageNumber, nextPage, prevPage, totalPage) => {
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


const getLoadData = async (pageNumber = 1) => {
  const page = new URLSearchParams(location.search).get("page");
  if(page !== null){
    pageNumber = page;
  }
  const lang = getLangFromUrl();

  //Top Rated API
  const fetchDatas = await fetchMovieData(
    `https://api.themoviedb.org/3/movie/top_rated?language=${lang}&page=${pageNumber}`
  );
  totalPage = fetchDatas["total_pages"];
  const movieDatas = fetchDatas["results"];

  renderPagination(pageNumber);

  addLangEvent();
  addSearchEvent(movieDatas);
  addSortEvent(movieDatas);
}

const updatePaginationVisibility = (elementId, visibility) => {
  document.getElementById(elementId).style.visibility = visibility;
};

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

document.getElementById("movie-logo").addEventListener("click", () => {
  window.location.href = `index.html`;
});

getLoadData();
getRankingData();
