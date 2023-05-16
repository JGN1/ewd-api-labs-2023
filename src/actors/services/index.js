import axios from 'axios';
import ActorReview from '../entities/ActorReview';
import logger from "../../logger";

export default {
  // Get Actor by ID
  getActor: async (actorId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_KEY}&language=en-US`
      );
      return response.data;
    } catch (error) {
      logger.error(new Error(error));
    }
  },// Get Actor Images
  getActorImages: async (actorId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${process.env.TMDB_KEY}&include_adult=false`
      );
      return response.data;
    } catch (error) {
      logger.error(new Error(error));
    }
  },// Get Actor Credits for TV and Movies
  getActorCombinedCredits: async (actorId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false`
      );
      return response.data;
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  // Get Popular actors
  getPopularActors: async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US`
        // `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page.queryKey[1]}`
      );
      return response.data;
    } catch (error) {
      logger.error(new Error(error));
    }
  },

  // Adding following for actor reviews
  addReview: async (actorId, firstName, lastName, review, rating, author, { actorReviewsRepository }) => {
    try {
      const newReview = new ActorReview(undefined, actorId, firstName, lastName, review, rating, author);
      return actorReviewsRepository.persist(newReview);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  updateReview: async (id, actorId, firstName, lastName, review, rating, author, { actorReviewsRepository }) => {
    try {
      //TODO - you implement the rest
      const reviewUpdate = new ActorReview(id, actorId, firstName, lastName, review, rating, author);
      return actorReviewsRepository.merge(reviewUpdate);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  removeReview: (id, { actorReviewsRepository }) => {
    try {
      return actorReviewsRepository.remove(id);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  getReview: (actorId, { actorReviewsRepository }) => {
    try {
      return actorReviewsRepository.get(actorId);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  find: ({ query, actorReviewsRepository }) => {
    try {
      return actorReviewsRepository.find(query);
      // return actorReviewsRepository.find(query);
    } catch (error) {
      logger.error(new Error(error));
    }
  },
  getAll: ({ query, actorReviewsRepository }) => {
    try {
      return actorReviewsRepository.getAll(query);
      // return actorReviewsRepository.find(query);
    } catch (error) {
      logger.error(new Error(error));
    }
  }
};
