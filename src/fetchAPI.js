import { addSearchEvent } from "./search/search.js";
import { addSortEvent } from "./sort/sort.js";
import { addLangEvent } from "./setLang/setLang.js";
import { renderPagination } from "./pagination/pagination.js";
import { getLangFromUrl, getParamFromUrl } from "./common.js";

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
  const lang = getLangFromUrl();

  const fetchDatas = await fetchMovieData(
    searchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=${lang}&page=${pageNumber}`
      : `https://api.themoviedb.org/3/movie/top_rated?language=${lang}&page=${pageNumber}`
  );

  const movieDatas = fetchDatas["results"];

  renderPagination(pageNumber, fetchDatas["total_pages"]);
  addLangEvent();
  addSearchEvent();
  addSortEvent(movieDatas);
};
