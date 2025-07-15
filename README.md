# Link Saver + Auto-Summary

A full-stack bookmark manager built with SvelteKit (frontend), Node.js/Express (backend), and MongoDB. Paste any URL to save its title, favicon, and auto-generated summary via Jina AI.

## Features

* **User Authentication**: Sign-up, log-in, log-out using email & password, secured with bcrypt & JWT cookie.
* **Bookmark Management**: Add, list, and delete bookmarks.
* **Auto-Summary**: Fetch page HTML and generate a concise summary using Jina AI’s open endpoint.
* **Responsive UI**: Built with SvelteKit, Vite, and TailwindCSS for a fast, mobile-friendly experience.
* **CORS & Security**: Configured with strict CORS policies and HTTP-only cookies.

## Tech Stack

* **Frontend**

  * SvelteKit + Vite
  * TailwindCSS
* **Backend**

  * Node.js + Express
  * MongoDB (Mongoose)
  * bcrypt, JSON Web Token
* **Summary API**

  * Jina AI open endpoint

## Prerequisites

* Node.js v18+
* npm or yarn
* MongoDB instance (Atlas or local)
* Jina AI API key

## Project Setup

### Backend

1. Navigate to the backend folder:

   ```bash
   cd link-saver/backend
   ```
2. Copy `.env.example` to `.env` and set:

   ```env
   MONGO_URI=<your MongoDB URI>
   JWT_SECRET=<your JWT secret>
   JINA_API_URL=https://api.jina.ai/open-endpoint
   JINA_API_KEY=<your Jina AI key>
   PORT=4000
   ```
3. Install dependencies and start the server:

   ```bash
   npm install
   npm run dev
   ```

*Backend will run at `http://localhost:4000`.*

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd link-saver/frontend
   ```
2. Copy `.env` and set:

   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
3. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

*Frontend will run at `http://localhost:5173`.*

## Usage

1. **Sign Up**: Visit `/signup`, register with email & password.
2. **Log In**: Visit `/login`, authenticate to receive a JWT cookie.
3. **Save a Bookmark**: Paste any URL in the home page input and click **Save**.
4. **View & Delete**: See your list of bookmarks with titles, favicons, and summaries. Click **Delete** to remove.

## API Endpoints

| Route                | Method | Description                               |
| -------------------- | ------ | ----------------------------------------- |
| `/api/auth/signup`   | POST   | Create a new user                         |
| `/api/auth/login`    | POST   | Authenticate and set JWT cookie           |
| `/api/auth/logout`   | POST   | Clear authentication cookie               |
| `/api/bookmarks`     | GET    | Retrieve user’s bookmarks (requires auth) |
| `/api/bookmarks`     | POST   | Add a new bookmark with auto-summary      |
| `/api/bookmarks/:id` | DELETE | Delete a bookmark by ID (requires auth)   |

## Environment Variables

Both backend and frontend require `.env` files:

* **Backend** (`.env`):

  ```env
  MONGO_URI=
  JWT_SECRET=
  JINA_API_URL=
  JINA_API_KEY=
  PORT=
  ```

* **Frontend** (`.env`):

  ```env
  VITE_API_URL=
  ```

