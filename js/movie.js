class Movie {
    constructor(id, title, overview, poster_path, vote_average,language = 'en-US') {
        this._id = id
        this._title = title;
        this._overview = overview;
        this._poster_path = `https://image.tmdb.org/t/p/w342/${poster_path}`;
        this._vote_average = vote_average.toFixed(1)
        this._language = language;
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
                        <h5 class="card-title jersey-25-regular" style="font-weight: bold">${this._title}</h5>
                        <p class="card-text jersey-25-regular-thin">${this._overview}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" style="font-weight: bold;">평점: <span class="material-symbols-outlined star-icon">star_rate</span>${this._vote_average}</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    }

    getClickEvent = () => {
        window.location.href = `detail.html?id=${this._id}&language=${this._language}`;
    }
}

export async function getTMDBData(url) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzhkYWIyMDlkN2FiNjQ2MjBkNWY3NjM0YTk2Y2Y4ZSIsInN1YiI6IjY2MmEyY2FlMWQ3OGYyMDExZTJmZWZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F_228f-CVuuIOTCRJnkPvqxS1a_1vM1ikZ_tHzTXTM4'
        }
    };

    let response = await fetch(url, options)
    if (!response.ok) {
        throw new Error("HTTP status " + response.status);
    }

    return response.json()
}

export const setCards = (movieDatas,language = 'en-US') => {
    const cardWrappers = document.getElementById("content-wrap");
    cardWrappers.innerHTML = "";

    movieDatas.forEach(elem => {
        const movie = new Movie(
            elem.id,
            elem.title,
            elem.overview,
            elem.poster_path,
            elem.vote_average,
            language
        );

        const cardHTML = document.createElement('div')

        cardHTML.innerHTML = movie.getCardHTML();
        cardHTML.classList.add('card-wrap');

        cardHTML.addEventListener('click', () => {
            movie.getClickEvent();
        })

        cardWrappers.appendChild(cardHTML);
    });
}

export const setMovieDetail = (details) => {
    const detailContent = document.querySelector('#detail-content')

    detailContent.innerHTML = `
    <div id="movie-poster-wrap">
        <div>
            <img id="poster-image" src=https://image.tmdb.org/t/p/w342/${details['poster_path']}>
        </div>
    </div>
    <div id="movie-detail-wrap">
        <h3 id="title" style="font-weight: bold;">${details['title']}</h3>
        <div id="vote-wrap">
            <span class="material-symbols-outlined star-icon">star_rate</span>
            <span id="vote-average" style="font-weight: bold;">${details['vote_average'].toFixed(1)}</span>
        </div>
        <span id="movie-description">개요 : ${details['origin_country'][0]} • ${details['runtime']}</span>
        <p>개봉 : ${details['release_date']}</p>
        <p id="overview">${details['overview']}</p>
    </div>
    `
}