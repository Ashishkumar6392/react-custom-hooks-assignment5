# Task 5 - React Custom Hooks

This project implements a reusable `useFetch` custom React hook.

## Assignment requirements covered

- Custom hook named `useFetch`
- Accepts a URL parameter
- Fetches API data
- Returns `data`, `loading`, and `error`
- Uses `useState`, `useEffect`, and `useCallback`
- Handles loading and error states
- Displays API data in a React component
- Uses the assignment's example products API
- Responsive CSS styling

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

For Netlify, connect the GitHub repository and use:
- Build command: `npm run build`
- Publish directory: `dist`

## Implementation overview

`src/hooks/useFetch.js` keeps API-fetching logic separate from the UI. It manages loading, data and error state, aborts stale requests during cleanup, and exposes a `refetch` helper. `App.jsx` consumes the hook and focuses only on rendering loading, error, and product states.
