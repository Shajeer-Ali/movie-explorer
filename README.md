# Movie Explorer

A responsive movie browsing app built with React, TypeScript, and Vite, using the TMDB API.

https://movie-explorer-nine-eta.vercel.app/

## Features

- Browse movies with genre filter and sorting
- Search with debounce (waits until you stop typing)
- Pagination
- Movie detail pages with routing
- Loading skeletons and error handling with retry
- Responsive layout and keyboard-accessible controls

## Tech stack

React, TypeScript, Vite, React Router

## Run locally

1. Clone the repo and run `npm install`
2. Create a `.env` file in the project root:

   VITE_TMDB_TOKEN=your_tmdb_read_access_token

3. Run `npm run dev`

You can get a free token from your TMDB account under Settings, then API.

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.