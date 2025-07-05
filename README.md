# Streaming App Backend

This is the backend for a streaming application built with Node.js, Express, MongoDB, and Cloudinary.

## Features

- User registration with avatar and cover image upload
- User login with JWT authentication (access & refresh tokens)
- Secure password hashing
- File uploads using Multer
- Image hosting on Cloudinary
- CORS and cookie management
- Modular route and controller structure

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (file uploads)
- Cloudinary (image hosting)
- JWT (authentication)
- dotenv (environment variables)
- cookie-parser
- cors

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/streaming-app-backend.git
cd streaming-app-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

```bash
npm run dev
```

## API Endpoints

### User

- `POST /api/v1/users/register`  
  Register a new user (use `form-data` for avatar and cover image).

- `POST /api/v1/users/login`  
  Login with email/username and password (use JSON body).

## Folder Structure

```
src/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  db/
  App.js
  ...
public/
README.md
.env
```

## Notes

- For registration, use `form-data` in Postman (fields: `username`, `email`, `fullname`, `password`, `avatar`, `cover`).
- For login, use `raw` JSON in Postman (fields: `email` or `username`, `password`).
- Make sure your Cloudinary and MongoDB credentials are correct.


## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (file uploads)
- Cloudinary (image hosting)
- JWT (authentication)
- dotenv (environment variables)
- cookie-parser
- cors

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/streaming-app-backend.git
cd streaming-app-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

```bash
npm run dev
```

## API Endpoints

### User

- `POST /api/v1/users/register`  
  Register a new user (use `form-data` for avatar and cover image).

- `POST /api/v1/users/login`  
  Login with email/username and password (use JSON body).

## Folder Structure

```
src/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  db/
  App.js
  ...
public/
README.md
.env
```

## Notes

- For registration, use `form-data` in Postman (fields: `username`, `email`, `fullname`, `password`, `avatar`, `cover`).
- For login, use `raw` JSON in Postman (fields: `email` or `username`, `password`).
- Make sure your Cloudinary and MongoDB credentials are correct.

## License

MIT
