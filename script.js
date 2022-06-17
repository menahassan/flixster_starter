API_KEY = "658568773162c3aaffcb3981d4f5587b"
const imageBaseUrl = 'https://image.tmdb.org/t/p'
let PAGE = 1
let currentMovie = "" 
var movieCardsEl = ""

MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`
SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`
GET_MOVIE_BY_ID_URL = `https://api.themoviedb.org/3/movie/`
var CURRENT_URL = MOVIES_URL

const moviesGridEl = document.querySelector("#movies-grid")
const movieButtonEl = document.querySelector("#load-more-movies-btn")
const modal = document.querySelector(".modal");

const  searchButtonEl = document.getElementById("search-button")
const  searchInputEl = document.querySelector(".search-input")

function toggleModal() {
    console.log('hello')
    //modal.classList.toggle("show-modal");
    /*if(target != "none"){
        var title = target.title
        var overview= target.alt
        var src= target.src
        modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h1 class = "modal-title">${title}</h1>
            <div class = "modal-poster-container">
                <img class="modal-poster" src=${src} alt="${overview}" title="${title}"/>
            </div>
            <p class = "modal-overview">${overview}</p>
        </div>
        `
        const closeButton = document.querySelector(".close-button");
        closeButton.addEventListener("click", function(){toggleModal("none")});
    }*/
}

//create a movie card
function listMovie(movie){
    var id = movie.id
    moviesGridEl.innerHTML = moviesGridEl.innerHTML + `
    <div class="movie-card">
        <p class="movie-title">${movie.title}</p>
        <img class="movie-poster" src="${imageBaseUrl}/w342${movie.poster_path}" alt="${movie.overview}" title="${movie.title}"/>
        <p class="movie-votes">Rating: ${movie.vote_average}</p>
    </div>
    `

    var posters = document.getElementsByClassName("movie-poster")
    console.log(posters[posters.length - 1])
    posters[posters.length - 1].addEventListener('click', toggleModal);
    console.log('done')
}
//create a movie card for each movie
async function getResults(PAGE_URL){
    const response = await fetch(PAGE_URL)
    const result = await response.json()
    console.log("result: ",result.results)
    for(var i = 0; i < result.results.length; i++){
        listMovie(result.results[i])
    }
}

//load more movies if button is clicked
movieButtonEl.addEventListener('click', () => {
    PAGE += 1
    getResults(CURRENT_URL + PAGE)
})

//search
document.getElementById("search-form").addEventListener('submit', (event) => {
    event.preventDefault()
    PAGE = 1
    moviesGridEl.innerHTML = ""
    var QUERY = searchInputEl.value
    if(QUERY == ""){
        getResults(MOVIES_URL + PAGE)
    }
    else{
        var SEARCH = SEARCH_URL + `${QUERY}&page=${PAGE}`
        CURRENT_URL = SEARCH
        getResults(SEARCH)
    }
})

window.onload = function(){
    getResults(MOVIES_URL + PAGE)
}


/*
window.onload = function(){
    getResults(MOVIES_URL + PAGE)

    for(var i = 0; i < movieCardsEl.length; i++){
        movieCardsEl[i].addEventListener('click', function(e) {
            console.log('click')
            e = e || window.event;
            var target = e.target;
            toggleModal(target)   
        }, false)
    }
}
*/
