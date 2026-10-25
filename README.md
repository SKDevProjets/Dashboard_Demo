# Dashboard_Demo

A dashboard web application built with Angular and TypeScript, featuring a modular architecture designed for maintainability, scalability, and code reusability.

# Tech Stack

Angular 22 — Frontend framework
TypeScript — Application development
Bootstrap 5 — Responsive UI and styling
Bootstrap Icons — Icon library
Chart.js — Data visualization
ng2-charts — Angular integration for Chart.js
RxJS — Reactive programming

# Prerequisites

Before getting started, make sure you have installed:

Node.js — Use a version compatible with Angular 22.
npm — Included with Node.js.

# Verify your installation:

bash
node -v
npm -v

# Getting Started

1. Clone the repository
bash
git clone https://github.com/SKDevProjets/Dashboard_Demo.git

2. Navigate to the Angular application
bash
cd Dashboard_Demo/apps/web

3. Install dependencies
bash
npm install

4. Configure the environment

Create the src/environments/environment.ts file if it does not already exist.

Configure it using the provided environment configuration reference (.txt file). Make sure the required API URLs and environment variables match your setup.

5. Run the application

Start the Angular development server and open the application in your browser:

bash
npx ng serve --open


The application is available at:

http://localhost:4200/

To stop the development server, press Ctrl + C in the terminal.

# Project Architecture

The application follows a Core / Feature / Shared architecture to separate responsibilities and improve maintainability.

text
src/
├── app/
│   ├── core/
│   ├── features/
│   └── shared/
├── environments/
│   └── environment.ts
├── assets/
└── styles.css

# Run these commands from the apps/web directory.

Command	Description
npm start	Starts the development server
npx ng serve --open	Starts the server and opens the browser
npm run build	Builds the application
npm run watch	Rebuilds automatically when files change
npm test	Runs the configured tests
Production Build
