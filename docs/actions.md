# Actions Overview

Actions contain all business logic.

Actions should:
- Receive validated input
- Call database functions
- Return clean results

Actions should NOT:
- Handle HTTP responses
- Contain routing logic

Example:
```js
export async function getAllItems() {
  return db.items.findMany()
}
```
