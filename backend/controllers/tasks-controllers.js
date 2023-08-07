const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const Task = require("../models/task");
const List = require("../models/list");
const HttpError = require("../models/http-error");

// let DUMMY_TASKS = [
//   {
//     id: uuidv4(),
//     text: "Learn German",
//     date: new Date("Aug 20, 2023"),
//     tag: null,
//     timestamp: new Date(),
//     isDone: false,
//     listId: "d86c4aa7-8044-46f5-964d-cfec60ead03f",
//   },
//   {
//     id: uuidv4(),
//     text: "Go hiking",
//     date: new Date("Jun 23, 2023"),
//     tag: "Sports",
//     timestamp: new Date(),
//     isDone: false,
//     listId: "d86c4aa7-8044-46f5-964d-cfec60ead03f",
//   },
//   {
//     id: uuidv4(),
//     text: "Go to the gym",
//     date: null,
//     tag: "Others",
//     timestamp: new Date(),
//     isDone: false,
//     listId: "d86c4aa7-8044-46f5-964d-cfec60ead03f",
//   },
// ];

const getTasksByListId = async (req, res, next) => {
  const listId = req.params.listId;

  let listWithTasks;
  try {
    listWithTasks = await List.findById(listId).populate("tasks");
  } catch (err) {
    const error = new HttpError(
      "Fetching tasks failed. Please try again.",
      500
    );
    return next(error);
  }

  if (!listWithTasks) {
    return next(
      new HttpError("Could not find tasks for the provided list ID.", 404)
    );
  }

  res.json({ listWithTasks: listWithTasks.toObject() });
};

const createTask = async (req, res, next) => {
  const { text, tag, date } = req.body;
  const listId = req.params.listId;
  const owningList = await List.findById(listId);

  const createdTask = new Task({
    text,
    tag: tag || undefined,
    date: date || undefined,
    timestamp: new Date(),
    isDone: false,
    owningList,
  });

  let list;
  try {
    list = await List.findById(owningList);
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdTask.save({ session: session });
    list.tasks.push(createdTask);
    await list.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Could not create a new task. Please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ task: createdTask });
};

const editTask = async (req, res, next) => {
  const { text, tag, date, isDone } = req.body;
  const taskId = req.params.taskId;

  let task;
  try {
    task = await Task.findById(taskId).populate("owningList");
  } catch (err) {
    const error = new HttpError(
      "Could not edit the task. Please try again.",
      500
    );
    return next(error);
  }

  if (!task) {
    const error = new HttpError("Could not find a task for this ID", 500);
    return next(error);
  }

  const filter = { _id: taskId };
  const update = { text, tag, date, isDone };

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Task.findOneAndUpdate(filter, update).session(session);
    await task.owningList.save();
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Could not edit the task. Please try again.",
      500
    );
    console.log(err);
    return next(error);
  }
  task = await Task.findById(taskId);

  res.status(200).json({
    task,
  });
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;

  let task;
  try {
    task = await Task.findById(taskId).populate("owningList");
  } catch (err) {
    const error = new HttpError(
      "Could not delete the task. Please try again.",
      500
    );
    return next(error);
  }

  if (!task) {
    const error = new HttpError("Could not find a task for this ID.", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Task.deleteOne({ _id: taskId }).session(session);
    task.owningList.tasks.pull(task); // "pull" automatically removes the ID
    await task.owningList.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Could not delete the task. Please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "The task has been deleted." });
};

module.exports = {
  getTasksByListId,
  createTask,
  editTask,
  deleteTask,
};

// by grouping operations in a session, you ensure that either all operations succeed or none of them are applied
// so in CreateTask, the session ensures that both saving createdPlace and updating the list document should happen together
// if you apply changes individually (without sessions), some changes could be applied and others not
