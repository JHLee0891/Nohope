import { getRankingData } from "./movie/ranking.js";
import { getLoadData } from "./fetchAPI.js";

window.onload = function () {
  document.getElementById("search-input").focus();
};

document.getElementById("movie-logo").addEventListener("click", () => {
  window.location.href = `index.html`;
});

getLoadData();
getRankingData();
