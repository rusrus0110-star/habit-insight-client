# Habit Insight Client

Frontend client for **Habit Insight** — a full-stack habit tracking and analytics application.

The app allows users to register, log in, manage habits, complete habits with mood notes, view progress history, and analyze long-term consistency through dashboard statistics and charts.

Frontend repository:

```txt
https://github.com/rusrus0110-star/habit-insight-client
```

Backend repository:

```txt
https://github.com/rusrus0110-star/habit-insight-api
```

---

## Demo Account

A prepared demo account is available for portfolio testing.

```txt
Email: demo@habitinsight.dev
Password: Demo123456
```

Use the **Try demo account** button on the login page to enter the application with prepared demo data.

The demo data includes:

- demo user
- predefined habits
- progress history
- mood values
- notes
- streak statistics
- dashboard statistics
- analytics data

The demo data must already exist in MongoDB on the backend side.

---

## Main Features

### Authentication

- User registration
- User login
- JWT authentication flow
- Token storage in localStorage
- Protected routes
- Automatic redirect for unauthenticated users
- Demo login button

### Habit Management

- Create habits
- Edit habits
- Delete habits
- Complete habits
- Add mood value after completion
- Add optional notes after completion
- View habit statistics

### Progress Tracking

- View habit progress history
- Display recent completion records
- Display 30-day progress chart
- Track mood values
- Track notes for each completion

### Dashboard

The dashboard displays a high-level overview:

- Total habits
- Total completions
- Best streak habit
- Average mood

### Analytics

The analytics page provides deeper habit insights:

- Longest streak
- Best completion day
- Best completion month
- Abandoned habits
- Mood correlation by difficulty
- Perfect day
- Golden mean habit
- Burnout risk habits

---

## Tech Stack

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Ant Design
- Recharts
- Day.js
- CSS Modules

The frontend is connected to a backend API built with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## Project Structure

