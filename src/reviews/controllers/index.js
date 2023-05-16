import reviewService from "../services";
import logger from "../../logger";


export default (dependencies) => {

    const addReview = async (request, response, next) => {
        try {
            // Input
            const { movieId, movie, author, content, rating } = request.body;
            // Treatment
            const newReview = await reviewService.addReview(movieId, movie, author, content, rating, dependencies);
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
            const { movieId, movie, author, content, rating } = request.body;
            const updatedReview = await reviewService.updateReview(id, movieId, movie, author, content, rating, dependencies);
            response.status(200).json(updatedReview);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const removeReview = async (request, response, next) => {
        try {
            //input
            const reviewId = request.params.id;
            // Treatment
            const deletedReview = await reviewService.removeReview(reviewId, dependencies);
            //output
            response.status(200).json(deletedReview);
        } catch (error) {
            logger.error(new Error(error));
        }
    };
    const getReview = async (request, response, next) => {
        try {
            //input
            const reviewId = request.params.id;
            console.log("the movie id is " + reviewId);
            // Treatment
            const review = await reviewService.getReview(reviewId, dependencies);
            //output
            response.status(200).json(review);
        } catch (error) {
            logger.error(new Error(error));
        }
    };

    const getReviewByMovieId = async (request, response, next) => {
        try {
            //input
            const movieId = request.params.id;
            // Treatment
            const review = await reviewService.getReviewByMovieId(movieId, dependencies);
            //output
            response.status(200).json(review);
        } catch (error) {
            logger.error(new Error(error));
        }
    };

    const getAllReviews = async (request, response, next) => {
        try {
            // Treatment
            const reviews = await reviewService.find(dependencies);
            //output
            response.status(200).json(reviews);
        } catch (error) {
            logger.error(new Error(error));
        }
    };

    return {
        addReview,
        updateReview,
        removeReview,
        getReview,
        getAllReviews,
        getReviewByMovieId
    };
};
