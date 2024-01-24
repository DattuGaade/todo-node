var express = require("express");
var router = express.Router();

const ToDos = require("../models/todos");

// Get todos list
router.get("/", async (req, res, next) => {
  try {
    const todos = await ToDos.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved",
      data: todos && todos.length ? todos : [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: null,
    });
  }
});

// Create Todo
router.post("/", async (req, res, next) => {
  try {
    const { title, description, date } = req.body;
    if(!title) {
       res.status(400).json({
         success: false,
         message: "Title is required",
         data: null,
       });
    }
    const todo = new ToDos({ title, description, date });
    const newTodo = await todo.save();
    res.status(201).json({
      success: true,
      message: "Todo Created",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: null,
    });
  }
});

// Create Todo
router.delete("/:todoId", async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const result = await ToDos.deleteOne({ _id: todoId });
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message ?? "Internal server error",
      data: null,
    });
  }
});

module.exports = router;