```txt
src/
├── api/
│   ├── auth_api.ts
│   ├── axios_instance.ts
│   ├── habits_api.ts
│   ├── progress_api.ts
│   └── stats_api.ts
│
├── app/
│   ├── App.tsx
│   ├── providers.tsx
│   └── router.tsx
│
├── components/
│   ├── AppLayout/
│   │   ├── AppLayout.tsx
│   │   └── AppLayout.module.css
│   │
│   └── ProtectedRoute/
│       └── ProtectedRoute.tsx
│
├── features/
│   ├── auth/
│   │   ├── auth_context.tsx
│   │   ├── auth_context_value.ts
│   │   ├── auth_storage.ts
│   │   ├── auth_types.ts
│   │   └── use_auth.ts
│   │
│   ├── habits/
│   │   ├── components/
│   │   │   ├── HabitCard.tsx
│   │   │   ├── HabitCompleteModal.tsx
│   │   │   ├── HabitForm.tsx
│   │   │   └── HabitProgressModal.tsx
│   │   ├── habit_options.ts
│   │   └── habit_types.ts
│   │
│   └── stats/
│       └── stats_types.ts
│
├── pages/
│   ├── AnalyticsPage/
│   │   ├── AnalyticsPage.tsx
│   │   └── AnalyticsPage.module.css
│   │
│   ├── DashboardPage/
│   │   ├── DashboardPage.tsx
│   │   └── DashboardPage.module.css
│   │
│   ├── HabitsPage/
│   │   ├── HabitsPage.tsx
│   │   └── HabitsPage.module.css
│   │
│   ├── LoginPage/
│   │   ├── LoginPage.tsx
│   │   └── LoginPage.module.css
│   │
│   └── RegisterPage/
│       └── RegisterPage.tsx
│
├── styles/
│   ├── global.css
│   └── variables.css
│
├── types/
│   └── api_types.ts
│
├── main.tsx
└── vite-env.d.ts
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/rusrus0110-star/habit-insight-client.git
cd habit-insight-client
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root of the frontend project:

```env
VITE_API_URL=http://localhost:3333
```

For production deployment, replace it with the deployed backend API URL:

```env
VITE_API_URL=https://your-backend-api-url.com
```

---

## Running Locally

Start the frontend development server:

```bash
npm run dev
```

The app usually runs on:

```txt
http://localhost:5173
```

The backend API must also be running.

Backend local URL:

```txt
http://localhost:3333
```

---

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

---

## Backend Connection

The frontend communicates with the backend through Axios.

Base API URL is configured in:

```txt
src/api/axios_instance.ts
```

The value is read from the environment variable:

```txt
VITE_API_URL
```

Example:

```ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
```

---

## API Modules

### Auth API

File:

```txt
src/api/auth_api.ts
```

Used for:

- register
- login
- get current user

### Habits API

File:

```txt
src/api/habits_api.ts
```

Used for:

- get habits
- create habit
- update habit
- delete habit
- complete habit

### Progress API

File:

```txt
src/api/progress_api.ts
```

Used for:

- get habit progress history
- get last 30 days of progress

### Stats API

File:

```txt
src/api/stats_api.ts
```

Used for:

- dashboard statistics
- longest streak
- best day
- best month
- abandoned habits
- mood correlation
- perfect day
- golden mean habit
- burnout risk habits

---

## Authentication Flow

The application uses JWT authentication.

```txt
User logs in
↓
Backend returns JWT token
↓
Frontend saves token in localStorage
↓
Axios attaches token to protected requests
↓
Backend validates token
↓
Protected data is returned
```

The token is attached to requests through an Axios interceptor.

Header format:

```txt
Authorization: Bearer <token>
```

---

## Protected Routes

Private pages are protected with:

```txt
src/components/ProtectedRoute/ProtectedRoute.tsx
```

If the user is not authenticated, they are redirected to the login page.

Protected pages:

- Dashboard
- Habits
- Analytics

---

## Demo Login Flow

The login page includes a **Try demo account** button.

This button does not create demo data.

It sends a normal login request with the demo credentials:

```txt
Email: demo@habitinsight.dev
Password: Demo123456
```

The backend returns a JWT token, and the frontend redirects the user to the protected dashboard.

Demo data must be created on the backend side before testing the demo login.

---

## Pages

### Login Page

The login page includes:

- product-style landing section
- demo access button
- manual login form
- link to registration page

### Register Page

The register page allows users to create their own account.

### Dashboard Page

The dashboard gives a quick summary of the user's habit activity.

### Habits Page

The habits page allows users to manage habits, complete them, and view progress history.

### Analytics Page

The analytics page shows deeper statistics based on progress data.

---

## Data Types

### Habit

```ts
type Habit = {
  _id: string;
  userId: string;
  name: string;
  category: "health" | "education" | "productivity" | "mindfulness";
  difficulty: "easy" | "medium" | "hard";
  streak: number;
  bestStreak: number;
  totalCompletions: number;
  createdAt: string;
  updatedAt: string;
};
```

### Progress Record

```ts
type ProgressRecord = {
  _id: string;
  date: string;
  completed: boolean;
  mood: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
```

### Dashboard Stats

```ts
type DashboardStats = {
  totalHabits: number;
  totalCompletions: number;
  bestStreakHabit: DashboardHabitSummary | null;
  averageMood: number;
};
```

---

## Styling

The project uses:

- CSS Modules
- global CSS variables
- Ant Design components
- responsive layouts

Main style files:

```txt
src/styles/global.css
src/styles/variables.css
```

---

## Deployment Notes

The frontend can be deployed to:

- Vercel
- Netlify
- Render Static Site

The backend should be deployed separately.

After backend deployment, update:

```env
VITE_API_URL=https://your-backend-api-url.com
```

Then rebuild and redeploy the frontend.

---

## Portfolio Value

This frontend demonstrates:

- React architecture
- TypeScript usage
- API integration with Axios
- JWT authentication flow
- protected routing
- dashboard UI
- analytics UI
- chart visualization with Recharts
- feature-based folder structure
- real backend integration
- MongoDB-driven data display

The project is suitable for demonstrating full-stack understanding with emphasis on authentication, backend integration, database-driven UI, and analytics-oriented user experience.

---

## Author

Ruslan Chyhryn

```txt
GitHub: rusrus0110-star
Frontend: https://github.com/rusrus0110-star/habit-insight-client
Backend: https://github.com/rusrus0110-star/habit-insight-api
```
