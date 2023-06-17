import Joi from "joi"


//signup validatin function 
export const signupSchema =
{
   body: Joi.object({
        userName: Joi.string().alphanum().min(3).max(20).required().messages({
            "any.required":" userName is required",
            "string.email" : "userName is  not valid"
        }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
        cPassword: Joi.string().valid(Joi.ref('password')).required(),
       // age: Joi.number().integer().min(20).max(50), //لازم اكتب  integer  عشان ما يقبل كسور 
       // gender : Joi.string().alphanum().valid('male', 'female').required(), 
    }).required(),
    
 //   params: Joi.object({
   //     test: Joi.boolean().required(),
   // }).required(),
}

//login validatin function 
export const loginSchema =
{
    body : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).required()
}



