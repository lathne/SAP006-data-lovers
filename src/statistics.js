//lista de personagens feminias por filme
// const femalePerFilm = () => {
//   let femaleList = []
//   for (let film of films) {
//     let thisFilm = []
//     let peopleList = film.people
//     for (let people of peopleList) {
//       if (people.gender == "Female") {
//         thisFilm.push(people)
//       }
//     }
//     femaleList.push(thisFilm)
//   }
//   return femaleList
// }


const scores = (dataFilms) => {
  let scoreFilms = []
  for (let film of dataFilms) {
    let scoreNumber = parseInt(film["rt_score"])
    scoreFilms.push(scoreNumber)
  }
  return scoreFilms
}

//console.log(scores(films))
//console.log(average(scores(films)))

//console.log(femalePerFilm())


//films.filter(value => value['people']['gender']=='female')
// console.log(femalePeople()
