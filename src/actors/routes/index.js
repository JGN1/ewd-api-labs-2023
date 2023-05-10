import express from 'express';
import ActorsController from '../controllers';
import ValidationController from '../controllers/ValidationController';


const createActorsRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const actorsController = ActorsController(dependencies);
    const validationController = ValidationController(dependencies);

    router.route('/:id')
        .get(actorsController.getActor);

    router.route('/:id/actorimage')
        .get(actorsController.getActorImages);

    router.route('/:id/actorcredits')
        .get(actorsController.getActorCombinedCredits);

    router.route('/')
        .get(actorsController.getPopularActors);

    // Following for Reviews interacting with MongoDB
    router.route('/:id/review')
        .post(validationController.validateReview, actorsController.addReview);

    router.route('/review')
        .get(actorsController.getAllReviews);

    router.route('/:id/review')
        .get(actorsController.getReview);

    router.route('/:id/review')
        .put(validationController.validateReview, actorsController.updateReview);

    router.route('/:id/deleteReview')
        .delete(actorsController.removeReview);


    return router;
};
export default createActorsRouter;
