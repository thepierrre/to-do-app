const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const List = require("../models/list");
const Task = require("../models/task");
const HttpError = require("../models/http-error");

const getLists = async (req, res, next) => {
  let lists;
  try {
    lists = await List.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching lists failed. Please try again.",
      500
    );
    return next(error);
  }
  //without "return next(error)", the next line would be executed. but with this line, the error is passed to error-handling middleware
  // enabling it to handle the error appropriately

  res.json({ lists: lists.map((list) => list.toObject()) });
};

const createList = async (req, res, next) => {
  const { name } = req.body;

  const createdList = new List({
    name,
  });

  try {
    await createdList.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create a list. Please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ list: createdList.toObject() });
};

const editListName = async (req, res, next) => {
  const { name } = req.body;
  const listId = req.params.listId;

  let list;
  try {
    list = await List.findById(listId);
  } catch (err) {
    const error = new HttpError(
      "Could not edit the list's name. Please try again.",
      500
    );
    return next(error);
  }

  list.name = name;

  try {
    await list.save();
  } catch (err) {
    const error = new HttpError(
      "Could not edit the list's name. Please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ list: list.toObject() });
};

const deleteList = async (req, res, next) => {
  const listId = req.params.listId;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await List.deleteOne({ _id: listId });
    await Task.deleteMany({ owningList: listId }).session(session);
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Could not delete the list. Please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "The list has been deleted." });
};

module.exports = {
  getLists,
  createList,
  deleteList,
  editListName,
};

// const session = await mongoose.startSession();
// session.startTransaction();
// await Task.deleteOne({ _id: taskId }).session(session);
// task.owningList.tasks.pull(task); // "pull" automatically removes the ID
// await task.owningList.save({ session: session });
// await session.commitTransaction();
