const Joi = require('joi');

module.exports.campgroundValidationSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.number().min(0),
        description: Joi.string().required()
    }).required()
})
module.exports.reviewValidationSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(0).max(5),
        body: Joi.string().required()
    }).required()
})

