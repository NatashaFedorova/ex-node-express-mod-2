const { Schema, Types, model } = require('mongoose');

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 30,
    },
    desc: {
      type: String,
      maxLength: 400,
    },
    due: {
      type: Date,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'Users',
      required: [true, 'Todo must have an owner'],
    },
  },
  {
    timestamps: true,
  }
);

// timestamps: true add createdAt and updatedAt

const Todo = model('Todos', todoSchema);

module.exports = Todo;
