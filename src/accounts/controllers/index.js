import accountService from "../services";
import logger from "../../logger";

export default (dependencies) => {

    const createAccount = async (request, response, next) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        //output
        response.status(201).json(account);
    };
    const getAccount = async (request, response, next) => {
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await accountService.getAccount(accountId, dependencies);
        //output
        response.status(200).json(account);
    };
    const listAccounts = async (request, response, next) => {
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output
        response.status(200).json(accounts);
    };
    const updateAccount = async (request, response, next) => {
        // Input
        const id = request.params.id;
        const { firstName, lastName, email, password } = request.body;
        const updatedAccount = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies);
        response.status(200).json(updatedAccount);
    };
    const authenticateAccount = async (request, response, next) => {
        try {
            const { email, password } = request.body;
            const token = await accountService.authenticate(email, password, dependencies);
            logger.info(email + " successfully logged in");
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            logger.error('HTTP/1.1 401 Unauthorized');
            response.status(401).json({ message: 'Unauthorised' });
        }
    };
    const verify = async (request, response, next) => {
        try {
            // Input
            const authHeader = request.headers.authorization;
            console.log("contents of authHeader is - "+authHeader);
            // Treatment
            const accessToken = authHeader.split(" ")[1];
            const user = await accountService.verifyToken(accessToken, dependencies);
            logger.info("Successfully verified access token");
            //output
            next();
        } catch (err) {
            //Token Verification Failed
            logger.error(new Error(`Verification Failed ${err.message}`));
            next(new Error(`Verification Failed ${err.message}`));
        }
    };
    const addFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const favourites = await accountService.getFavourites(id, dependencies);
            if (favourites.includes(movieId) == false) {
                const account = await accountService.addFavourite(id, movieId, dependencies);
                response.status(200).json(account);
            } else {
                throw new Error('Movie already in Favourites list');
            }
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
        authenticateAccount,
        verify,
        addFavourite,
        getFavourites
    };
};
