import { getLangFromUrl, getParamFromUrl, setParamToUrl } from "../common.js";
import { setCards } from "./movie.js";

// LocalStorage 에 저장할 MovieData를 정형화
export class LSMovieData {
  constructor(itemType) {
    this._itemType = itemType;
    const value = new Array();
    const localData = JSON.parse(localStorage.getItem(itemType));
    if (localData !== null) {
      this._movieData = value.concat(localData);
    } else {
      this._movieData = value;
    }
  }

  initLocalStorage = () => {
    localStorage.setItem(this._itemType, JSON.stringify(this._movieData));
  };

  deleteData = (deleteValue) => {
    const deleteIndex = this._movieData.findIndex((element) => {
      return element.id === deleteValue.id;
    });
    this._movieData.splice(deleteIndex, 1);
    this.initLocalStorage();
  };

  insertData = (id, ...data) => {
    const datas = {
      id: id,
      data: data,
    };
    if (!this._movieData.find((element) => element.id === id)) {
      if (this._movieData.length >= 5 && this._itemType === "recents") {
        this._movieData.shift();
      }
      this._movieData.push(datas);
    } else {
      this.deleteData(datas);
      this._movieData.push(datas);
    }
    this.initLocalStorage();
  };

  //
  getRecentData = () => {
    const data = JSON.parse(localStorage.getItem("recents"));

    const recentlist = document.querySelector("#recent-list");

    for (let i = 0; i < data.length; i++) {
      const recentImg = `
            <img id="recent-movie-img${i}" class="recent-movie-img" src="https://image.tmdb.org/t/p/w342//${data[i]["data"][0]}" alt="">
            `;
      recentlist.insertAdjacentHTML("afterbegin", recentImg);
      const clickImg = document.querySelector(`#recent-movie-img${i}`);
      clickImg.addEventListener("click", () => {
        window.location.href = `detail.html?id=${
          data[i]["id"]
        }&language=${getLangFromUrl()}`;
      });
    }
  };

  getFavoriteData = () => {
    const data = new Array();
    const localData = JSON.parse(localStorage.getItem("favorite"));
    if (localData !== null) data.push(...localData);

    for (const item of data) {
      if (item["id"] === Number(getParamFromUrl("id"))) {
        return true;
      }
    }
    return false;
  };
}
