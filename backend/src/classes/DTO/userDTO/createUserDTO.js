const Joi = require("joi");
const {ValidationFailedError} = require('../../../errors')
class CreateUserDTO {
  constructor(data) {
    const schema = Joi.object({
            
        registrationId: Joi.string().max(20).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        fullName: Joi.string().required(),
        nameWithInitial: Joi.string().required(),
        
        email: Joi.string().email().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string(),
        addressZip: Joi.string().required(),

        type: Joi.string().valid('user', 'admin', 'student', 'department', 'lecturer').required(),

        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().min(6).required(),
        
    });

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
      throw new ValidationFailedError(error.message, 400, error.details)  
    }

    Object.assign(this, value);
  }
}

module.exports = { CreateUserDTO };
