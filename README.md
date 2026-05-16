**Team Task Manager**
A full-stack Team Task Manager application built using Next.js, Prisma, PostgreSQL, NextAuth, and Tailwind CSS.

deployed link : https://team-task-manager-production-7597.up.railway.app/

IMPORTANT : 
1. To create project or tasks, one has to login as ADMIN user. Member user cannot create project or tasks, it has only view funnctionlaity.
2. Maintain this order : create a user (admin), create a project, create tasks under the project and assign it to any user. (needed only once)

**Features**
Authentication (Login / Signup)
Role-Based Access (Admin / Member)
Project Management
Task Assignment & Tracking
Dashboard Analytics

**Tech Stack**
Next.js
PostgreSQL
Prisma ORM
NextAuth
Tailwind CSS

**Run Locally**
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev

Environment Variables needed
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL

Deployment

Deployed using Railway with PostgreSQL.
