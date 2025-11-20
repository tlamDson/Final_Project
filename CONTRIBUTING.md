# Contributing to QuickBlog

Thank you for your interest in contributing to QuickBlog! This document will guide you through setting up the project locally.

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) (if running a local database)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "QuickBlog Practises"
```

### 2. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

#### Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   # On Windows Command Prompt: copy .env.example .env
   # On PowerShell: Copy-Item .env.example .env
   ```

2. Open `.env` and update the values:
   - `JWT_SECRET`: Set a secure secret key for JWT.
   - `IMAGEKIT_URL_ENDPOINT`: Your ImageKit URL endpoint (if using ImageKit).
   - `MONGO_URI`: Your MongoDB connection string (if not using default localhost).

#### Run the Server

```bash
npm run server
# or
npm start
```
The server will start on the default port (usually 3000 or as defined).

### 3. Client Setup

Open a new terminal, navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

#### Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   # On Windows Command Prompt: copy .env.example .env
   # On PowerShell: Copy-Item .env.example .env
   ```

2. Open `.env` and update the values:
   - `VITE_BASE_URL`: The URL where your server is running (e.g., `http://localhost:3000`).

#### Run the Client

```bash
npm run dev
```
The client will start (usually at `http://localhost:5173`).

## Project Structure

- `client/`: React frontend (Vite)
- `server/`: Node.js/Express backend

## Common Issues

- **CORS Errors**: Ensure `VITE_BASE_URL` in client matches the server URL.
- **Database Connection**: Ensure MongoDB is running locally or your `MONGO_URI` is correct.

Happy Coding!
