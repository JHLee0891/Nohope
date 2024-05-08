import { getParamFromUrl,getLangFromUrl } from "./common.js";
import { fetchMovieData } from "./fetchAPI.js";
import { setMovieDetail } from "./movie/movie.js";
import { getReviewData } from "./review/review.js";
import { LSMovieData } from "./movie/LSMovieData.js";

const details = await fetchMovieData(
  `https://api.themoviedb.org/3/movie/${getParamFromUrl("id")}?language=${getLangFromUrl()}`
);

const getLoadData = async () => {
  const recents = new LSMovieData('recents');
  recents.insertData(Number(getParamFromUrl("id")),details["poster_path"]);
  await setMovieDetail(details);
  await getReviewData();
  recents.getRecentData();
}

document.getElementById("movie-logo").addEventListener("click", () => {
  window.location.href = `index.html`;
});


getLoadData();

