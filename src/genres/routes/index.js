import express from 'express';
import GenreController from '../controllers';
import ValidationController from '../controllers/ValidationController';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const genresController = GenreController(dependencies);
    const validationController = ValidationController(dependencies);

    router.route('/api/genres')
        .post(validationController.validateGenre, genresController.addGenre);

    router.route('/api/genres')
        .get(genresController.getGenres);

    return router;
};
export default createRouter;
