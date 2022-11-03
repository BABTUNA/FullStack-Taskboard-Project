# Task board requirements

## User accounts

- A visitor can register with a name, email, and password.
- A returning user can sign in and restore a session.
- Authenticated users can view their own profile.

## Tasks

- Create tasks with a title, description, status, priority, and optional due date.
- List only tasks owned by the current user.
- Edit, delete, filter, paginate, and move tasks between statuses.
- Reject attempts to read or modify another user's tasks.

## Board

The client shows three columns: To Do, In Progress, and Done. Forms support
keyboard navigation, show validation errors, and retain useful input after a
failed request.

## Delivery

- PostgreSQL stores users and tasks.
- Express exposes a JSON API secured with JWT bearer tokens.
- React owns client routing and authentication state.
- Containers provide a repeatable client/server/database environment.
- Automated checks cover registration, login, task CRUD, and core client flows.
