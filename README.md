This is a full-stack time tracking application built as a test assignment for Viso Academy.

## How to Run the Project

Follow these steps to get the project running locally:

1. **Clone the repository:**
   ```bash
   git clone <REPOSITORY_LINK>
   cd viso-time-tracker

Install dependencies:
  ```bash
  npm install
  ```
Database Setup: The project uses SQLite with Prisma ORM. Initialize the database and run migrations:
  ```bash
  npx prisma migrate dev --name init
  ```
Start the Development Server:
```bash
npm run dev
```

## Architecture & Tech Stack

Technologies Used:
- Frontend/Framework: Next.js 15 (App Router) — used for both UI and server-side logic.

- Language: TypeScript — ensures type safety across the application.

- Database: SQLite — a lightweight, file-based database for easy setup and review.

- ORM: Prisma — used for database modeling, migrations, and type-safe queries.

- Styling: Tailwind CSS — for a modern, responsive, and clean user interface.

Project Structure:
- src/app/: Contains the main page logic and application routes.

- src/app/api/entries/: Backend REST API endpoints (GET for fetching data, POST for creating entries with validation, and DELETE for removing records).

- src/components/: Logic-separated UI components:

- TimeForm.tsx: Handles user input and data submission.

- EntryList.tsx: Manages data display, grouping by date, and totals calculation.

- prisma/: Contains the schema.prisma file which defines the database structure.
