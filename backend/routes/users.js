const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({ meta: { message: error.details[0].message, code: 400 }});

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ meta: { message: 'User already registered', code: 400 }});

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    id: user._id,
    name: user.name,
    email: user.email,
    authToken: token
  });
});

module.exports = router; 
