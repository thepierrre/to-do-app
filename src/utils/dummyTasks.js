import { v4 as uuidv4 } from "uuid";

export const DUMMY_TASKS = [
  {
    id: uuidv4(),
    text: "Learn Spanish for 20 mins",
    date: new Date("Jul 3, 2023"),
    tag: "Languages",
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Do the shopping",
    date: new Date("Aug 20, 2023"),
    tag: null,
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Go hiking",
    date: new Date("Jun 23, 2023"),
    tag: "Sports",
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Clean the apartment",
    date: null,
    tag: "Others",
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Go out with friends",
    date: null,
    tag: null,
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Go jogging",
    date: new Date("Apr 28, 2023"),
    tag: "Sports",
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Bake a chocolate cake",
    date: new Date("Jul 30, 2023"),
    tag: "Cooking",
    timestamp: new Date(),
    isDone: false,
  },
];

export const DUMMY_TAGS = ["Sports", "Others", "Cooking"];
