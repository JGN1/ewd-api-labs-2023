import reviewService from "../services";

export default (dependencies) => {

    const addReview = async (request, response, next) => {
        // Input
        const { movieId, movie, author, review, rating } = request.body;
        // Treatment
        const newReview = await reviewService.addReview(movieId, movie, author, review, rating, dependencies);
        //output
        response.status(201).json(newReview);
    };
    const updateReview = async (request, response, next) => {
        // Input
        const id = request.params.id;
        const { movieId, movie, author, review, rating } = request.body;
        const updatedReview = await reviewService.updateReview(id, movieId, movie, author, review, rating, dependencies);
        response.status(200).json(updatedReview);
    };
    const removeReview = async (request, response, next) => {
        //input
        const reviewId = request.params.id;
        // Treatment
        const deletedReview = await reviewService.removeReview(reviewId, dependencies);
        //output
        response.status(200).json(deletedReview);
    };
    const getReview = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        console.log("the movie id is "+movieId);
        // Treatment
        const review = await reviewService.getReview(movieId, dependencies);
        //output
        response.status(200).json(review);
    };
    const getAllReviews = async (request, response, next) => {
        // Treatment
        const reviews = await reviewService.find(dependencies);
        //output
        response.status(200).json(reviews);
    };
   
    return {
        addReview,
        updateReview,
        removeReview,
        getReview,
        getAllReviews
    };
};
