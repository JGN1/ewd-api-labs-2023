export default (dependencies) => {

    const { accountSchema } = dependencies;

    const validateAccount = async (request, response, next) => {
        // Input
        try {
            const validated = await accountSchema['account'].validateAsync(request.body);
            request.body = validated;
            next();
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        validateAccount
    };
};
