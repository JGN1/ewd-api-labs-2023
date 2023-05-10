import ActorReview from '../entities/ActorReview';

export default {
  addReview: async (actorId, firstName, lastName, review, rating, { actorReviewsRepository }) => {
    const newReview = new ActorReview(undefined, actorId, firstName, lastName, review, rating);
    return actorReviewsRepository.persist(newReview);
  },
  updateReview: async (id, actorId, firstName, lastName, review, rating, { actorReviewsRepository }) => {
    //TODO - you implement the rest
    const reviewUpdate = new ActorReview(id, actorId, firstName, lastName, review, rating);
    return actorReviewsRepository.merge(reviewUpdate);
  },
  removeReview: (id, { actorReviewsRepository }) => {
    return actorReviewsRepository.remove(id);
  },
  getReview: (actorId, { actorReviewsRepository }) => {
    return actorReviewsRepository.get(actorId);
  },
  find: ({ actorReviewsRepository }) => {
    return actorReviewsRepository.find();
  }
};
