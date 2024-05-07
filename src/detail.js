import { getIdFromUrl,getLangFromUrl } from "./common.js";
import { fetchMovieData, setMovieDetail } from "./movie/movie.js";
import { getReviewData } from "./review/review.js";
import { LSMovieData } from "./movie/LSMovieData.js";

const details = await fetchMovieData(
  `https://api.themoviedb.org/3/movie/${getIdFromUrl()}?language=${getLangFromUrl()}`
);

const getLoadData = async () => {
  const recents = new LSMovieData('recents');
  recents.insertData(Number(getIdFromUrl()),details["poster_path"]);
  await setMovieDetail(details);
  await getReviewData();
}

document.getElementById("movie-logo").addEventListener("click", () => {
  window.location.href = `index.html`;
});


getLoadData();

