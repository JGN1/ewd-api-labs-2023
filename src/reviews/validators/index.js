//* validators/register.validator.js
import Joi from 'joi';

const reviewSchema = Joi.object({
    movieId: Joi.number().min(3).required(),
    movie: Joi.string().min(1).required(),
    author: Joi.string().min(3).max(50).required(),
    review: Joi.string().min(10).max(600).required(),
    rating: Joi.number().required()
});

export default {review: reviewSchema};
