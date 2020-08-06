const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      res.status(401).send({ message: 'Not authorized' });
    }

    const [_, token] = req.headers['authorization']
      ? req.headers['authorization'].split(' ')
      : null;
    const { id } = jwt.decode(token, process.env.SECRET_WORD);
    req.user = id;

    next();
  })(req, res, next);
};

module.exports = { isAuth };
