# Netflix Clone - Social Media Backend

This project is a backend API for a social media platform, inspired by Instagram, built with Node.js, Express, and MongoDB. It supports user authentication, posting, messaging, likes, stories, comments, notifications, and more.

## Features

- **User Authentication:** Register, login, and logout with JWT-based authentication.
- **Posts:** Create, fetch, and delete posts with media, captions, tags, and location.
- **Comments:** Add comments and replies to posts.
- **Likes:** Like and unlike posts.
- **Stories:** Add and fetch user stories (image/video, auto-expiring).
- **Messages:** Send and retrieve messages in chats.
- **Notifications:** Receive notifications for likes, comments, follows, stories, and messages.
- **Follow System:** Follow and unfollow users, view followers and following lists.
- **Middleware:** `authMiddleware` to protect routes and authenticate users.
- **Middleware:** `uploadMiddleware` Middleware function to filter uploaded files by type (jpeg, jpg, png, gif) and video (mp4, mov, avi) files.

## Project Structure

```
server/
├── db/
│   └── db.js
├── controllers/
│   ├── comment.controller.js
│   ├── follow.controller.js
│   ├── notification.controller.js
│   ├── post.controller.js
│   ├── story.controller.js
│   |── user.controller.js
│   |── like.controller.js
│   └── message.controller.js
├── models/
│   ├── comment.model.js
│   ├── like.model.js
│   ├── message.model.js
│   ├── notification.model.js
│   ├── post.model.js
│   ├── story.model.js
│   └── user.model.js
├── routes/
│   ├── like.routes.js
│   ├── comment.routes.js
│   ├── follow.routes.js
│   ├── message.routes.js
│   ├── notification.routes.js
│   ├── post.routes.js
│   ├── story.routes.js
│   └── user.routes.js
├── middlewares/
│   ├── auth.middleware.js
│   └── upload.middleware.js
├── utils/
│   ├── email.js
│   ├── cloudinary.js
├── app.js
└── package.json
```

## API Endpoints

All endpoints are prefixed with `/api/v1/`.

### Users

- `POST /users/register` — Register a new user
- `POST /users/login` — Log in a user
- `GET /users/profile/:id` — Get user profile
  ├── app.js
  └── package.json

```

## API Endpoints

All endpoints are prefixed with `/api/v1/`.

### Users

- `POST /users/register` — Register a new user
- `POST /users/login` — Log in a user
- `GET /users/profile/:id` — Get user profile by ID
├── utils/
│   ├── auth.js
│   ├── cloudinary.js
│   ├── notification.js
│   └── response.js
├── app.js
└── package.json
```

## API Endpoints

All endpoints are prefixed with `/api/v1/`.

### Users

- `POST /users/register` — Register a new user
- `POST /users/login` — Login
- `GET /users/logout` — Logout

### Posts

- `POST /posts/create-post` — Create a post (auth required)
- `GET /posts/get-feed-post` — Get feed posts (auth required)
- `GET /posts/get-post/:id` — Get post by ID (auth required)
- `DELETE /posts/delete-post/:id` — Delete post (auth required)

### Comments

- `POST /comments/:postId/add-comment` — Add comment to post (auth required)
- `GET /comments/:postId/get-all-comments` — Get all comments for a post (auth required)
- `POST /comments/:commentId/reply` — Reply to a comment (auth required)

### Likes

- `PUT /likes/:postId/toggle-like` — Like/unlike a post (auth required)

### Stories

- `POST /stories/add-story` — Add a story (auth required)
- `GET /stories/get-stories` — Get stories (auth required)

### Messages

- `POST /messages/send-message` — Send a message (auth required)
- `GET /messages/get-messages/:chatId` — Get messages in a chat (auth required)

### Notifications

- `POST /notifications/send-notification` — Send notification (auth required)
- `GET /notifications/get-notifications` — Get notifications (auth required)
- `PUT /notifications/send-notification/read/:id` — Mark notification as read (auth required)
- `DELETE /notifications/delete-notification/:id` — Delete notification (auth required)

### Follows

- `PUT /follows/toggle-follow` — Follow/unfollow a user (auth required)
- `GET /follows/followers` — Get followers (auth required)
- `GET /follows/following` — Get following (auth required)

### Middleware

- `authMiddleware`: Protects routes by verifying JWT tokens.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/netflix-clone.git
   cd netflix-clone/server
   ```
1. Clone the repository.
1. Install dependencies: `npm install`.
1. Set up environment variables: `cp .env.example .env` and fill in the required values.
1. Start the server: `npm start`.
