const { SUBSCRIPTIONS } = require('../helpers/constants');

const firstUserSubscriptionValidate = (req, res, next) => {
  req.body && req.body.subscription
    ? next()
    : res.status(400).send({ message: 'Missing subscription field' });
};

const secondUserSubscriptionValidate = (req, res, next) => {
  const validSubscription = SUBSCRIPTIONS.find(
    subscription => subscription === req.body.subscription,
  );

  validSubscription
    ? next()
    : res
        .status(400)
        .send({ message: `Choose your subscription: ${SUBSCRIPTIONS.join(', ')}.` });
};

module.exports = {
  firstUserSubscriptionValidate,
  secondUserSubscriptionValidate,
};
