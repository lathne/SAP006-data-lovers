import { filterData } from './data.js'
import { sortData } from './data.js';
import { average } from './data.js';


import data from './data/ghibli/ghibli.js'

const films = data.films

//Gráficos Charts.js
const filmTitles =  films.map(film => film.title)
const filmScores = films.map(film => film["rt_score"])
const filmYears = films.map(film => film["release_date"])

const chartScores = document.getElementById("chartScores")
const filmsTimeLineChart = document.getElementById("filmsTimeLineChart")

new Chart(filmsTimeLineChart, {
  type: 'line',
  data: {
    labels: filmTitles,
    datasets: [{
      label: "Linha do Tempo",
      data: filmYears,
      backgroundColor: "rgb(156, 78, 180, 0.5)",
      fill: true
    }]
  },
  options: {
    plugins: {
      legend: {
        labels:{
          font: {
            size: 14
          }
        }
      }
    },
    responsive: true,
    }
})

new Chart(chartScores, {
    type: 'bar',
    data: {
      labels: filmTitles,
      datasets: [{
        label: "Notas Por Filme",
        data: filmScores,
        backgroundColor: "rgb(100, 145, 60, 0.5)",
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 40
        }
      },
      plugins: {
        legend: {
          labels:{
            font: {
              size: 14
            }
          }
        }
      },
    }

})

//Total de Filmes

const titles = (films) => {
  let movieTitle = []
  for (let film of films) {
    let title = film.title
    movieTitle.push(title)
  }

  const printTotalFilms = document.getElementById("totalFilms")
  printTotalFilms.innerHTML = 
      `<div class="flex-item">
          <div class="box">
              <p>Desde a década de 80 o Studio Ghibli produziu <strong class="data">${movieTitle.length}</strong> filmes</p>
          </div>
       </div>`
}
titles(films)

// Média das Notas

const scores = (dataFilms) => {
  let scoreFilms = []
  for (let film of dataFilms) {
    let scoreNumber = parseInt(film["rt_score"])
    scoreFilms.push(scoreNumber)

  }
  const printAverageScore = document.getElementById("averageScore")
  printAverageScore.innerHTML = 
        `<div class="flex-item">
            <div class="box">
                <p>A média de notas dos filmes é <strong class="data">${average(scoreFilms)}</strong></p>
            </div>
        </div>`
}
scores(films)


