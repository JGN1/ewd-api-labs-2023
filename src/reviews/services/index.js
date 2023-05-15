import Review from '../entities/Review';

export default {
  addReview: async (movieId, movie, author, review, rating, { reviewsRepository }) => {
    const newReview = new Review(undefined, movieId, movie, author, review, rating);
    return reviewsRepository.persist(newReview);
  },
  updateReview: async (id, movieId, movie, author, review, rating, { reviewsRepository }) => {
    //TODO - you implement the rest
    const reviewUpdate = new Review(id, movieId, movie, author, review, rating);
    return reviewsRepository.merge(reviewUpdate);
  },
  removeReview: (id, { reviewsRepository }) => {
    return reviewsRepository.remove(id);
  },
  getReview: (reviewId, { reviewsRepository }) => {
    return reviewsRepository.get(reviewId);
  },
  getReviewByMovieId: (movieId, { reviewsRepository }) => {
    console.log("In Services.js - getReviewByMovieId method");
    return reviewsRepository.getMovie(movieId);
  },  
  find: ({ reviewsRepository }) => {
    return reviewsRepository.find();
  }
};
