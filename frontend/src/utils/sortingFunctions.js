export const DONE_SORT = "DONE";
export const TEXT_SORT = "TEXT";
export const TAG_SORT = "TAG";
export const DATE_SORT = "DATE";
export const DESC_SORT = "DESC";
export const ASC_SORT = "ASC";
export const TIMESTAMP_SORT = "TIMESTAMP";

export const DEFAULT_SORT = {
  feature: TIMESTAMP_SORT,
  direction: undefined,
};

export const sortByTimestamp = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.timestamp > b.timestamp) {
      return -1;
    } else if (a.timestamp < b.timestamp) {
      return 1;
    } else {
      return 0;
    }
  });
};

const sortByDoneAsc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.isDone && !b.isDone) {
      return 1;
    } else if (!a.isDone && b.isDone) {
      return -1;
    } else {
      return 0;
    }
  });
};

const sortByDoneDesc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.isDone && !b.isDone) {
      return -1;
    } else if (!a.isDone && b.isDone) {
      return 1;
    } else {
      return 0;
    }
  });
};

const sortByTextAsc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.text < b.text) {
      return -1;
    } else if (a.text > b.text) {
      return 1;
    } else {
      return 0;
    }
  });
};

const sortByTextDesc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.text < b.text) {
      return 1;
    } else if (a.text > b.text) {
      return -1;
    } else {
      return 0;
    }
  });
};

const sortByDateAsc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.date !== undefined && b.date === undefined) {
      return -1;
    } else if (a.date === undefined && b.date !== undefined) {
      return 1;
    } else if (a.date === undefined && b.date === undefined) {
      return 0;
    } else if (new Date(a.date) < new Date(b.date)) {
      return -1;
    } else if (new Date(a.date) > new Date(b.date)) {
      return 1;
    } else {
      return 0;
    }
  });
};

const sortByDateDesc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.date !== undefined && b.date === undefined) {
      return -1;
    } else if (a.date === undefined && b.date !== undefined) {
      return 1;
    } else if (a.date === undefined && b.date === undefined) {
      return 0;
    } else if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else if (new Date(a.date) > new Date(b.date)) {
      return -1;
    } else {
      return 0;
    }
  });
};

const sortByTagAsc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.tag < b.tag) {
      return -1;
    } else if (a.tag > b.tag) {
      return 1;
    } else {
      return 0;
    }
  });
};

const sortByTagDesc = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (a.tag < b.tag) {
      return 1;
    } else if (a.tag > b.tag) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getSortedTasks = (tasks, sortedBy) => {
  if (sortedBy.feature === TIMESTAMP_SORT) {
    return sortByTimestamp(tasks);
  } else if (
    sortedBy.feature === DONE_SORT &&
    sortedBy.direction === ASC_SORT
  ) {
    return sortByDoneAsc(tasks);
  } else if (
    sortedBy.feature === DONE_SORT &&
    sortedBy.direction === DESC_SORT
  ) {
    return sortByDoneDesc(tasks);
  } else if (
    sortedBy.feature === TEXT_SORT &&
    sortedBy.direction === ASC_SORT
  ) {
    return sortByTextAsc(tasks);
  } else if (
    sortedBy.feature === TEXT_SORT &&
    sortedBy.direction === DESC_SORT
  ) {
    return sortByTextDesc(tasks);
  } else if (
    sortedBy.feature === DATE_SORT &&
    sortedBy.direction === ASC_SORT
  ) {
    return sortByDateAsc(tasks);
  } else if (
    sortedBy.feature === DATE_SORT &&
    sortedBy.direction === DESC_SORT
  ) {
    return sortByDateDesc(tasks);
  } else if (sortedBy.feature === TAG_SORT && sortedBy.direction === ASC_SORT) {
    return sortByTagAsc(tasks);
  } else if (
    sortedBy.feature === TAG_SORT &&
    sortedBy.direction === DESC_SORT
  ) {
    return sortByTagDesc(tasks);
  }
};
