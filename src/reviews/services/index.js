import Review from '../entities/Review';
import logger from "../../logger";

export default {
  addReview: async (movieId, movie, author, content, rating, { reviewsRepository }) => {
    try {
      const newReview = new Review(undefined, movieId, movie, author, content, rating);
      return reviewsRepository.persist(newReview);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  updateReview: async (id, movieId, movie, author, content, rating, { reviewsRepository }) => {
    try {
      //TODO - you implement the rest
      const reviewUpdate = new Review(id, movieId, movie, author, content, rating);
      return reviewsRepository.merge(reviewUpdate);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  removeReview: (id, { reviewsRepository }) => {
    try {
      return reviewsRepository.remove(id);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  getReview: (reviewId, { reviewsRepository }) => {
    try {
      return reviewsRepository.get(reviewId);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  getReviewByMovieId: (movieId, { reviewsRepository }) => {
    try {
      return reviewsRepository.getMovie(movieId);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  find: ({ reviewsRepository }) => {
    try {
      return reviewsRepository.find();
    } catch (error) {
      logger.error(new Error(error));
    }
  }
};
