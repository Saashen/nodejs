const Joi = require('joi');

const validateUser = (req, res, next) => {
  const createUserRules = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = Joi.validate(req.body, createUserRules);
  if (result.error) {
    return res.status(400).send({
      body: req.body,
      message: `missing required ${result.error.details[0].context.key} field`,
    });
  }

  next();
};

module.exports = { validateUser };
