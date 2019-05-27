import { User } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, 'secretKey', {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        message: 'This e-mail account is already in use'
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return res.status(403).send({
          error: 'username is incorrect'
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(403).send({
          error: password
        });
      }
      const userJson = user.toJSON();
      res.send({ user: userJson, token: jwtSignUser(userJson), msg: 'succes' });
    } catch (err) {
      res.status(500).send({
        error: err
      });
    }
  }
};
