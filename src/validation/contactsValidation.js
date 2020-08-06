const Joi = require('joi');

const validateCreateUser = (req, res, next) => {
  const createUserRules = Joi.object({
    subscription: Joi.string(),
    token: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
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

const validateUpdateUser = (req, res, next) => {
  req.body && (req.body.name || req.body.email || req.body.phone)
    ? next()
    : res.status(400).send({ message: 'missing fields' });
};

module.exports = { validateCreateUser, validateUpdateUser };
