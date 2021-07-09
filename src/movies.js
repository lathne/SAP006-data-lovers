import { filterData } from './data.js'
import { sortData } from './data.js';
import data from './data/ghibli/ghibli.js'

const films = data.films

const imageValidation = (className) => {
  let arrayImgs = document.querySelectorAll(className)

  for (let img of arrayImgs) {
    const url = img.getAttribute("src")
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status != 200) {
        img.setAttribute("src", "img/not-found-small.png")
      }
    };

    xhr.open('HEAD', url);
    xhr.send();
  }
}

const containerMovies = document.getElementById("container-movies")
const printMovieList = (movieList) => {
  movieList.forEach(film => {
    containerMovies.innerHTML += `  
    <section class="movie" id=${film.id} >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      
      <figure class="movie-poster">
        <img class="poster" src=${film.poster} alt="">  
      </figure>
    
      <section class="movie-details" id="movie-details">
        <div class="master-details">
          <figure class="movie-poster-mobile">
            <img class="poster-mobile" src=${film.poster} alt="">
          </figure>

          <div class="container-movie-header">
            <div class="movie-headline" id="movie-headline">
              
              <div class="container-title">
                <h3 class="movie-title notranslate" id="movie-title">${film.title}</h3>
                <h5 class="release-date" id="release-date">${film.release_date}</h5>
              </div>
        
              <figure class="score">
                <img class="star" src="img/rate.png" alt="">
                <span class="rt-score">${film.rt_score}</span>
              </figure>
            </div>
            <div class="team">
              <div id="director">
                <h4 class="detail-title">Diretor</h4>
                <p class="detail-text">${film.director}</p>
              </div>
    
              <div  id="producer">
                <h4 class="detail-title">Produtor</h4>
                <p class="detail-text">${film.producer}</p>
              </div> 
            </div> 
          </div>
        </div>

        <div id="characters">
              <h4 class="detail-title">Personagens</h4>
              <div class="images">
                <img src=${film.people[0].img} alt="" class="character-picture">
                <img src=${film.people[1].img} alt="" class="character-picture">
                <img src=${film.people[2].img} alt="" class="character-picture">
                <img src=${film.people[3].img} alt="" class="character-picture picture-4">
                <button class="more-characters" id=${film.id}><img class="see-more" src="img/more-than.png" alt="">Ver todos</button>
              </div>
            </div>
      
        <div class="details text-mobile" id="synopsis">
          <h4 class="detail-title" id="synopsis-title">Sinopse</h4>
          <p class="detail-text">${film.description}</p>
        </div>

      </section>
    </section>
    
  `
  })
}

const seeMoreCharacters = () => {
  const seeMoreBtns = document.querySelectorAll(".more-characters")
  seeMoreBtns.forEach(btn =>
    btn.addEventListener("click", (event) => {

      const idMovie = event.currentTarget.id
      const movieSelected = films.find(film => film.id == idMovie)
      const peopleOfMovieSelected = movieSelected.people
      const modalExtern = document.getElementById("modal-characters")
      const modal = document.getElementById("modal")
      const modalBtn = document.getElementById("modal-btn")
      const modalTitle = document.getElementById("modal-title")

      const characterContainer = document.getElementById("characters-container")

      modalTitle.innerText = `Personagens de ${movieSelected.title}`

      peopleOfMovieSelected.forEach(people => {

        characterContainer.innerHTML += `
        <div  class="character">
            <img class="image-modal" src=${people.img}  alt="">
            <p class="name-modal notranslate">${people.name}</p>
        </div>     
        `
      })

      imageValidation(".image-modal")

      modalExtern.classList.add("mostrar")
      modal.scrollTop = 0;

      modalBtn.addEventListener("click", () => {

        modalExtern.classList.remove("mostrar")
        characterContainer.innerHTML = ""
      })

      modalExtern.addEventListener("click", (event) => {

        if (event.target.id == "modal-characters") {
          modalExtern.classList.remove("mostrar")
          characterContainer.innerHTML = ""
        }
      })
    }))
}

window.addEventListener('DOMContentLoaded', () => {
  printMovieList(films)
  seeMoreCharacters()
  imageValidation(".character-picture")
})

const order = document.getElementById("order")
const orderBtn = document.getElementById("order-btn")

const filter = document.getElementById("filter")
const filterBtn = document.getElementById("filter-btn")

orderBtn.addEventListener("click", (event) => {
  order.style.display = "inline-block"
  filter.style.display = "none"
  event.preventDefault()
})

filterBtn.addEventListener("click", (event) => {
  filter.style.display = "inline-block"
  order.style.display = "none"
  event.preventDefault()
})

order.addEventListener("change", () => {
  containerMovies.innerHTML = ""
  const optionSelected = order.options[order.selectedIndex]
  const optionValue = optionSelected.value
  const optionClass = optionSelected.getAttribute("class")
  const sortedList = sortData(films, optionClass, optionValue)
  printMovieList(sortedList)
  imageValidation(".character-picture")
  seeMoreCharacters()
})


const directorsList = films.map(film => film.director)
const setDirectors = [...new Set(directorsList)]
const arrayDirectors = Array.from(setDirectors)
const directorFilter = document.getElementById("director-list")

arrayDirectors.forEach(director => {
  directorFilter.innerHTML += `<option value=${director} class="director">${director}</option>`
})

const producersList = films.map(film => film.director)
const setproducers = [...new Set(producersList)]
const arrayProducers = Array.from(setproducers)
const producerFilter = document.getElementById("producer-list")

arrayProducers.forEach(producer => {
  producerFilter.innerHTML += `<option value=${producer} class="producer">${producer}</option>`
})

filter.addEventListener("change", () => {
  containerMovies.innerHTML = ""
  const optionSelected = filter.options[filter.selectedIndex]
  const optionText = optionSelected.text
  const optionClass = optionSelected.getAttribute("class")

  const filteredList = filterData(films, optionClass, optionText)
  printMovieList(filteredList)
  imageValidation(".character-picture")
  seeMoreCharacters()
})


