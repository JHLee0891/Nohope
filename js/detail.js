import { getTMDBData, setMovieDetail } from "./movie.js"

let movieId = new URLSearchParams(location.search).get("id")
const details = await getTMDBData(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
setMovieDetail(details);
