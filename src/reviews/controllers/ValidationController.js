export default (dependencies) => {

    const { reviewSchema } = dependencies;

    const validateReview = async (request, response, next) => {
        // Input
        try {
            const validated = await reviewSchema['review'].validateAsync(request.body);
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
