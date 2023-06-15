const express = require("express");
const { check } = require("express-validator");

const listsControllers = require("../controllers/lists-controllers");

const router = express.Router();

router.get("/", listsControllers.getLists);

router.post("/", check("name").not().isEmpty(), listsControllers.createList);

router.patch("/:listId", listsControllers.editListName);

router.delete("/:listId", listsControllers.deleteList);

module.exports = router;
