const express = require("express");

const tasksControllers = require("../controllers/tasks-controllers");

const router = express.Router();

router.get("/:listId", tasksControllers.getTasksByListId);

router.post("/:listId", tasksControllers.createTask);

router.patch("/tasks/:taskId", tasksControllers.editTask);

router.delete("/tasks/:taskId", tasksControllers.deleteTask);

module.exports = router;
