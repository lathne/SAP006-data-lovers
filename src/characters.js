import { filterData } from './data.js'
import { sortData } from './data.js';
import { average } from './data.js';

import data from './data/ghibli/ghibli.js'

const films = data.films



const gallery = document.getElementById("gallery")
const printPeople = (peopleList, film)=>{
  peopleList.forEach(people=> {
    gallery.innerHTML += 
    ` 
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img src=${people.img} class="card-img" alt="Imagem do personagem" >
          <h5>${people.name}</h5>
        </div>
          <div class="card-back">
            <h1 class="name-character">${people.name}</h1>
            <h2 class="item-character">Filme:</h2>
            <p class="movie-name">${film}</p>
            <h2 class="item-character">Gênero:</h2>
            <p >${people.gender}</p>
            <h2 class="item-character">Idade:</h2>
            <p>${people.age}</p>
            <h2 class="item-character">Espécie:</h2>
            <p>${people.specie}</p>
          </div>  
        </div>
    </div> 
  `
  })
}


for (let film of films) {
  let peopleList = film.people
  printPeople(peopleList, film.title)
}

const filterBtn = document.getElementById("filter-btn")
const filter = document.getElementById("filter")

filterBtn.addEventListener("click",(event)=>{
  filter.style.display="inline-block"

  event.preventDefault()
})


//filtro por gênero
const genderFilter = (film,gender) => {
  let peopleList= film.people
  let list = filterData(peopleList,"gender", gender)
  return list
}

const filterGender=document.getElementById("filter-gender")
const filterMovie = document.getElementById("filter-movie")

filterGender.addEventListener("change", (event)=>{
  gallery.innerHTML=""
  const genderSelected = filterGender.options[filterGender.selectedIndex]
  const genderValue = genderSelected.value

  const movieSelected = filterMovie.options[filterMovie.selectedIndex]
  const movieText = movieSelected.text
  const movie = films.find(value=> value.title == movieText)
  

  if(movie !== undefined){
    if(genderValue!="All"){
      printPeople(genderFilter(movie, genderValue),movie.title)
    } else{
      const people = movie.people
      printPeople(people, movie.title)
    }
  }else{
    if(genderValue!=="All"){
      films.forEach(film => {
        printPeople(genderFilter(film, genderValue),film.title)
      })
    }else{
      films.forEach(film => {
        const peopleList = film.people
        printPeople(peopleList,film.title)
      })
    }
  }
  event.preventDefault()
})

//filtro por filme

//imprimindo filmes nas opções do select

const arrayTitles = (filmList) => {
  let titles = []
  for (let film of filmList) {
    let title = film.title
    titles.push(title)
  }
  return titles
}

arrayTitles(films).forEach(title => {
  filterMovie.innerHTML += `<option class="movie-title">${title}</option>`
})

filterMovie.addEventListener("change", ()=>{
  gallery.innerHTML=""
  const movieSelected = filterMovie.options[filterMovie.selectedIndex]
  const movieText = movieSelected.text
  const movie = films.find(value=> value.title == movieText)
  
  const genderSelected = filterGender.options[filterGender.selectedIndex]
  const genderValue = genderSelected.value

  if(genderValue !== "All"){
    if(movie !== undefined){
      printPeople(genderFilter(movie, genderValue),movie.title)
    }else{
      films.forEach(film => {
        printPeople(genderFilter(film, genderValue),film.title)
      })
    }
  } else{
    if(movie !== undefined){
      const people = movie.people
      printPeople(people, movie.title)
    }
    else{
      films.forEach(film => {
        const peopleList = film.people
        printPeople(peopleList,film.title)
      })
    }
  }  
})





