# Skypoint Social Frontend

A modern social networking frontend built with React, Redux Toolkit, Material UI, and Tailwind CSS.

## Features

- Google OAuth login
- Create, view, and comment on posts
- Upvote/downvote posts
- Follow/unfollow users
- Responsive UI with Material UI and Tailwind CSS
- State management with Redux Toolkit
- API integration with Axios

## Project Structure

```
src/
  Components/
    Comment/
    Follow/
    Login/
    Posts/
    User/
    Vote/
  store/
  App.tsx
  index.tsx
  ...
public/
  index.html
  ...
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```sh
npm install
```

### Running the App

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```sh
npm test
```

### Building for Production

```sh
npm run build
```

## Environment

- API base URL is set to `http://localhost:5000` in [`src/store/index.ts`](src/store/index.ts).
- Google OAuth Client ID is set in [`src/index.tsx`](src/index.tsx).

## Customization

- Update Tailwind CSS config in [`tailwind.config.js`](tailwind.config.js).
- Update Material UI theme as needed in components.

## License

MIT

---

> Built with [Create React App](https://github.com/facebook/create-react-app), [Redux Toolkit](https://redux-toolkit.js.org/), [Material UI](https://mui.com/), and [Tailwind CSS](https://tailwindcss.com/).
