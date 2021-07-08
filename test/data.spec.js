import { filterData, sortData, average} from '../src/data.js';


const mockFilms = [
  { 
    "title": "Castle in the Sky",
    "director": "Hayao Miyazaki",
    "producer": "Isao Takahata",
    "release_date": "1986",
    "rt_score": "95",
    "people": [
      {
      "name": "Pazu",
      "gender":"Male"
      },
      
      {
      "name": "Lusheeta Toel Ul Laputa",
      "gender":"Female"
      },

      {
        "name": "Dola",
        "gender":"Female"
      },
    ] 
  },

  { 
    "title": "Porco Rosso",
    "director": "Hayao Miyazaki",
    "producer": "Toshio Suzuki",
    "release_date": "1984",
    "rt_score": "98",
    "people": [
      {
      "name": "Porco Rosso",
      "gender":"Male"
      },
      
      {
      "name": "Donald Curtis",
      "gender":"Male"
      },

      {
        "name": "Fio Piccolo",
        "gender":"Female"
      },
    ] 
  },

  { 
    "title": "When Marnie Was There",
    "director": "Hiromasa Yonebayashi",
    "producer": "Yoshiaki Nishimura",
    "release_date": "2014",
    "rt_score": "92",
    "people": [
      {
      "name": "Marnie",
      "gender":"Female"
      },
      
      {
      "name": "Anna Sasaki",
      "gender":"Female"
      },

      {
        "name": "Kazuhiko",
        "gender":"Male"
      },
    ] 
  }
]





describe('filterData', () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => filterData()).toThrow(TypeError);
    expect(() => filterData(0)).toThrow(TypeError);
    expect(() => filterData(null, [])).toThrow(TypeError);
    expect(() => filterData(0, 0)).toThrow(TypeError);
    expect(() => filterData("djeiowhfioWF", 0, [])).toThrow(TypeError);
  
  });

  it('should return an array with movie "When Marnie Was There" for director equal "Hiromasa Yonebayashi" ', () => {
    expect(filterData(mockFilms,"director","Hiromasa Yonebayashi")).toStrictEqual([mockFilms[2]]);
  });

  it('should return an array with "Pazu" for movie "Castle in the Sky" and gender "Male" ', () => {
    expect(filterData(mockFilms[0].people,"gender","Male")).toStrictEqual([mockFilms[0].people[0]]);
  });

});

describe('sortData', () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => sortData()).toThrow(TypeError);
    expect(() => sortData(0)).toThrow(TypeError);
    expect(() => sortData(undefined, [])).toThrow(TypeError);
    expect(() => sortData(15, 0)).toThrow(TypeError);
    expect(() => sortData("djeiowhfioWF", 0, [])).toThrow(TypeError);
  
  });

  it('should return an array sorted by descending alphabetical order', () => {
    expect(sortData(mockFilms,"title","descending")).toStrictEqual([mockFilms[2],mockFilms[1],mockFilms[0]]);
  });

  it('should return an array sorted by release date in ascending order', () => {
    expect(sortData(mockFilms,"release_date","ascending")).toStrictEqual([mockFilms[1], mockFilms[0], mockFilms[2]]);
  });

  it('should return an array sorted by score in descending order', () => {
    expect(sortData(mockFilms,"rt_score","descending")).toStrictEqual([mockFilms[1], mockFilms[0], mockFilms[2]]);
  });

});


describe('average', () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => average()).toThrow(TypeError);
    expect(() => average(0)).toThrow(TypeError);
    expect(() => average(undefined, [])).toThrow(TypeError);
    expect(() => average(15, 0)).toThrow(TypeError);
    expect(() => average("djeiowhfioWF", 0, [])).toThrow(TypeError);
    expect(() => average(84,5,2,74,9,6)).toThrow(TypeError);
  
  });

  it('should return 30 for [84,5,2,74,9,6]', () => {
    expect(average([84,5,2,74,9,6])).toStrictEqual(30);
  });
});
