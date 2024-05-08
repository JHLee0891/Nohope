import { getLoadData } from "../fetchAPI.js";
import { setParamToUrl,removeAllUrlParams } from "../common.js";

export const addSearchEvent = () => {
  const searchMovie = (e) => {
    if (e.type === "click" || (e.type === "keypress" && e.key === "Enter")) {
      const searchInputValue = document.getElementById("search-input").value;
      const searchQuery = searchInputValue.trim();

      removeAllUrlParams();
      setParamToUrl("search", searchQuery);
      getLoadData();
    }
  };

  document.getElementById("search-input").addEventListener("keypress", searchMovie);
  document.getElementById("search-button").addEventListener("click", searchMovie);
};
