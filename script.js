API_KEY = "658568773162c3aaffcb3981d4f5587b"
const imageBaseUrl = 'https://image.tmdb.org/t/p'
let PAGE = 1
let currentMovie = "" 
var movieCardsEl = ""
BASE_URL = "https://api.themoviedb.org/3"


MOVIES_URL = BASE_URL + `/movie/popular?api_key=${API_KEY}&language=en-US&page=`
SEARCH_URL = BASE_URL + `/search/movie?api_key=${API_KEY}&query=`
var CURRENT_URL = MOVIES_URL
VIDEO_URL = `/videos?api_key=${API_KEY}&language=en-US`

const moviesGridEl = document.querySelector("#movies-grid")
const movieButtonEl = document.querySelector("#load-more-movies-btn")
const modal = document.querySelector(".modal");

const searchInputEl = document.getElementById("search-input")
const closeSearchEl = document.getElementById("close-search-btn")

//returns youtube key for specified movie id
async function getVideo(id){
    const response = await fetch(BASE_URL + `/movie/${id}${VIDEO_URL}`)
    const result = await response.json()
    return result.results[0].key
}

//closes popup modal box
function closeModal(){
    modal.classList.toggle("show-modal");
}

//opens popup modal box
function openModal(title, overview, video) {
    overview = overview.replace("&apos","'")
    modal.classList.toggle("show-modal");
    modal.innerHTML = `
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h1 class = "modal-title">${title}</h1>
        <div class = "ytplayer-container">
            <iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/${video}" frameborder="0">
            </iframe>
        </div>
        <p class = "modal-overview">${overview}</p>
    </div>
    `
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", function(){closeModal()});
}

//create a movie card for inputted movie
async function listMovie(movie){

    //get video for popup box
    var video = await getVideo(movie.id)
    
    //replace apostrophe so it doesn't throw an error
    var overview = movie.overview.replace("'","&apos")

    //add a movie card
    moviesGridEl.innerHTML = moviesGridEl.innerHTML + `
    <div class="movie-card">
        <p class="movie-title">${movie.title}</p>
        <a href="javascript:openModal('${movie.title}','${overview}', '${video}')">
            <img class="movie-poster" src="${imageBaseUrl}/w342${movie.poster_path}" alt="${movie.title}" title="${movie.title}"/>
        </a>
        <p class="movie-votes">Rating: ${movie.vote_average}</p>
    </div>
    `
}

//creates movie card for every movie on a page
async function getResults(PAGE_URL){
    //fetch results for popular movies on page
    const response = await fetch(PAGE_URL)
    const result = await response.json()
    
    //call listMovie on every movie in the page
    for(var i = 0; i < result.results.length; i++){
        listMovie(result.results[i])
    }
}

//load more movies if button is clicked
movieButtonEl.addEventListener('click', () => {
    //increment page to get new list of movies
    PAGE += 1
    getResults(CURRENT_URL + PAGE)
})

//list movies based on search bar input
document.getElementById("search-form").addEventListener('submit', (event) => {
    event.preventDefault()
    //start on the first page
    PAGE = 1

    //set movies grid to empty
    moviesGridEl.innerHTML = ""

    //get query value from search input
    var QUERY = searchInputEl.value

    //if user enters an empty query, remain on original page of popular movies
    if(QUERY == ""){
        getResults(MOVIES_URL + PAGE)
    }
    else{
        //construct search url from query and page
        var SEARCH = SEARCH_URL + `${QUERY}&page=${PAGE}`
        CURRENT_URL = SEARCH

        //load movies from search
        getResults(SEARCH)

        //show close search button
        closeSearchEl.style.visibility = "visible"
    }
})


//closes current search when close button is clicked
closeSearchEl.addEventListener('click', (event) => {
    event.preventDefault()
    PAGE = 1

    //set movies grid to empty
    moviesGridEl.innerHTML = ""

    //hide close search button
    closeSearchEl.style.visibility = "hidden"
    //clear searchbar
    searchInputEl.value = ""

    //get original results
    getResults(MOVIES_URL + PAGE)
})


window.onload = function(){
    //list popular movies on load
    getResults(MOVIES_URL + PAGE)
}
