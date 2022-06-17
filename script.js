API_KEY = "658568773162c3aaffcb3981d4f5587b"
const imageBaseUrl = 'https://image.tmdb.org/t/p'
let PAGE = 1
let currentMovie = "" 
var movieCardsEl = ""

MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`
SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`
GET_MOVIE_BY_ID_URL = `https://api.themoviedb.org/3/movie/`
var CURRENT_URL = MOVIES_URL
//search: https://api.themoviedb.org/3/search/company?api_key=658568773162c3aaffcb3981d4f5587b&query=QUERYHERE&page=1


// Example image tag
//<img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>
 
/*const movies = [
    {
        id: 338953,
        posterPath: "/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg",
        title: "Fantastic Beasts: The Secrets of Dumbledore",
        voteAverage: 6.9,
        overview: "Professor Albus Dumbledore knows the powerful, dark wizard Gellert Grindelwald is moving to seize control of the wizarding world. Unable to stop him alone, he entrusts magizoologist Newt Scamander to lead an intrepid team of wizards and witches. They soon encounter an array of old and new beasts as they clash with Grindelwald's growing legion of followers."
    },
    {
        id: 526896,
        posterPath: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        title: "Morbius",
        voteAverage: 6.4,
        overview: "Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease."
    },
    {
        id: 752623,
        posterPath: "/neMZH82Stu91d3iqvLdNQfqPPyl.jpg",
        title: "The Lost City",
        voteAverage: 6.8,
        overview: "A reclusive romance novelist was sure nothing could be worse than getting stuck on a book tour with her cover model until a kidnapping attempt sweeps them both into a cutthroat jungle adventure, proving life can be so much stranger, and more romantic, than any of her paperback fictions."
    },
    {
        id: 675353,
        posterPath: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
        title: "Sonic the Hedgehog 2",
        voteAverage: 7.7,
        overview: "After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands."
    },
    {
        id: 639933,
        posterPath: "/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
        title: "The Northman",
        voteAverage: 7.3,
        overview: "Prince Amleth is on the verge of becoming a man when his father is brutally murdered by his uncle, who kidnaps the boy's mother. Two decades later, Amleth is now a Viking who's on a mission to save his mother, kill his uncle and avenge his father."
    },
    {
        id: 818397,
        posterPath: "/QaNLpq3Wuu2yp5ESsXYcQCOpUk.jpg",
        title: "Memory",
        voteAverage: 7.3,
        overview: "Alex, an assassin-for-hire, finds that he's become a target after he refuses to complete a job for a dangerous criminal organization. With the crime syndicate and FBI in hot pursuit, Alex has the skills to stay ahead, except for one thing: he is struggling with severe memory loss, affecting his every move. Alex must question his every action and whom he can ultimately trust."
    },
    {
        id: 507086,
        posterPath: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
        title: "Jurassic World Dominion",
        voteAverage: 6.7,
        overview: "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures."
    },
    {
        id: 453395,
        posterPath: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
        title: "Doctor Strange in the Multiverse of Madness",
        voteAverage: 7.4,
        overview: "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary."
    },
    {
        id: 831946,
        posterPath: "/cpWUtkcgRKeauhTyVMjYHxAutp4.jpg",
        title: "Interceptor",
        voteAverage: 6.3,
        overview: "A U.S. Army Captain uses her years of tactical training to save humanity from sixteen nuclear missiles launched at the U.S. as a violent attack threatens her remote missile interceptor station."
    },
    {
        id: 610150,
        posterPath: "/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg",
        title: "Dragon Ball Super: Super Hero",
        voteAverage: 6.8,
        overview: "The Red Ribbon Army, an evil organization that was once destroyed by Goku in the past, has been reformed by a group of people who have created new and mightier Androids, Gamma 1 and Gamma 2, and seek vengeance against Goku and his family."
    },
    {
        id: 414906,
        posterPath: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        title: "The Batman",
        voteAverage: 7.8,
        overview: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler."
    },
    {
        id: 628900,
        posterPath: "/rJPGPZ5soaG27MK90oKpioSiJE2.jpg",
        title: "The Contractor",
        voteAverage: 6.6,
        overview: "After being involuntarily discharged from the U.S. Special Forces, James Harper decides to support his family by joining a private contracting organization alongside his best friend and under the command of a fellow veteran. Overseas on a covert mission, Harper must evade those trying to kill him while making his way back home."
    },
    {
        id: 629542,
        posterPath: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
        title: "The Bad Guys",
        voteAverage: 7.8,
        overview: "When the infamous Bad Guys are finally caught after years of countless heists and being the world’s most-wanted villains, Mr. Wolf brokers a deal to save them all from prison."
    },
    {
        id: 825808,
        posterPath: "/g2n1lFIFXC0lpG32ysUhFi0Uz61.jpg",
        title: "See for Me",
        voteAverage: 6,
        overview: "When blind former skier Sophie cat-sits in a secluded mansion, three thieves invade for the hidden safe. Sophie's only defense is army veteran Kelly, who she meets on the See For Me app. Kelly helps Sophie defend herself against the invaders and survive."
    },
    {
        id: 763285,
        posterPath: "/zT5ynZ0UR6HFfWQSRf2uKtqCyWD.jpg",
        title: "Ambulance",
        voteAverage: 7,
        overview: "Decorated veteran Will Sharp, desperate for money to cover his wife's medical bills, asks for help from his adoptive brother Danny. A charismatic career criminal, Danny instead offers him a score: the biggest bank heist in Los Angeles history: $32 million."
    },
    {
        id: 648579,
        posterPath: "/bmxCAO0tz79xn40swJAEIJPRnC1.jpg",
        title: "The Unbearable Weight of Massive Talent",
        voteAverage: 7.3,
        overview: "Creatively unfulfilled and facing financial ruin, Nick Cage must accept a $1 million offer to attend the birthday of a dangerous superfan. Things take a wildly unexpected turn when Cage is recruited by a CIA operative and forced to live up to his own legend, channeling his most iconic and beloved on-screen characters in order to save himself and his loved ones."
    }
 ];
 */

const moviesGridEl = document.querySelector("#movies-grid")
const movieButtonEl = document.querySelector("#load-more-movies-btn")
const modal = document.querySelector(".modal");

const  searchButtonEl = document.getElementById("search-button")
const  searchInputEl = document.querySelector(".search-input")

function toggleModal(target) {
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
        <img id=${id} class="movie-poster" src="${imageBaseUrl}/w342${movie.poster_path}" alt="${movie.overview}" title="${movie.title}"/>
        <p class="movie-votes">Rating: ${movie.vote_average}</p>
    </div>
    `
    document.getElementById(id).addEventListener('click' , () => toggleModal('hello'))
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
