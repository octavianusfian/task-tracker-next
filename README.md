# 📝 Task Tracker App

A simple fullstack task management app built with **Next.js 14 (App Router)**, **TypeScript**, **Prisma**, and **Supabase**.  
Users can create, update, toggle, and delete tasks — built to practice modern fullstack Next.js concepts like **Server Actions**, **API Routes**, and **Data Revalidation**.

🔗 **Live Demo:** [task-tracker.vercel.app](https://task-tracker-next-chi.vercel.app/)

## 🖼️ Screenshot

![Task Tracker Screenshot](./public/ss-1.png)
![Demo](./demo.gif)


---

## 🚀 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Prisma ORM**
- **Supabase (PostgreSQL Database)**
- **Tailwind CSS**
- **Zod** (schema validation)
- **Vercel** (deployment target)

---

## ✨ Features

- ✅ Create new tasks
- ✅ View all tasks (Server Components)
- ✅ Toggle tasks as done / undone
- ✅ Delete tasks
- ✅ Real-time revalidation (via `revalidateTag`)
- ⚙️ Configurable with Supabase PostgreSQL backend

---


## 🧠 Learning Goals

This project was built as part of my fullstack roadmap to learn:

- Integrating **Next.js App Router** with Prisma & Supabase
- Understanding **Server Actions** vs **API Routes**
- Using **revalidateTag / router.refresh()** for fresh data
- Writing clean TypeScript & modular components

---

## Testing
npm test

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/task-tracker-nextjs.git
cd task-tracker-nextjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up environtment variabels

create .env

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
```

Make sure to replace credentials with your Supabase connection string

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run development server

```bash
npm run dev
```

## Seeder Project

```bash
npx prisma db seed
```

## 📁 Project Structure

```bash
/app
  /api
    /tasks/route.ts        # API endpoints
  /(tasks)
    actions.ts             # Server Actions
    page.tsx               # Main page
    TaskForm.tsx           # Client form component
    TaskItem.tsx           # Task item UI
/lib
  prisma.ts                # Prisma client setup
  validations.ts           # Zod schemas
/prisma
  schema.prisma            # Prisma schema definition
```

## 🧩 Future Improvements

- Add user authentication (NextAuth / Supabase Auth)
- Deploy to Vercel + Supabase
- Add pagination or filters
- Integrate optimistic UI updates

## 🧑‍💻 Author

**Octavianus Fian**
Front-end developer learning fullstack web development
