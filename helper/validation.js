const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.number().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You Must provide a valid email address'
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'Password Minimal 8 character'
          });
          break;
        default:
          res.status(400).send({
            error: error
          });
      }
    } else {
      next();
    }
  }
};
