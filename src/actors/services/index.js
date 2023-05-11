import axios from 'axios';
import ActorReview from '../entities/ActorReview';

export default {
  // Get Actor by ID
  getActor: async (actorId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
    return response.data;
  },// Get Actor Images
  getActorImages: async (actorId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${process.env.TMDB_KEY}&include_adult=false`
    );
    return response.data;
  },// Get Actor Credits for TV and Movies
  getActorCombinedCredits: async (actorId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false`
    );
    return response.data;
  },
  // Get Popular actors
  getPopularActors: async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US`
      // `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page.queryKey[1]}`
    );
    return response.data;
  },

  // Adding following for actor reviews
  addReview: async (actorId, firstName, lastName, review, rating, author, { actorReviewsRepository }) => {
    const newReview = new ActorReview(undefined, actorId, firstName, lastName, review, rating, author);
    return actorReviewsRepository.persist(newReview);
  },
  updateReview: async (id, actorId, firstName, lastName, review, rating, author, { actorReviewsRepository }) => {
    //TODO - you implement the rest
    const reviewUpdate = new ActorReview(id, actorId, firstName, lastName, review, rating, author);
    return actorReviewsRepository.merge(reviewUpdate);
  },
  removeReview: (id, { actorReviewsRepository }) => {
    return actorReviewsRepository.remove(id);
  },
  getReview: (actorId, { actorReviewsRepository }) => {
    return actorReviewsRepository.get(actorId);
  },
  find: ({ query, actorReviewsRepository }) => {
    return actorReviewsRepository.find(query);
    // return actorReviewsRepository.find(query);
  },
  getAll: ({ query, actorReviewsRepository }) => {
    return actorReviewsRepository.getAll(query);
    // return actorReviewsRepository.find(query);
  }
};
