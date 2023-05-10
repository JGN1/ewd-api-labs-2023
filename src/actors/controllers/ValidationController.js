export default (dependencies) => {

    const { actorReviewSchema } = dependencies;

    const validateReview = async (request, response, next) => {
        // Input
        try {
            const validated = await actorReviewSchema['actorReview'].validateAsync(request.body);
            request.body = validated;
            next();
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        validateReview
    };
};
