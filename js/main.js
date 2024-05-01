import { getTMDBData, setCards } from "./movie.js"

let movieDatas;
let totalPage;
let nextPage;
let prevPage;

async function getLoadData(pageNumber = 1) {
    //Top Rated API
    movieDatas = await getTMDBData(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}`)
    totalPage = movieDatas['total_pages'];
    movieDatas = movieDatas['results']

    renderPagination(pageNumber);
    setCards(movieDatas);
}

const searchMovie = (e) => {
    if (e.type === "click" || (e.type === "keypress" && e.key === "Enter")) {
        const searchInputValue = document.getElementById("search-input").value;

        setCards(movieDatas.filter((movie) => {
            const movieTitle = movie['title'].toLowerCase()
            return movieTitle.includes(searchInputValue.toLowerCase())
        }))
    }
}

const renderPagination = (pageNumber) => {
    const pageCount = 10
    const pageGroup = Math.ceil(pageNumber / pageCount);
    let lastPageNumber = pageGroup * pageCount

    if (lastPageNumber > totalPage) {
        lastPageNumber = totalPage
    }

    let firstPageNumber = lastPageNumber - (pageCount - 1)

    nextPage = lastPageNumber + 1
    prevPage = firstPageNumber - 1

    updatePaginationVisibility("btn-prev", prevPage === 0 ? "hidden" : "visible");
    updatePaginationVisibility("btn-next", nextPage > totalPage ? "hidden" : "visible");

    const paginationList = document.getElementById("pagination-buttons");
    paginationList.innerHTML = ""
    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
        const pageHTML = document.createElement('div')
        pageHTML.innerHTML = `<button class="page-number-btn" id="page-${i}">${i}</button>`
        pageHTML.addEventListener("click", (e) => {
            getLoadData(e.target.textContent)
        })
        paginationList.appendChild(pageHTML)
    }
}

const updatePaginationVisibility = (elementId, visibility) => {
    document.getElementById(elementId).style.visibility = visibility
}

document.getElementById("search-button").addEventListener("click", searchMovie);
document.getElementById("search-input").addEventListener("keypress", searchMovie);
document.querySelectorAll("#pagination-controls > span").forEach((elem) => {
    elem.addEventListener("click", (e) => {
        getLoadData(e.target.id === "btn-next" ? nextPage : prevPage)
    })
})


window.onload = function () {
    document.getElementById("search-input").focus();
}

getLoadData();
