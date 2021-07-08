import { filterData } from './data.js'


import data from './data/ghibli/ghibli.js'

const films = data.films



const gallery = document.getElementById("gallery")
const printPeople = (peopleList, film)=>{

  let charactersCards = ''
  peopleList.forEach(people=> {
    charactersCards += 
    ` 
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img onerror="this.src='/img.chihiro.png'" src=${people.img} class="card-img" alt="Imagem do personagem" id=${people.id} >
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

//Trocando imagens não encontradas

const imageValidation = () =>{

  let arrayImgs = document.querySelectorAll(".card-img")

    for(let img of arrayImgs){
      const url = img.getAttribute("src")
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status != 200) {
          img.setAttribute("src","img/not-found2.png")
        }
      };
    
      xhr.open('HEAD', url);
      xhr.send();
    }
  }

  imageValidation()


const filterBtn = document.getElementById("filter-btn")
const filter = document.getElementById("filter")

filterBtn.addEventListener("click",(event)=>{
  filter.classList.toggle("filter-active")

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

filterGender.addEventListener("change", ()=>{
  gallery.innerHTML=""
  const genderSelected = filterGender.options[filterGender.selectedIndex]
  const genderValue = genderSelected.value

  const movieSelected = filterMovie.options[filterMovie.selectedIndex]
  const movieText = movieSelected.text
  const movie = films.find(value=> value.title == movieText)
  

  if(movie !== undefined){
    if(genderValue!="All"){
      printPeople(genderFilter(movie, genderValue),movie.title)
      // imageValidation(genderFilter(movie, genderValue))
      
    } else{
      const people = movie.people
      printPeople(people, movie.title)
      // imageValidation(people)
      
    }
  }else{
    if(genderValue!=="All"){
      let genderList
      films.forEach(film => {
        genderList = genderFilter(film, genderValue)
        printPeople(genderList,film.title)
        // imageValidation(genderList) //não funciona
      })

    }else{
      films.forEach(film => {
        const peopleList = film.people
        printPeople(peopleList, film.title)
        // imageValidation(peopleList) //não funciona
      })
      
    }
  }
  imageValidation()
  
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
      // imageValidation(genderFilter(movie, genderValue))


    }else{
      films.forEach(film => {
        printPeople(genderFilter(film, genderValue),film.title)
        // imageValidation(genderFilter(film, genderValue))
      })
      
    }
  } else{
    if(movie !== undefined){
      const people = movie.people
      printPeople(people, movie.title)
      // imageValidation(people)
    }
    else{
      films.forEach(film => {
        const peopleList = film.people
        printPeople(peopleList,film.title)
        // imageValidation(peopleList) //não funciona
      })
      
    }
  } 
  imageValidation() 
})

