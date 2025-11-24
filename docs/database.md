# Database Overview

This layer handles all data operations.

Typical responsibilities:
- Database connections
- CRUD operations
- Migrations (if used)

Example:
```js
export function getItems() {
  return db.items.findMany()
}
```

Keep database logic separate from actions and routes.
