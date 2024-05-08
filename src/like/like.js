import { setParamToUrl } from "../common.js";

export const addlikesEvent = () =>{
    const setLikeParam = (check) => {
        setParamToUrl("likes", check);
    }
    document.getElementById("likes-button").addEventListener("click", ()=> {setLikeParam(true)});
};

export const getLSData = () => {
    const data = JSON.parse(localStorage.getItem("favorite"));
        const movieDatas = [];
        data.forEach(element => {
            const movieData = {};
            movieData["id"] = element["id"];
            movieData["poster_path"] = element["data"][0];
            movieData["title"] = element["data"][1];
            movieData["overview"] = element["data"][2];
            movieData["vote_average"] = element["data"][3];
            movieDatas.push(movieData);
        });
        
        return movieDatas;
}

// setParamToUrl에 기본적으로 likes를 false로 만드는 코드 추가