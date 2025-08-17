## Overview : 
This is a website similar to Leetcode, where we can practice coding questions. This website supports c++ compiler, where you can run code in c++ and it is integrated with Gemini AI which provides reviews to 
the written code

## Features : 
# Code Editor – Write and edit C++ programs with syntax highlighting for better readability.
# Instant Execution – Compile and run code directly in the browser with real-time results.
Custom Input Support – Test your code with personalized input values.
AI-Powered Code Review – Receive instant feedback and improvement suggestions powered by Google’s Gemini AI.
Responsive Interface – A clean, user-friendly design optimized for all devices.
Problems page : lists all the porblems avaialble in website for practice
submissions page : lists out all the submissions made by the user
Used JWT Authentication


## Tech Stack
  1.Frontend
    React.js
    CSS
    Axios for API calls
    Monaco Simple Code Editor
    React Markdown for rendering AI reviews
  2.Backend
    Node.js
    Express.js
    Google Gemini AI API for code review
    C++ compilation system
    MONGODB for database

## Installation and Setup
  Prerequisites
    Node.js (v22 or higher)
    npm or yarn
    C++ compiler on your system
  Backend Setup
    Navigate to the backend directory:
      cd server
    Install dependencies:
      npm install
    Create a .env file with the following variables:
      PORT=4000
      GOOGLE_API_KEY=your_google_api_key
  Start the server:
      npx nodemon index.js 
  Frontend Setup
    Navigate to the frontend directory:
      cd react-app
    Install dependencies:
      npm install
  Start the development server:
    npm start
    Open your browser and navigate to http://localhost:3000 (or the port shown in your terminal)

## API Endpoints
POST /login: login api
  BODY : {username: "ken", password: "ken@123"}
POST /register : api to signup
 BODY : {username: "ken", password: "ken@123"}
GET /problems/getAllProblems : this lists out all the problems available in website to practice
GET /problem/getProblem/{problemId} - on choosing any of the probem from above list, this api will be called with problemID
POST /ai-review: Get AI feedback on code
  Body: { code: string }
POST /run : to run the code
  Body: { language: 'cpp', code: string, input: string }
POST /submit : to submit the solution, runs with hidden testcases
  Body: { language: 'cpp', code: string, problemId: string, userId: string }
POST /submissions/{userId} : lists out all the submissions of this particular user

## Docker Support
  The backend includes Docker configuration for containerized deployment:

  # Build the Docker image
  docker build -t vamshidharreddy-cpp-compiler . 
  
  # Run the container
  docker run -d -p 4000:4000 --name vamshi-compiler vamshidharreddy-cpp-compiler

## Usage
  CLick on Problems button to view all the problems available in website
  Choose a problem and Write C++ code in the editor or use the default example
  Add input values if your program requires them
  Click "Run" to execute the code and see the output
  Click "AI Review" to get feedback and suggestions on your code
  Click "Submit" to submit the solutions
  CLick on submissions button to view all your submissions