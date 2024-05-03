import { setCards } from "../movie/movie.js";

export const addSearchEvent = (movieDatas) => {
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

  document.getElementById("search-input").addEventListener("keypress", searchMovie);
  document.getElementById("search-button").addEventListener("click", searchMovie);
};
