# Routes Overview

This document lists the main API routes in the project and what each route does.  
Routes only map requests to actions — no business logic should be inside route files.

---

## Items Routes

**GET /api/items**  
→ Get all items

**POST /api/items**  
→ Create a new item  
Body example:
```json
{ "name": "New Item" }
```

**GET /api/items/:id**  
→ Get a single item by ID

---

## Users Routes

**GET /api/users**  
→ Get all users

**POST /api/users**  
→ Create a new user

**GET /api/users/:id**  
→ Get user by ID

**PATCH /api/users/:id**  
→ Update user by ID

**DELETE /api/users/:id**  
→ Delete user by ID

---

## Auth Routes

**POST /api/auth/register**  
→ Register a new user

**POST /api/auth/login**  
→ Login and return a token

---

## Route Structure

Routes typically look like this:

```js
router.get("/", action.getAll)
router.post("/", action.create)
router.get("/:id", action.getById)
```

---

## Error Format

All routes should return errors like:

```json
{ "error": true, "message": "Something went wrong" }
```