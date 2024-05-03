
# React-TypeScript Testing Library and Tailwind CSS Template


## Features

- **[React](https://react.dev)**: A popular JavaScript library for building user interfaces.
- **[Typescript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that helps catch errors early and improve code quality.
- **[Jest](https://jestjs.io/)**: A testing utility for writing unit and integration tests with a user-centric approach.
- **[React-Testing-Library](https://testing-library.com/)**: A testing library for React for writing unit and integration tests with a user-centric approach.
- **[Tailwind](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs.

## Getting Started

This project is a collection of frontend machine coding question solutions. 
The master branch contains the starter repo. 
Each branch solves the problem as suggested by the branch name.

1. Navigate to the project directory:

   ```bash
   cd your-project-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Checkout to a specific branch to refer the solutions.

   ```bash
   git checkout <branch-name>
   ```

5. Problem statement

   Link: Transfer-list MUI https://youtu.be/wQLtY28m8Uk?si=8Fp8N8eZ97HRMVHo
   
   Create 2 mock API’s which returns a list of students and each student has a name, some marks and a unique registration ID. Data from the 2 API’s can have common students i.e. mock API 1 can have a student as — ABC / 98% / 1234 (name / marks / registration ID) and this same data can be there in mock API 2 response as well. Now after creating these 2 API’s using Promises and hard-coded data, you need to merge the data coming from both API’s and have to delete the duplicates.

   Part-2: Use the above data and render it in Box 1. Each student has a checkbox before its name and we can select multiple students at once. All the selected students can be moved to Box 2 by clicked on the 1st button and vice-versa for Box-2.