# TaskFlow

TaskFlow is a simple and modern task management web application built using **React** and **Vite**. The application helps users manage their daily tasks with an easy-to-use interface. Users can create, update, delete, and organize tasks while also viewing task statistics through a dashboard and analytics page.

## Features

* Create, edit and delete tasks
* Dashboard with task overview
* Analytics page
* Calendar view
* Task cards with status and priority
* Confirmation dialog before deleting a task
* Toast notifications
* Responsive sidebar navigation
* Task modal for adding and editing tasks

## Tech Stack

* React.js
* Vite
* JavaScript
* CSS

## Project Structure

```text
taskFlow
│
├── src
│   ├── components
│   │   ├── ConfirmDialog.js
│   │   ├── Header.js
│   │   ├── Sidebar.js
│   │   ├── TaskCard.js
│   │   ├── TaskModal.js
│   │   └── Toast.js
│   │
│   ├── views
│   │   ├── DashboardView.js
│   │   ├── TasksView.js
│   │   ├── AnalyticsView.js
│   │   ├── CalendarView.js
│   │   └── SettingsView.js
│   │
│   ├── main.js
│   ├── state.js
│   └── style.css
│
├── index.html
├── package.json
└── vite.config.js
```

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/taskflow.git
```

Go to the project folder

```bash
cd taskflow
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Runs the application in development mode.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Runs the production build locally.

## Screens

* Dashboard
* Tasks
* Analytics
* Calendar
* Settings

## Future Improvements

* User authentication
* Backend integration using Node.js and MongoDB
* Drag and drop tasks
* Dark mode
* Task reminders
* Search and filter improvements

## Author

**Rashmi Rahangdale**

Computer Engineering Student
