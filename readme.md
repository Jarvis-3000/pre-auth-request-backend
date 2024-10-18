# Healthcare Provider Dashboard Backend

This project is the backend for a healthcare provider management system where providers can manage patient data and request pre-authorization for treatments. The backend includes user authentication, patient data management, and pre-authorization request handling.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** (JSON Web Tokens) for authentication
- **bcrypt** for password hashing
- **dotenv** For managing environment variables
- **CORS** for handling cross-origin requests
- **morgan** For logging HTTP requests


## Features

- **Healthcare provider account creation**: Providers can create accounts and log in using JWT-based authentication.
- **Add patients**: Providers can add patient details, including medical history and treatment plans.
- **Manage pre-authorization requests**: Providers can request pre-authorization for treatments.
- **JWT-based authentication**: Supports secure signup and signin functionality.
- **Patient and provider linking**: Patients are linked to healthcare providers for better management of data.

## API Routes

- **POST /api/auth/signup:** Sign up a new healthcare provider.
- **POST /api/auth/signin:** Sign in an existing healthcare provider.
- **POST /api/patients:** Add a new patient to the provider database.
- **GET /api/patients:** Get all patients for a specific provider.
- **POST /api/pre-auth-requests:** Request pre-authorization for a treatment.


## Local Setup

1. Clone the repository:
2. npm install
3. create mongodb account and cluster
4. use the mongo_uri in the backend
5. run the server using script **npm run dev**
6. Connect frontend to the backend

