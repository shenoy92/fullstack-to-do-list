const Joi = require('joi');
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todoItem: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 225
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Todo = mongoose.model('Todo', todoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    todoItem: Joi.string().min(1).max(225).required()
  });

  return schema.validate(todo);
}

exports.todoSchema = todoSchema;
exports.Todo = Todo; 
exports.validate = validateTodo;