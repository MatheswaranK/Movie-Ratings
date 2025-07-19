const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1' /*movie posters link*/ 
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280' /*getting the movie images from tmdb website*/
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="' /*search and query for the movie details*/

const main=document.getElementById('main')
const form=document.getElementById('form')
const search=document.getElementById('search')

getMovies(API_URL) /*get the random movie database*/
/*get movies function*/ 
async function getMovies(url){
    const results=await fetch(url);
    const data=await results.json();
    console.log(data);
    showMovies(data.results)
}
function showMovies(movies){
    main.innerHTML=''
    movies.forEach((movie) => {
        const{title,poster_path,vote_average,overview}=movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}"> <b><center><u>Title Of Movie & Ratings-><b>((*)rate)</b></u></center><b> 
            <div class="movie-info">
          <h3>${title}</h3> 
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3><u>Here's the Overview about the movie:</u></h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}
function getClassByRate(vote){
    if (vote >=8.5){
        return 'blue'
    }if(vote >=6.5){
        return 'green'
    }if(vote >=5.5){
        return 'red'
    }
}
form.addEventListener('submit',(e) =>{
    e.preventDefault()

    const searchTerm=search.value /*searchTerm help us to filter the movie when we search*/
    if(searchTerm && searchTerm !==''){
        getMovies(SEARCH_API +searchTerm) /*search and query for the movie details with the searchTerm help us to filter the movie when we search */
        search.value=''
    }else{
        window.location.reload()
    }
})
        
    
