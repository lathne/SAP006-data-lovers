import { filterData } from './data.js'
import { sortData } from './data.js';
import { average } from './data.js';


import data from './data/ghibli/ghibli.js'

const films = data.films

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
                <h3 class="movie-title" id="movie-title">${film.title}</h3>
                <h5 class="release-date" id="release-date">${film.release_date}</h5>
              </div>
        
              <figure class="score">
                <img class="star" src="img/rate.png" alt="">
                <span class="rt-score">${film.rt_score}</span>
              </figure>
            </div>

          

            <div class="details" id="characters">
              <h4 class="detail-title">Personagens</h4>
              <div class="images">
                <img src=${film.people[0].img} alt="" class="character-picture">
                <img src=${film.people[1].img} alt="" class="character-picture">
                <img src=${film.people[2].img} alt="" class="character-picture">
                <img src=${film.people[3].img} alt="" class="character-picture picture-4">
                <button class="more-characters" id=${film.id}><img class="see-more" src="img/more-than.png" alt="">Ver todos</button>
              </div>
            </div>
          </div>
        </div>
      
        <div class="details text-mobile" id="synopsis">
          <h4 class="detail-title" id="synopsis-title">Sinopse</h4>
          <p class="detail-text">${film.description}</p>
        </div>
  
        <div class="details  text-mobile" id="director">
          <h4 class="detail-title">Diretor</h4>
          <p class="detail-text">${film.director}</p>
        </div>
  
        <div class="details  text-mobile" id="producer">
          <h4 class="detail-title">Produtor</h4>
          <p class="detail-text">${film.producer}</p>
        </div>
      </section>
    </section>
  `
  })

}


printMovieList(films)

const order = document.getElementById("order")
const orderBtn = document.getElementById("order-btn")

const filter = document.getElementById("filter")
const filterBtn = document.getElementById("filter-btn")


orderBtn.addEventListener("click",(event)=>{
  order.style.display="inline-block"
  filter.style.display="none"
  event.preventDefault()

})


//revelando caixa select filtro
filterBtn.addEventListener("click",(event)=>{
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






window.addEventListener('DOMContentLoaded', () =>{
  const seeMoreBtns = document.querySelectorAll(".more-characters")
  seeMoreBtns.forEach(btn =>
    btn.addEventListener("click", (event) =>{
      const idMovie = event.currentTarget.id
      const movieSelected = films.find(film => film.id == idMovie)
      const peopleOfMovieSelected = movieSelected.people
      const modal = document.getElementById("modal-characters")
      const modalBtn = document.getElementById("modal-btn")
      const modalTitle =document.getElementById("modal-title")

      const characterContainer = document.getElementById("characters-container")
      modalTitle.innerText=`Personagens de ${movieSelected.title}`

      peopleOfMovieSelected.forEach(people =>{
        characterContainer.innerHTML+=`
        <div  class="character">
            <img class="image-modal" src="${people.img}" alt="">
            <p class="name-modal">${people.name}</p>
        </div>     
        `

      })

      modal.classList.add("mostrar")
     
      modalBtn.addEventListener("click", ()=>{
        modal.classList.remove("mostrar")
        characterContainer.innerHTML=""
      })

      modal.addEventListener("click",(event)=>{
        if(event.target.id == "modal-characters"){
          modal.classList.remove("mostrar")
          characterContainer.innerHTML=""
          
        }

      })
      
      

    }))
  
})


var comboGoogleTradutor = null; //Varialvel global

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'en,pt',
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
    }, 'google_translate_element');

    comboGoogleTradutor = document.getElementById("google_translate_element").querySelector(".goog-te-combo");
}

