export default (dependencies) => {

    const { genreSchema } = dependencies;

    const validateGenre = async (request, response, next) => {
        // Input
        console.log("Got into Genre ValidationController1111");
        try {
            const validated = await genreSchema['genre'].validateAsync(request.body);
            request.body = validated;
            console.log("Got into Genre ValidationController");
            next();
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        validateGenre
    };
};
