import Joi from 'joi'

const validator = (schema) => (payload) => 
    schema.validate(payload, {abortEarly:false});


const signupSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(8).pattern(new RegExp(/[^a-zA-Z0-9\s\:]*/)).required(),
    confirmPassword: Joi.ref("password"),
});

validator(signupSchema);

export default validator(signupSchema);

