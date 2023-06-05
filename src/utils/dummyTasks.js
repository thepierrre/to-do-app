import { getRandomColor } from "./visualFunctions";
import { v4 as uuidv4 } from "uuid";

const DUMMY_TAG_1_ID = uuidv4();
const DUMMY_TAG_2_ID = uuidv4();
const DUMMY_TAG_3_ID = uuidv4();
const DUMMY_TAG_4_ID = uuidv4();

export const DUMMY_TAGS = {
  [DUMMY_TAG_1_ID]: {
    id: DUMMY_TAG_1_ID,
    text: "Languages",
    color: getRandomColor(),
  },
  [DUMMY_TAG_2_ID]: {
    id: DUMMY_TAG_2_ID,
    text: "Sports",
    color: getRandomColor(),
  },
  [DUMMY_TAG_3_ID]: {
    id: DUMMY_TAG_3_ID,
    text: "Others",
    color: getRandomColor(),
  },
  [DUMMY_TAG_4_ID]: {
    id: DUMMY_TAG_4_ID,
    text: "Cooking",
    color: getRandomColor(),
  },
};

export const DUMMY_TASKS = [
  {
    id: uuidv4(),
    text: "Learn Spanish for 20 mins",
    date: new Date("Jul 3, 2023"),
    tag: DUMMY_TAGS[DUMMY_TAG_1_ID],
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
    tag: DUMMY_TAGS[DUMMY_TAG_1_ID],
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Clean the apartment",
    date: null,
    tag: DUMMY_TAGS[DUMMY_TAG_3_ID],
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
    tag: DUMMY_TAGS[DUMMY_TAG_2_ID],
    timestamp: new Date(),
    isDone: false,
  },
  {
    id: uuidv4(),
    text: "Bake a chocolate cake",
    date: new Date("Jul 30, 2023"),
    tag: DUMMY_TAGS[DUMMY_TAG_4_ID],
    timestamp: new Date(),
    isDone: false,
  },
];
