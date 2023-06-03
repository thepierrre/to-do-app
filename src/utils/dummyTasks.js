import { getRandomColor } from "./visualFunctions";
import { v4 as uuidv4 } from "uuid";

const DUMMY_TAG_1_ID = uuidv4();

export const DUMMY_TAGS = {
  DUMMY_TAG_1_ID: {
    id: DUMMY_TAG_1_ID,
    text: "Languages",
    color: getRandomColor(),
  },
};

export const DUMMY_TASKS = [
  {
    id: uuidv4(),
    text: "Learn Spanish",
    date: new Date("Jun 23, 2023"),
    tag: DUMMY_TAGS[DUMMY_TAG_1_ID],
    timestamp: new Date(),
    isDone: false,
  },
];
