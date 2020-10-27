# TOUDO

Todou is a to do list app inspired by Todoist. This project was created with React, Context, Hooks and Firebase.

🚀 Check live version: [TOUDOU](https://toudo.netlify.app/)

### Desktop preview:

![Toudo gif demo](https://firebasestorage.googleapis.com/v0/b/todoist-clone-b8b9b.appspot.com/o/addTaskInProject.gif?alt=media&token=1cb077df-89bc-4f29-9a1f-3095ef1f3306 "Toudo gif demo")

### mobile preview:

![Toudo gif demo](https://firebasestorage.googleapis.com/v0/b/todoist-clone-b8b9b.appspot.com/o/createProject.gif?alt=media&token=b0e63b8e-902c-4ec0-9c79-85b053b2bfde "Toudo gif demo")
![Toudo gif demo](https://firebasestorage.googleapis.com/v0/b/todoist-clone-b8b9b.appspot.com/o/upcomingTasks.gif?alt=media&token=47db6ad6-5e4d-408b-8f17-0a2332825db9 "Toudo gif demo")

### Dependencies:

- Firebase
- React-router
- Moment.js
- Material-ui (core / icons / pickers)
- Deployed on Netlify

## ⚡ Features:

### 🧍‍♀️🧍‍♂️ Users

- User authentication with Firebase with forgot password email reset
- Tutorial on first login
- Persisting your tasks and projects using firebase firestore

### ✔ Tasks

- Adding a task (with option to set a due date, a priority and a project)
- Sorting tasks by date/priority
- Marking a task as completed
- Displaying your completed tasks with the option to restore/delete them
- Editing an existing task
- Commenting on a task
- Transfering a task to a different folder
- Duplicating a task
- Deleting a task
- Quick Add Task dialog from Navbar

### 📂 Projects

- Creating project folders
- Editing your existing project folders
- Deleting a project and associated tasks

### 🖥 Views

- An Inbox view where new tasks go by default if no other project is selected
- A Today view listing your tasks for the day (when a date was set and is matching the current date)
- An upcoming view listing all your tasks for the year to come
- A view for each of the projects you created
