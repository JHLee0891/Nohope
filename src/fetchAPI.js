import { addSearchEvent } from "./search/search.js";
import { addSortEvent } from "./sort/sort.js";
import { addLangEvent } from "./setLang/setLang.js";
import { renderPagination } from "./pagination/pagination.js";
import { getLangFromUrl, getParamFromUrl } from "./common.js";
import { addlikesEvent, getLSData } from "./like/like.js";

export const fetchMovieData = async (url) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzhkYWIyMDlkN2FiNjQ2MjBkNWY3NjM0YTk2Y2Y4ZSIsInN1YiI6IjY2MmEyY2FlMWQ3OGYyMDExZTJmZWZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_228f-CVuuIOTCRJnkPvqxS1a_1vM1ikZ_tHzTXTM4",
      },
    };
  
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
  
    return response.json();
  };

export const getLoadData = async (pageNumber = 1) => {
  const page = getParamFromUrl("page");
  if (page !== null) pageNumber = page;

  const searchQuery = getParamFromUrl("search");
  const likeParam = getParamFromUrl("likes");
  const lang = getLangFromUrl();
  if(likeParam === "true"){
      const movieDatas = getLSData();
      addSearchEvent();
      addSortEvent(movieDatas);
      displayNoneBlock(true);
      return;
  } else {
    displayNoneBlock(false);
  }
  const fetchDatas = await fetchMovieData(
      searchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=${lang}&page=${pageNumber}`
      : `https://api.themoviedb.org/3/movie/top_rated?language=${lang}&page=${pageNumber}`
    );
    
    const movieDatas = fetchDatas["results"];

  renderPagination(pageNumber, fetchDatas["total_pages"]);
  addLangEvent();
  addSearchEvent();
  addlikesEvent();
  addSortEvent(movieDatas);
};
const displayNoneBlock = (check) => {
    const paginationDisplay = document.getElementById("pagination-controls");
    const namesortDisplay = document.getElementById("namesort-button");
    const votesortDisplay = document.getElementById("votesort-button");
    const langDropdownDisplay = document.getElementById("lang-dropdown");
    if(check === true){
        paginationDisplay.style.display = 'none';
        namesortDisplay.style.display = 'none';
        votesortDisplay.style.display = 'none';
        langDropdownDisplay.style.display = 'none';
    } else {
        paginationDisplay.style.display = 'flex';
        namesortDisplay.style.display = 'block';
        votesortDisplay.style.display = 'block';
        langDropdownDisplay.style.display = 'block';
    }
}