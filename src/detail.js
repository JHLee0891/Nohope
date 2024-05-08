import { getParamFromUrl,getLangFromUrl } from "./common.js";
import { fetchMovieData } from "./fetchAPI.js";
import { setMovieDetail } from "./movie/movie.js";
import { getReviewData } from "./review/review.js";
import { LSMovieData } from "./movie/LSMovieData.js";

const details = await fetchMovieData(
  `https://api.themoviedb.org/3/movie/${getParamFromUrl("id")}?language=${getLangFromUrl()}`
);
console.log(details);

const getLoadData = async () => {
  const recents = new LSMovieData('recents');
  const favorite = new LSMovieData('favorite');
  
  recents.insertData(Number(getParamFromUrl("id")),details["poster_path"]);
  await setMovieDetail(details);
  await getReviewData();
  recents.getRecentData();
  favorite.getFavoriteData();
}

document.getElementById("movie-logo").addEventListener("click", () => {
  window.location.href = `index.html`;
});



getLoadData();

const insertFavorite = () => {
    const favorite = new LSMovieData('favorite');
    favorite.insertData(Number(getParamFromUrl("id")), details["poster_path"], details["title"], details["overview"], details["vote_average"]);
    favorite.getFavoriteData();
};

const clickFavorite = document.querySelector('#favorite-logo');
clickFavorite.addEventListener('click', insertFavorite);