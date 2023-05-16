import actorService from "./../services";
import logger from "../../logger";

export default (dependencies) => {

    const getActor = async (request, response, next) => {
        try {
            //input
            const actorId = request.params.id;
            // Treatment
            const actor = await actorService.getActor(actorId, dependencies);
            //output
            response.status(200).json(actor);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const getActorImages = async (request, response, next) => {
        try {
            //input
            const actorId = request.params.id;
            // Treatment
            const actorImgs = await actorService.getActorImages(actorId, dependencies);
            //output
            response.status(200).json(actorImgs);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const getActorCombinedCredits = async (request, response, next) => {
        try {
            //input
            const actorId = request.params.id;
            // Treatment
            const actorCreds = await actorService.getActorCombinedCredits(actorId, dependencies);
            //output
            response.status(200).json(actorCreds);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const getPopularActors = async (request, response, next) => {
        try {
            // Treatment
            const actors = await actorService.getPopularActors(dependencies);
            //output
            response.status(200).json(actors);
        } catch (error) {
            logger.error(new Error(error));
        }
    };

    // Following for Actor Review in MongoDB
    const addReview = async (request, response, next) => {
        try {
            // Input
            const { actorId, firstName, lastName, review, rating, author } = request.body;
            // Treatment
            const newReview = await actorService.addReview(actorId, firstName, lastName, review, rating, author, dependencies);
            //output
            response.status(201).json(newReview);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const updateReview = async (request, response, next) => {
        try {
            // Input
            const id = request.params.id;
            const { actorId, firstName, lastName, review, rating, author } = request.body;
            const updatedReview = await actorService.updateReview(id, actorId, firstName, lastName, review, rating, author, dependencies);
            response.status(201).json(updatedReview);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const removeReview = async (request, response, next) => {
        try {
            //input
            const reviewId = request.params.id;
            // Treatment
            const deletedReview = await actorService.removeReview(reviewId, dependencies);
            //output
            response.status(204).json(deletedReview);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const getReview = async (request, response, next) => {
        try {
            //input
            const actorId = request.params.id;
            // Treatment
            const review = await actorService.getReview(actorId, dependencies);
            //output
            response.status(200).json(review);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const getAllReviews = async (request, response, next) => {
        try {
            //input
            const query = request.query;
            // Treatment
            const reviews = await actorService.getAll(query, dependencies);
            // const reviews = await actorService.find(query, dependencies);
            //output
            response.status(200).json(reviews);
        } catch (error) {
            logger.error(new Error(error));
        }
    };


    return {
        getActor,
        getActorImages,
        getActorCombinedCredits,
        getPopularActors,
        addReview,
        updateReview,
        removeReview,
        getReview,
        getAllReviews
    };
};


