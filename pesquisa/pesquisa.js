const API_KEY = 'api_key=86ec1a3e956653ab6922daed9c4230a1&language=pt-BR';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
    
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {id, title, poster_path, vote_average, release_date, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
                <div>
                    <img src="${IMG_URL+poster_path}" alt="${title}">

                    <div class="flex-container">
                        <div class="movie-info">
                            <h5>${title}</h5>
                            <span class="${getColor(vote_average)}">${vote_average}</span>
                        </div>
                    </div>

                    <div class="overview">
                        <h5>Sinopse</h5>
                        <p>${overview.length>300 ? overview.slice(0,300)+ "..." : overview}</p>
                        <button class="button btn btn-dark" onclick="window.open('https://www.themoviedb.org/movie/${id}', '_blank')">Ler mais</button>
                    </div>
                </div>

        `

        main.appendChild(movieElement);
    })
}

function getColor(vote) {
    if(vote>=7){
        return 'green'
    }
    else if(vote>=5) {
        return 'orange'
    }
    else {
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    }
    else {
        getMovies(API_URL);
    }

})
