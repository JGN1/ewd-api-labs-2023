//* validators/register.validator.js
import Joi from 'joi';

const actorReviewSchema = Joi.object({
    actorId: Joi.number().min(3).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    review: Joi.string().min(10).max(600).required(),
    rating: Joi.number().required(),
    author: Joi.string().min(2).max(100).required()
});

export default {actorReview: actorReviewSchema};
