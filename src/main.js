import { fetchMovieData } from "./movie/movie.js";
import { addSearchEvent } from "./search/search.js";
import { addSortEvent } from "./sort/sort.js";

let totalPage;
let nextPage;
let prevPage;

const updatePaginationVisibility = (elementId, visibility) => {
  document.getElementById(elementId).style.visibility = visibility;
};

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
      getLoadData(e.target.textContent);
    });
    paginationList.appendChild(pageHTML);
  }
};

const getLoadData = async (pageNumber = 1) => {
  //Top Rated API
  let movieDatas = await fetchMovieData(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}`
  );
  totalPage = movieDatas["total_pages"];
  movieDatas = movieDatas["results"];

  renderPagination(pageNumber);

  addSearchEvent(movieDatas);
  addSortEvent(false, movieDatas);
};

document.querySelectorAll("#pagination-controls > span").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    getLoadData(e.target.id === "btn-next" ? nextPage : prevPage);
  });
});

window.onload = function () {
  document.getElementById("search-input").focus();
};

getLoadData();
