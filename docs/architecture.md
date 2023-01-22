# Architecture

The browser loads the React application from Nginx. Calls under `/api` are proxied to
the Express service, which validates a JWT before sending task queries to PostgreSQL.

```text
Browser -> Nginx/React -> Express routes -> services/repositories -> PostgreSQL
```

Authentication routes are public. Task routes share the authentication middleware,
and every task query includes the authenticated owner's identifier. This makes task
ownership part of the database operation instead of a client-side convention.

The server is organized by responsibility rather than feature size: routes translate
HTTP requests, services handle account behavior, and repositories contain SQL. The
client keeps network details in `api.js`, session state in `AuthContext`, and board
behavior in page and component modules.
