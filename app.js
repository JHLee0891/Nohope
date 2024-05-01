class Movie {
  constructor(id, title, overview, poster_path, vote_average) {
    this._id = id;
    this._title = title;
    this._overview = overview;
    this._poster_path = poster_path;
    this._vote_average = vote_average;
  }

  getCardHTML = () => {
    return `
        <div class="card mb-3" style="max-width: 600px;">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${this._poster_path}" class="img-fluid rounded-start" alt="${this._title}">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title jersey-25-regular">${this._title}</h5>
                        <p class="card-text jersey-25-regular-thin">${this._overview}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${this._vote_average}</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
  };

  getClickEvent = () => {
    window.location.href = `detail.html?id=${this._id}`;
  };
}

async function getTMDBData(url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzhkYWIyMDlkN2FiNjQ2MjBkNWY3NjM0YTk2Y2Y4ZSIsInN1YiI6IjY2MmEyY2FlMWQ3OGYyMDExZTJmZWZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_228f-CVuuIOTCRJnkPvqxS1a_1vM1ikZ_tHzTXTM4",
    },
  };

  let response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("HTTP status " + response.status);
  }

  return response.json();
}

let movieDatas;
let baseUrl;
let totalPage;
let nextPage;
let prevPage;

async function getLoadData(pageNumber = 1) {
  //configuration details API
  const detailsData = await getTMDBData(
    "https://api.themoviedb.org/3/configuration"
  );
  baseUrl = `${detailsData["images"]["base_url"]}/w342/`;

  //Top Rated API
  movieDatas = await getTMDBData(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}`
  );
  totalPage = movieDatas["total_pages"];
  movieDatas = movieDatas["results"];

  renderPagination(pageNumber);
  setCards(baseUrl, movieDatas);
}

const setCards = (baseUrl, movieDatas) => {
  const cardWrappers = document.getElementById("content-wrap");
  cardWrappers.innerHTML = "";

  movieDatas.forEach((elem) => {
    const movie = new Movie(
      elem.id,
      elem.title,
      elem.overview,
      baseUrl + elem.poster_path,
      elem.vote_average
    );

    const cardHTML = document.createElement("div");

    cardHTML.innerHTML = movie.getCardHTML();
    cardHTML.classList.add("card-wrap");

    cardHTML.addEventListener("click", () => {
      movie.getClickEvent();
    });

    cardWrappers.appendChild(cardHTML);
  });
};

const searchMovie = (e) => {
  if (e.type === "click" || (e.type === "keypress" && e.key === "Enter")) {
    const searchInputValue = document.getElementById("search-input").value;

    setCards(
      baseUrl,
      movieDatas.filter((movie) => {
        const movieTitle = movie["title"].toLowerCase();
        return movieTitle.includes(searchInputValue.toLowerCase());
      })
    );
  }
};

const renderPagination = (pageNumber) => {
  const pageCount = 10;
  const pageGroup = Math.ceil(pageNumber / pageCount);
  let lastPageNumber = pageGroup * pageCount;

  if (lastPageNumber > totalPage) {
    lastPageNumber = totalPage;
  }

  let firstPageNumber = lastPageNumber - (pageCount - 1);

  nextPage = lastPageNumber + 1;
  prevPage = firstPageNumber - 1;

  updatePaginationVisibility("btn-prev", prevPage === 0 ? "hidden" : "visible");
  updatePaginationVisibility(
    "btn-next",
    nextPage > totalPage ? "hidden" : "visible"
  );

  const paginationList = document.getElementById("pagination-buttons");
  paginationList.innerHTML = "";
  for (let i = firstPageNumber; i <= lastPageNumber; i++) {
    const pageHTML = document.createElement("div");
    pageHTML.innerHTML = `<button class="page-number-btn" id="page-${i}">${i}</button>`;
    pageHTML.addEventListener("click", (e) => {
      getLoadData(e.target.textContent);
    });
    paginationList.appendChild(pageHTML);
  }
};

const updatePaginationVisibility = (elementId, visibility) => {
  document.getElementById(elementId).style.visibility = visibility;
};

document.getElementById("search-button").addEventListener("click", searchMovie);
document
  .getElementById("search-input")
  .addEventListener("keypress", searchMovie);
document.querySelectorAll("#pagination-controls > span").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    getLoadData(e.target.id === "btn-next" ? nextPage : prevPage);
  });
});

window.onload = function () {
  document.getElementById("search-input").focus();
};

getLoadData();
