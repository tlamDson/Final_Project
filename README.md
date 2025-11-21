# QuickBlog — Project Description

QuickBlog is a simple blogging web application that lets users create, view, and interact with posts. It was built as a learning project to demonstrate a full-stack workflow using a React frontend and an Express/Node backend.

Key features

- Create posts with title, subtitle, rich content and optional image uploads
- View a home feed with paginated posts and sorting/search by title
- Individual post pages showing full content, comments, and upvotes
- Admin panel (pseudo-auth) for managing posts and comments
- Image uploads handled via ImageKit and server-side processing
- Basic pseudo-authentication for editing/deleting posts

Tech stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)
- Image storage: ImageKit

Repository layout

- `client/` — React application (Vite)
- `server/` — Express API (Node)

Run locally (short)

1. Install dependencies

```bash
# server
cd server && npm install

# client
cd ../client && npm install
```

2. Start both apps (two terminals)

```bash
# from server/
npm run dev

# from client/
npm run dev
```

Notes

- Do not commit secrets. Remove `server/.env` from the repository and add it to `.gitignore` if present. Rotate any keys that were accidentally published.
- The frontend should be deployed separately from the backend; set the frontend build root to `client` on your hosting provider (Vercel/Netlify) and deploy the `server` on a Node-compatible host (Render, Railway, Heroku, Vercel serverless).

Author

- Lam Pham

License

- See the `LICENSE` file in this repository (if present).

Screenshots / Video

Add screenshots or a walkthrough GIF here to showcase the app.
