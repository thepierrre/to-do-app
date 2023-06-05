# To do app

Click here to visit the app deployed on Netlify.

##Contents

- **Introduction**
- **Technology used**
- **Features**
- **Further plans**

## Introduction

This is a simple to-do app that I've developed to practise my programming skills. The app allows the user to add new tasks, remove and manage them.
It uses a clean design and intuitive interface for easy and efficient task management.

## Technology used

This to-do app was build by using modern web technologies and libraries, ensuring a smooth user experience. Here are the key technologies and libraries
used in its development:

- **React.js:** The app was developed by using React, a JavaScript library. Thanks to React's component architecture, the different parts of the app
  were written as separate modules for more efficient future management.
- **CSS:** Cascading Style Sheets were used to create a modern look and visually appealing user interfaces. Most of the elements were created by
  using custom styles.

- **Material UI**: The Material UI library, thanks to its wide range of pre-built components, was used for styling chosen components
  and providing consistent design.

- **DayPicker**: In order to incorporate a calendar feature for scheduling tasks, the DayPicker React library was implemented,
  enabling the user to pick the day quickly and intuitively.

## Features

The app has a number of features that let the user modify the task even after it has already been added.

### Add a new task

The top part of the app includes an input field for a new task. At this point, the user can click on a calendar icon to select
a specific date for the task completion. The date can lie either in the future or in the past (the latter connects to how a task is
displated in the list, see the following section). Apart from the task text, a user can also choose a tag in order to group together
tasks from the same category.

### Task management

#### Done

Starting from the left, the user can click on a tick icon to mark the task as done. When the task is done, the field with the task text automatically
becomes striked through to give the user a quick orientation of which of the tasks have been finished.

#### Task text

In this field, the user sees the task text that they previously typed in the task input. At this point, the user can also edit the task by clicking
on the text field.

#### Due date

This field contains the task's due date. If the date hasn't been chosen, the user sees the "no date" caption. They can also click on the date
and edit it freely. If the task's due date lies in the past, the user sees a red exclamation mark next to it to draw their attention.

#### Tag

Similarly to date, if the tag field is empty, the caption "no tag" is displayed. It can also be edited at any point by clicking on it.
For better orientation, the same tags have the same background pastel color randomly generated each time a new tag is added.

#### Bin

The last field in the task bar, the bin, lets the user delete the task. This action cannot be reversed.

### Filtering

The users can also filter the tasks using four different filters displayed just above the task list:

- **Sort by done:** The tasks can be sorted by displaying the asks that still have to be done first or by showing the done ones first.

- **Sort by task text:**The tasks can be sorted alphabetically in ascending (starting from A) or descending (starting from Z) order.

- **Sort by date:**The tasks can be sorted by ascending (starting from the oldest) or descending (starting from the latest) date.

- **Sort by tags:**Just like with sorting by task text, the tasks can be also sorted alphabetically by tags in ascending or descending order.

## Further plans

### Back-end

For now, the app only uses a front end, with tasks being saved in the local storage (and with several dummy tasks pre-populating the list
upon the first visit for app demonstration purposes). In order to make the app more realistic, though, I'm planning to add a back-end written
in Express.js and use a database (preferably MongoDB or PostgreSQL).

### Adding different lists

In the current state, the app gives the user the possibility to add tasks to a single list. However, I would like to give them
the possibility to add their own lists for better management of tasks and using the app on a bigger scale.
The individual tasks list will be displayed in a bar on the left that can be dynamically displayed and hidden by clicking on a button next to
the list's title (currently hardcoded as "My tasks").
