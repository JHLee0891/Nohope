import { getTMDBData, setMovieDetail } from "./movie.js"

let movieId = new URLSearchParams(location.search).get("id")
let language = new URLSearchParams(location.search).get("language")
if(language === null){
    language = 'en-US';
}
const details = await getTMDBData(`https://api.themoviedb.org/3/movie/${movieId}?language=${language}`)
setMovieDetail(details);

document.getElementById("movie-logo").addEventListener("click", () => {
    window.location.href = `index.html`;
});