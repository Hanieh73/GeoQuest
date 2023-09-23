# GeoQuest

GeoQuest is a quiz-based geography learning platform that takes you on a virtual journey around the world while testing your knowledge of geography.

## Table of Contents

- [About](#about)
- [User Story](#user-story)
- [Project Planning](#project-planning)
- [Getting Started](#getting-started)
- [Extra Features](#extra-features)
- [Built With](#built-with)
- [Contributing](#contributing)
- [Authors & Acknowledgment](#authors--acknowledgment)
- [License](#license)

## About

Welcome to GeoQuest, your passport to a thrilling journey of geographical discovery! Whether you're a student preparing for a geography quiz or a geography enthusiast looking to expand your knowledge, this platform is designed to make learning about the world both fun and informative.

GeoQuest is more than just a quiz platform; it's an educational adventure. Embark on a virtual journey around the globe, explore diverse landscapes, cultures, and landmarks, and put your geography skills to the test. With a wide range of quiz topics and interactive challenges, GeoQuest is your ticket to becoming a geography expert.

## User Story

As a user, you have access to the following functionalities:

- **User Profile:** When starting the game, you will be prompted to enter your name, which will be stored for the duration of the session.
- **Challenging Quizzes:** You can take on various challenges that involve answering multiple-choice geography-related questions.
- **Scoring System:** Earn 1 point for each correct answer and view your final score at the end of the game.
- **Quiz Formats:** You have the option to choose between text-based questions or timed flag-based questions, adding variety to your gameplay.
- **Randomized Questions:** Questions are randomized every time you start a quiz, keeping the experience fresh.
- **Lifelines:** In the text-based "World Tour" quiz, you are provided with 3 "50/50" lifelines for every 15 questions. These lifelines remove 2 wrong answer options, helping you make better choices.

## Project Planning

Our project was well planned and executed to ensure a successful outcome. Here's a brief overview of our approach:

- **Wireframe and Task Plan:** We began with an initial wireframe and a daily task plan, outlining responsibilities for each team member.
- **Trello Board:** We utilized a Trello board to list essential features and extra features, categorizing them for clarity.
- **Task Assignment:** Team members were assigned specific tasks, and we established a clear process for approving pull requests.
- **Effective Communication:** Regular communication was crucial to maintain task clarity, mutual support, and accountability. Daily stand-up huddles and ongoing communication ensured everyone was on the same page.
- **Feature Prioritization:** We prioritized essential features and gradually incorporated extra features to enhance the user experience.
- **Testing and Quality Assurance:** Extensive testing was conducted, aiming for at least 50% test coverage using Jest.

## Getting Started

If you would like to explore the project, follow these steps:

1. Clone the project repository using SSH:

   ```sh
   git clone ssh-link-to-repo
   ```

2. Navigate to the project directory (back-end folder):

   ```sh
   cd back-end
   ```

3. Install project dependencies:

   ```sh
   npm install
   ```

4. Install nodemon as a development dependency:

   ```sh
   npm install -D nodemon
   ```

5. Change the script to run the development server with nodemon:

   ```json
   "scripts": {
     "dev": "nodemon node.js"
   }
   ```

6. Start the development server:

   ```sh
   npm run dev
   ```

## Extra Features

In addition to the core functionalities, we have exciting extra features in mind that we plan to add in the future:

- **Location Guessing:** Test your knowledge by identifying the location of famous landmarks or natural wonders.
- **Map Puzzle:** Challenge yourself to assemble country maps from puzzle pieces, enhancing your geographical skills.
- **Leaderboards:** Compete globally and locally by checking out leaderboards to see how you rank among other players.
- **Sound and Visual Effects:** Immerse yourself in an engaging learning experience with captivating visuals and sound effects that make learning fun and memorable.

## Built With

- HTML
- CSS
- JavaScript
- Bootstrap
- Express
- Node
- Cors
- Git
- Github

## Contributing

We welcome contributions from the open-source community to make GeoQuest even better.

## Authors & Acknowledgment

- Hanieh Zaab
- Justin Graham
- Mohammed Nadim Ahmed
- Stephen Murray

## License

GeoQuest is licensed under the MIT License. Feel free to use, modify, and distribute it in accordance with the terms specified in the license.
