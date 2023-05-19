import express from 'express';
import ReviewsController from '../controllers';
import ValidationController from '../controllers/ValidationController';
import AccountsController from  '../../accounts/controllers';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const reviewsController = ReviewsController(dependencies);
    const validationController = ValidationController(dependencies);
    const accountsController = AccountsController(dependencies);

    router.route('/')
        .post(validationController.validateReview, reviewsController.addReview);

    // router.route('/')
    //     .post(reviewsController.createAccount);

    router.route('/')
        .get(accountsController.verify, reviewsController.getAllReviews);

    router.route('/:id')
        // .get(reviewsController.getReviewByMovieId);
    .get(reviewsController.getReview);

    router.route('/:id/movie')
        .get(accountsController.verify, reviewsController.getReviewByMovieId);

    router.route('/:id')
        .put(reviewsController.updateReview);

    router.route('/:id/delete')
        .delete(reviewsController.removeReview);

    // router.route('/security/token')
    //     .post(reviewsController.authenticateAccount);

    return router;
};
export default createRouter;
