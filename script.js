



let state = {
    apiKey: "&api_key=ca83a93d1e8be15e27eafb71b7ba84af",
    url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=",
    pageNum: 1,
}
let homeButton = document.getElementById("close-search-btn")
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const loadButton = document.getElementById("load-more-btn");








//generates an entire page of movie cards
async function generateNewPage(page){
    state.pageNum = page 
    completeUrl =  state.url + state.pageNum.toString() + state.apiKey
    fetch(completeUrl).then(response => response.json()).then(response => {
        //generates the initial screen of movies
        addPage(response.results)

    })
    
}


//generates a single movie card helper function of generateNewPage
function generateMovieCardUrl(result){
    imageUrl = "https://image.tmdb.org/t/p/w500"
    let title = result.title
    let vote = result.vote_average
    let image = imageUrl + result.poster_path
    if(image.slice(-3) != "jpg"){
        image = "no-img.png"
    }
    let voteColor = "white"
    if(vote > 7.9){
        voteColor = "#56fc03"
    }
    if(vote < 6.5)[
        voteColor = "#fc2803"
    ]
    if(vote <= 7.9 && vote >= 6.5 ){
        voteColor = "yellow"
    }





    return `
    <div class = "movie-card">
        <img class = "movie-poster" src=${image} alt = "image">
        <div style="color:${voteColor};" class = "movie-rating">${vote}/10</div>
        <div class = "movie-title">${title}</div>
    </div>
`
}




//adds a movie to the grid
function addToGrid(movieCardElement){
    let movieGridElement = document.querySelector("#movies-grid")
    movieGridElement.innerHTML += movieCardElement

}

//iterate through results and display them. Returns array of movies that have not been added yet
function addPage(results){
    results.forEach(result => addToGrid(generateMovieCardUrl(result)))
}

//takes the response and the desired page number and returns response.result of the desired page
function newPage(response){
    addPage(response.results)
}

//handles the user input for the loadMore button being clicked
async function buttonClicked(){
    console.log("clicked")
    //increments the page number and creates a new call to the api to retrieve the next page of data
    state.pageNum += 1
    generateNewPage(state.pageNum)

}

//async function in charge of handling submission requests
async function handleSearchSubmit(search){
    //creates an API call to search for a movie
    state.url 
    const searchUrl = "https://api.themoviedb.org/3/search/movie?" + "query=" + `${search}` + `${state.apiKey}` + "&page=" + state.pageNum.toString()
    fetch(searchUrl).then(response => response.json()).then(response => {
        clearGrid()
        addPage(response.results)
    })
}

//clears all of the movies from the movies grid
function clearGrid(){
    let movieGridElement = document.querySelector("#movies-grid")
    movieGridElement.innerHTML = ''
}

window.onload = function () {
    generateNewPage(1)
    homeButton.addEventListener("click",(event) => {
        clearGrid()
        generateNewPage(1)
    })
    searchForm.addEventListener("submit",(event) => {event.preventDefault(); handleSearchSubmit(searchInput.value)})
    loadButton.addEventListener("click", buttonClicked);
}   