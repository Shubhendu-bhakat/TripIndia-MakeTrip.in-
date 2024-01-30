const Joi = require('joi');
//the joi is used for server side schema validation 
//if the user send request directly to our api by using  any site as hopsoche then this will help to protecty it 
module.exports.listingSchema = Joi.object({
    Listing :Joi.object({
        title: Joi.string().required(),
        description : Joi.string().required(),
        location :  Joi.string().required(),
        country :  Joi.string().required(),
        price :  Joi.number().required().min(0),
        image : Joi.string().allow("",null)
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required(),
    }).required()
})