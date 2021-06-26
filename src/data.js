
export const filterData = (data, prop, name)=> {
  const filter = data.filter(obj=> obj[prop]===name)
  return filter;
};

export const sortData = (data, sortBy, sortOrder) => {
  
  const compare = (a,b) =>{
    if(isNaN(a[sortBy])==false){
      if (parseInt(a[sortBy]) < parseInt(b[sortBy]))
        return -1
      if (parseInt(a[sortBy])> parseInt(b[sortBy]))
        return 1
      return 0

    }else{
      if (a[sortBy] < b[sortBy])
           return -1
      if (a[sortBy] > b[sortBy])
          return 1
      return 0

    } 
  }

  if(sortBy==="title"){
    if(sortOrder==="ascending"){
      let ascTitles = [...data]
      ascTitles.sort(compare)
      return ascTitles
      
    } else {
      let descTitles = [...data]
      descTitles.sort(compare)
      descTitles.reverse()
      return descTitles
    }
  }
  else if(sortBy==="release_date") {
    if(sortOrder==="ascending"){
      let ascRelease = [...data]
      ascRelease.sort(compare)
      return ascRelease

    }else{
      let descRelease = [...data]
      descRelease.sort(compare)
      descRelease.reverse()
      return descRelease
    }
  }
  else if(sortBy==="rt_score") {
    if(sortOrder==="ascending"){
      let ascScore= [...data]
      ascScore.sort(compare)
      return ascScore

    }else{
      let descScore = [...data]
      descScore.sort(compare)
      descScore.reverse()
      return descScore
    }
  }
};


export const numberFemale = (data) => {
  return data.lenght;
};


export const average= (data) => {
  return data.reduce((sum, score) => sum += score, 0) / data.length;
}



// filterData(data, condition): esta função receberia os dados e nos retornaria os que cumprem com a condição.

// sortData(data, sortBy, sortOrder): esta função recebe três parâmetros. O primeiro, data, nos entrega os dados. O segundo, sortBy, diz respeito a qual das informações quer usar para ordenar. O terceiro, sortOrder, indica se quer ordenar de maneira crescente ou decrescente.

// computeStats(data): essa função nos permite fazer cálculos estatísticos básicos para serem exibidos de acordo com o que os dados permitem.