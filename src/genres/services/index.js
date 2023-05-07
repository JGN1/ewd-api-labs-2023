import Genre from '../entities/Genre';

export default {  
  addGenre: async (id, name, { genresRepository }) => {
    const genre = new Genre(id, name);
    return genresRepository.persist(genre);
  },
  getGenre: (genreId, { genresRepository }) => {
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
