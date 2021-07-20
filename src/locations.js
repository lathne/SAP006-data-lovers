import { newFilter } from './data.js'

import data from './data/ghibli/ghibli.js'

const films = data.films


const scenery = document.getElementById('scenery-images')
const printLocations = (locationsList, film) => {
    let locationImages = ''
    locationsList.forEach(location => {
        locationImages += 
        `
        <div class="container">
          <p class="movie-name card-text">${film}</p>
          <img  src=${location.img} class="card-img scale-up-center" alt="Imagem do cenário">
        </div>
      `
    }); 
    scenery.innerHTML += locationImages;  
}

for (let film of films) {
    let locationsList = film.locations
    printLocations(locationsList, film.title)
}



const filterBtn = document.getElementById("filter-btn")
const filter = document.getElementById("filter")

filterBtn.addEventListener("click", (e) => {
  e.preventDefault()
  filter.classList.toggle("filter-active")  
})



const filterMovies = document.getElementById("filter-movie")

const arrayTitles = films.map(film => film.title).flat()
arrayTitles.forEach(title => {
  filterMovies.innerHTML += 
  `<option value="${title}" class="movie-title">${title}</option>`

})


filterMovies.addEventListener("change", (e) => {
  scenery.innerHTML = ""
  const optionSelected = e.target.value
  const filteredList = newFilter(films, optionSelected)
  printLocations(filteredList[0].locations, optionSelected)
})

