import { filterData } from './data.js'
import { sortData } from './data.js';
import { average } from './data.js';

import data from './data/ghibli/ghibli.js'

const films = data.films

const containerMovies = document.getElementById("container-movies")

const printMovieList = (movieList) => {
  movieList.forEach(film => {
    containerMovies.innerHTML += `  
    <section class="movie">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      
      <figure class="movie-poster">
        <img class="poster" src=${film.poster} alt="">
          
      </figure>
    
      <section class="movie-details" id="movie-details">
        <div class="movie-headline" id="movie-headline">
          <div class="container-title">
            <h3 class="movie-title" id="movie-title">${film.title}</h3>
            <h5 class="release-date" id="release-date">${film.release_date}</h5>
          </div>
    
          <figure class="score">
            <img class="star" src="img/star.png" alt="">
            <span class="rt-score">${film.rt_score}</span>
          </figure>
         </div>
    
        <div class="details" id="characters">
          <h4 class="detail-title">Personagens</h4>
          <div class="images">
            <img src=${film.people[0].img} alt="" class="character-picture">
            <img src=${film.people[1].img} alt="" class="character-picture">
            <img src=${film.people[2].img} alt="" class="character-picture">
            <img src=${film.people[3].img} alt="" class="character-picture">
            <button class="more-characters">Ver mais</button>
          </div>
        </div>
  
        <div class="details" id="synopsis">
          <h4 class="detail-title" id="synopsis-title">Sinopse</h4>
          <p class="detail-text">${film.description}</p>
        </div>
  
        <div class="details" id="director">
          <h4 class="detail-title">Diretor</h4>
          <p class="detail-text">${film.director}</p>
        </div>
  
        <div class="details" id="producer">
          <h4 class="detail-title">Produtor</h4>
          <p class="detail-text">${film.producer}</p>
        </div>
      </section>
    </section>
  `
  })

}


printMovieList(films)


const orderSelect =document.getElementById("orderSelect")
const order = document.getElementById("order")
const orderBtn = document.getElementById("order-btn")

const filterSelect= document.getElementById("filterSelect")
const filter = document.getElementById("filter")
const filterBtn = document.getElementById("filter-btn")

//Revelando caixa select ordenação
orderSelect.addEventListener("click",(event)=>{
  order.style.display="inline-block"
  filter.style.display="none"
  event.preventDefault()

})


//revelando caixa select filtro
filterSelect.addEventListener("click",(event)=>{
  filter.style.display="inline-block"
  order.style.display="none"
  event.preventDefault()

})

//IMPRIMINDO LISTA ORDENADA

order.addEventListener("change", (event) => {
  containerMovies.innerHTML = ""
  const optionSelected = order.options[order.selectedIndex]
  const optionValue = optionSelected.value
  const optionClass = optionSelected.getAttribute("class")
  const sortedList = sortData(films, optionClass, optionValue)
  console.log(optionClass)
  console.log(optionValue)
  printMovieList(sortedList)
  event.preventDefault()

})


//IMPRIMINDO LISTA FILTRADA


//lista só de diretores
const directorsList = (filmsList) => {
  let directors = []
  for (let film of filmsList) {
    let director = film.director
    directors.push(director)
  }
  return directors
}

const setDirectors = [...new Set(directorsList(films))]
const arrayDirectors = Array.from(setDirectors)

const directorFilter = document.getElementById("director-list")


arrayDirectors.forEach(director => {
  directorFilter.innerHTML += `<option value=${director} class="director">${director}</option>`
})


//lista só de produtores

const producersList = (filmsList) => {
  let producers = []
  for (let film of filmsList) {
    let producer = film.producer
    producers.push(producer)
  }
  return producers
}

const setproducers = [...new Set(producersList(films))]
const arrayProducers = Array.from(setproducers)
console.log(arrayProducers)

const producerFilter = document.getElementById("producer-list")
arrayProducers.forEach(producer => {
  producerFilter.innerHTML += `<option value=${producer} class="producer">${producer}</option>`
})

//Impressão com filtros



filter.addEventListener("change", (event) => {
  containerMovies.innerHTML = ""
  const optionSelected = filter.options[filter.selectedIndex]
  const optionText = optionSelected.text
  const optionClass = optionSelected.getAttribute("class")
  console.log(optionText, optionClass )
  const filteredList = filterData(films, optionClass, optionText)
  console.log(filteredList)
  printMovieList(filteredList)

  event.preventDefault()

})



