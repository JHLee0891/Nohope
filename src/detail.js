import { getIdFromUrl } from "./common.js";
import { fetchMovieData, setMovieDetail } from "./movie/movie.js";
import { getReviewData } from "./review/review.js";

const details = await fetchMovieData(
  `https://api.themoviedb.org/3/movie/${getIdFromUrl()}?language=en-US`
);

const getLoadData = async () => {
  await setMovieDetail(details);
  await getReviewData();
}

document.getElementById("movie-logo").addEventListener("click", () => {
  window.location.href = `index.html`;
});


getLoadData();

