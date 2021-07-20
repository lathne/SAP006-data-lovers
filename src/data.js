
export const filterData = (data, key, value) => {
  if (typeof data !== "object" || typeof key !== "string" || typeof value !== "string") {
    throw new TypeError
  }

  const filter = data.filter(obj => obj[key] === value)
  return filter;
};

export const newFilter = (data, valueSelected) => data.filter(obj => {
  return obj.title === valueSelected
});


export const sortData = (data, sortBy, sortOrder) => {
  if (typeof data !== "object" || typeof sortBy !== "string" || typeof sortOrder !== "string") {
    throw new TypeError
  }


  const compare = (a, b) => {
    if (isNaN(a[sortBy]) == false) {
      if (parseInt(a[sortBy]) < parseInt(b[sortBy]))
        return -1
      if (parseInt(a[sortBy]) > parseInt(b[sortBy]))
        return 1
      return 0

    } else {
      if (a[sortBy] < b[sortBy])
        return -1
      if (a[sortBy] > b[sortBy])
        return 1
      return 0

    }
  }

  let ascendingList = [...data]
  ascendingList.sort(compare)

  if (sortOrder === "ascending") {
    return ascendingList

  } else {
    let descendingList = ascendingList.reverse()
    return descendingList
  }

};

export const average = (data) => {
  if (typeof data !== "object") {
    throw new TypeError
  }

  return data.reduce((acc, atual) => acc + atual, 0) / data.length
}

export const firstMovie = (data)  => data.reduce((prev, curr) => {
  return prev < curr ? prev : curr
})
