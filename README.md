<h1 align="center">My To-do Lists - Time Organisation App</h1>

<p align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2666/2666505.png" alt="Logo" width="25%" height="25%">
</p>

<p align="center"><a href="https://all-my-todo-lists.netlify.app/">LINK TO THE PAGE</a></p>

<h2 align="center">Contents</h2>

- **Introduction**
- **Technology used**
- **Features**
- **Project Installation**

<h2 align="center">Introduction</h2>

This is my very first web application that I developed to practise my programming skills. The app allows the user to add new to-do lists Inside each list, you can add new tasks, remove and manage them. It uses a clean design and intuitive interface for easy and efficient task management.

<h2 align="center">Technology Used</h2>

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
- **Express.js**: Since this was my first project where I wanted to implement a backend, I resigned from initially saving the tasks in the local storage and went for storing the tasks permanently inside of a database, which was possible thanks to Express.js
- **MongoDB**: The database that I chose for the project is MongoDB. I additionally used the Mongoose library to interact with MongoDB on the backend.

<h2 align="center">Features</h2>

The app has a number of features that let the user modify the task even after it has already been added.

### Add a new list

The mainpage includes the list view. From there, you can add a new to-do list. You can delete a list any time, or edit its name by clicking on the pencil icon on the left, which opens a modal view. When you click on the list name in the mainpage view, you are redirected to the tasks associated with that list.

### Add a new task

The top part of the page includes an input field for a new task.

Here, the user can click on a calendar icon to select a specific date for the task completion. The date can lie either in the future or in the past (the latter connects to how a task is displated in the list, see the following section). Apart from the task text, a user can also choose a tag for easier orientation.

### Task management

#### Done

Starting from the left, the user can click on a tick icon to mark the task as done. When the task is done, the field with the task text automatically
becomes striked through to give the user a quick orientation of which of the tasks have been finished, whereas the tick icon on the left changes its colour from grey to blue.

#### Task text

In this field, the user sees the task text that they previously typed in the task input. At this point, the user can also edit the task by clicking
on the text field.

#### Due date

This field contains the task's due date. If the date hasn't been chosen, the user sees the "no date" caption. They can also click on the date
and edit it freely. If the task's due date lies in the past, the user sees a red exclamation mark next to it to draw their attention.

#### Tag

Similarly to date, if the tag field is empty, the caption "no tag" is displayed. It can also be edited at any point by clicking on it.

#### Bin

The last field in the task bar, the bin, lets the user delete the task. This action cannot be reversed.

### Filtering

The users can also filter the tasks using four different filters displayed just above the task list:

- **Sort by done:** The tasks can be sorted by displaying the asks that still have to be done first or by showing the done ones first.

- **Sort by task text:** The tasks can be sorted alphabetically in ascending (starting from A) or descending (starting from Z) order.

- **Sort by date:** The tasks can be sorted by ascending (starting from the oldest) or descending (starting from the latest) date.

- **Sort by tags:** Just like with sorting by task text, the tasks can be also sorted alphabetically by tags in ascending or descending order.

<h2 align="center">Project Installation</h2>

To install the project, enter _/frontend_ and _/backend_, and run _npm install_ in each of the directories.
