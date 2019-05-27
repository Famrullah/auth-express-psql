const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      firstName: Joi.string(),
      lastName: Joi.string(),
      role: Joi.number(),
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
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
