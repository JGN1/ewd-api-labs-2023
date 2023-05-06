import Genre from '../entities/Genre';

console.log("in Genre services");
export default {  
  addGenre: async (id, name, { genresRepository }) => {
    const genre = new Genre(id, name);
    
  console.log("in addGenre services");
    return genresRepository.persist(genre);
  },
  getGenre: (genreId, { genresRepository }) => {

    console.log("in getGenre services");
    return genresRepository.get(genreId);
  },
  find: ({ genresRepository }) => {
    return genresRepository.find();
  },
  updateGenre: (id, name, { genresRepository }) => {
    const genreUpdate = new Genre(id, name);
    return genresRepository.merge(genreUpdate);
  }
};
