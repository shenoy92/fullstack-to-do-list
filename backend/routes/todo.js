const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Todo, validate} = require('../models/todo');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.send(todos);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({ meta: { message: error.details[0].message, code: 400 }});

  let todo = new Todo({ todoItem: req.body.todoItem, user: req.user._id });
  todo = await todo.save();

  const todos = await Todo.find({ user: req.user._id });
  res.send(todos);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send({ meta: { message: error.details[0].message, code: 400 }});

  const todo = await Todo.findByIdAndUpdate(req.params.id, { todoItem: req.body.todoItem }, {
    new: true
  });

  if (!todo) return res.status(404).send('The todo item with the given ID was not found.');
  
  const todos = await Todo.find({ user: req.user._id });
  res.send(todos);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);

  if (!todo) return res.status(404).send('The  todo item with the given ID was not found.');

  const todos = await Todo.find({ user: req.user._id });
  res.send(todos);
});

// router.get('/:id', validateObjectId, async (req, res) => {
//   const todo = await Todo.findById(req.params.id);

//   if (!todo) return res.status(404).send('The  todo item with the given ID was not found.');

//   res.send(todo);
// });

module.exports = router;