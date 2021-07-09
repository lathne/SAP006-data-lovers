import { filterData } from './data.js'
import data from './data/ghibli/ghibli.js'

const films = data.films

const gallery = document.getElementById("gallery")
const printPeople = (peopleList, film) => {

  let charactersCards = ''
  peopleList.forEach(people => {
    charactersCards +=
      ` 
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img  src=${people.img} class="card-img" alt="Imagem do personagem" id=${people.id} >
          <div class="div-name">
            <h5 class="people-name">${people.name}</h5>
          </div>
        </div>
          <div class="card-back">
            <h1 class="name-character">${people.name}</h1>
            <h2 class="item-character">Filme:</h2>
            <p class="movie-name card-text">${film}</p>
            <h2 class="item-character">Gênero:</h2>
            <p class="card-text">${people.gender}</p>
            <h2 class="item-character">Idade:</h2>
            <p class="card-text">${people.age}</p>
            <h2 class="item-character">Espécie:</h2>
            <p class="card-text">${people.specie}</p>
          </div>  
        </div>
    </div> 
  `
  })

  gallery.innerHTML += charactersCards


}

for (let film of films) {
  let peopleList = film.people
  printPeople(peopleList, film.title)
}

const imageValidation = () => {

  let arrayImgs = document.querySelectorAll(".card-img")

  for (let img of arrayImgs) {
    const url = img.getAttribute("src")
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status != 200) {
        img.setAttribute("src", "img/not-found2.png")
      }
    };

    xhr.open('HEAD', url);
    xhr.send();
  }
}

imageValidation()


const filterBtn = document.getElementById("filter-btn")
const filter = document.getElementById("filter")

filterBtn.addEventListener("click", (event) => {
  filter.classList.toggle("filter-active")

  event.preventDefault()
})

const genderFilter = (film, gender) => {
  let peopleList = film.people
  let list = filterData(peopleList, "gender", gender)
  return list
}

const generalFilter = () => {
  gallery.innerHTML = ""
  const genderSelected = filterGender.options[filterGender.selectedIndex]
  const genderValue = genderSelected.value

  const movieSelected = filterMovie.options[filterMovie.selectedIndex]
  const movieText = movieSelected.text
  const movie = films.find(value => value.title == movieText)


  if (movie !== undefined) {
    if (genderValue != "All") {
      printPeople(genderFilter(movie, genderValue), movie.title)


    } else {
      const people = movie.people
      printPeople(people, movie.title)
    }

  } else {
    if (genderValue !== "All") {
      let genderList
      films.forEach(film => {
        genderList = genderFilter(film, genderValue)
        printPeople(genderList, film.title)
      })

    } else {
      films.forEach(film => {
        const peopleList = film.people
        printPeople(peopleList, film.title)
      })

    }
  }
  imageValidation()
}

const filterGender = document.getElementById("filter-gender")
const filterMovie = document.getElementById("filter-movie")

filterGender.addEventListener("change", () => {
  generalFilter()
})

const arrayTitles = films.map(film => film.title)

arrayTitles.forEach(title => {
  filterMovie.innerHTML += `<option class="movie-title">${title}</option>`
})

filterMovie.addEventListener("change", () => {
  generalFilter()
})

