//* validators/register.validator.js
import Joi from 'joi';

const genreSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(1).required()
});

export default {account: genreSchema};
