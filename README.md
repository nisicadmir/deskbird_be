# Task Deskbird

Deployed on render.com
First time when you do the login it can last for up to 1 minute.
Site can be accessed on link: https://deskbird-fe.onrender.com

email: admir.nisic@outlook.com
password: 123456

## Features

- User authentication and authorization using JWT.
- Role-based access control (Admin and User roles).
- CRUD operations for user management (Create, Read, Update, Delete).
- Responsive user interface with Angular and PrimeNG components.
- Backend API with NestJS and TypeORM for database interactions.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 16.x or higher)
- npm (version 8.x or higher)
- PostgreSQL (for the backend database)
- Docker (optional, for containerized deployment)
- Angular CLI (for frontend development)

## Installation

### Backend Setup (NestJS)

1. Navigate to the backend directory:
   ```bash
   cd task_deskbird_be
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `task_deskbird_be` directory with the following content (adjust values as needed):
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/task_deskbird
     JWT_SECRET=your_jwt_secret_key
     ```
4. Run database migrations (ensure PostgreSQL is running):

- Application should be started before running the seed method to init the database.

```bash
npm run start
```

- Create one user manually with seeder
  ```bash
  npm run seed
  ```

### Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd task_deskbird_fe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Backend (NestJS)

1. From the `task_deskbird_be` directory, start the server:

   ```bash
   npm run start
   ```

   - The backend will run on `http://localhost:3000` by default.

### Frontend (Angular)

1. From the `task_deskbird_fe` directory, start the development server:

   ```bash
   npm run start
   ```

   - The frontend will run on `http://localhost:4200` by default and will proxy requests to the backend.

### Using Docker (Optional)

If you prefer to run the application in containers:

1. Ensure Docker and Docker Compose are installed.
2. From the root directory (where `docker-compose.yml` is located), run:

   ```bash
   docker-compose up --build
   ```

   - This will build and start both backend and frontend services, along with a PostgreSQL database if configured in the `docker-compose.yml`.

## Usage

1. **Access the Application**:
   - Open your browser and navigate to `http://localhost:4200`.
   - If you are not logged in, you will be redirected to the sign-in page.

2. **Sign In**:
   - Use the credentials of an existing user. If the database is seeded, you can use:
     - Email: `admir.nisic@outlook.com`
     - Password: `123456`
   - Upon successful login, you will be redirected to the user list page.

3. **User Management (Admin Only)**:
   - If logged in as an Admin, you will see options to:
     - **Create User**: Click the "Create User" button to open a dialog where you can enter user details (email, full name, password, role).
     - **Edit User**: Click the "Edit" button next to a user to modify their full name or role.
     - **Delete User**: Click the "Delete" button next to a user to remove them (admins cannot delete themselves).
   - Non-admin users will only see the user list without action buttons.

4. **Logout**:
   - Click the "Logout" button in the top-right corner to end your session and return to the sign-in page.

## Role-Based Access Control

- **Admin Role**: Full access to create, edit, and delete users.
- **User Role**: Can only view the user list without modification capabilities.
- The application uses a custom `isAdmin` pipe to conditionally display action buttons based on the logged-in user's role.
