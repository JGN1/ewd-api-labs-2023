import actorService from "./../services";

export default (dependencies) => {

    const getActor = async (request, response, next) => {
        //input
        const actorId = request.params.id;
        // Treatment
        const actor = await actorService.getActor(actorId, dependencies);
        //output
        response.status(200).json(actor);
    };
    const getActorImages = async (request, response, next) => {
        //input
        const actorId = request.params.id;
        // Treatment
        const actorImgs = await actorService.getActorImages(actorId, dependencies);
        //output
        response.status(200).json(actorImgs);
    };
    const getActorCombinedCredits = async (request, response, next) => {
        //input
        const actorId = request.params.id;
        // Treatment
        const actorCreds = await actorService.getActorCombinedCredits(actorId, dependencies);
        //output
        response.status(200).json(actorCreds);
    };
    const getPopularActors = async (request, response, next) => {
        // Treatment
        const actors = await actorService.getPopularActors(dependencies);
        //output
        response.status(200).json(actors);
    };

    // Following for Actor Review in MongoDB
    const addReview = async (request, response, next) => {
        // Input
        const { actorId, firstName, lastName, review, rating } = request.body;
        // Treatment
        const newReview = await actorService.addReview(actorId, firstName, lastName, review, rating, dependencies);
        //output
        response.status(201).json(newReview);
    };
    const updateReview = async (request, response, next) => {
        // Input
        const id = request.params.id;
        const { actorId, firstName, lastName, review, rating } = request.body;
        const updatedReview = await actorService.updateReview(id, actorId, firstName, lastName, review, rating, dependencies);
        response.status(200).json(updatedReview);
    };
    const removeReview = async (request, response, next) => {
        //input
        const reviewId = request.params.id;
        // Treatment
        const deletedReview = await actorService.removeReview(reviewId, dependencies);
        //output
        response.status(200).json(deletedReview);
    };
    const getReview = async (request, response, next) => {
        //input
        const actorId = request.params.id;
        console.log("the firstName id is "+actorId);
        // Treatment
        const review = await actorService.getReview(actorId, dependencies);
        //output
        response.status(200).json(review);
    };
    const getAllReviews = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const reviews = await actorService.find(query, dependencies);
        //output
        response.status(200).json(reviews);
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


