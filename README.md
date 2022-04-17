# React App (MyFlix Client-Side)

This project focuses on the client-side of my movie app. It relys on the movie_app with server-side coded REST API and database which is hosted on Heroku. It uses Bootstrap, React and Redux and is designed as a single-page application to navigate between components. Everyone can register as a user, login, add movies to their list of favourites and check their user data on their profil view.

The user can view a list of different movies, get information on them and learn about the genre and director.

The app is responsive and runs on multible devices.


## Objective

Using React, build the client-side for an application called myFlix based on its existing
server-side code (REST API and database).


## Essential Views and Features

Main view
- Return a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

Single movie view
- Return data (description, genre, director, image) about a single movie to the user
- Allow users to add a movie to their list of favorites

Loging view
- Allow users to log in with a username and password

Registration view
- Allow new users to register (username, password, email, birthday)

Genre view
- Return data about a genre with a name and description
- Display example movies

Director view
- Return data about a director (name, bio, birth year, death year)
- Display example movies

Profile view
- Allow users to update their user info (username, password, email)
- Display example movies
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister


## Technical Requirements

The application must:
1. be a single-page application (SPA)
2. use state routing to navigate between views and share URLs
3. give users the option to filter movies
4. give users the option to sort movies
5. initially use Parcel as its build tool
6. be written using the React library and in ES2015+
7. be written with React Redux (hence respecting the Flux pattern)
8. use Bootstrap as a UI library for styling and responsiveness
9. contain a mix of class components and function components

Besides, the application may be hosted online.

# Stack, Dependencies, Parcel
  
  ## Stack
  * The complete project was developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack
  
  ## Dependencies
    "axios": "^0.21.4",
    "bootstrap": "^4.6.0",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-bootstrap": "^2.0.3",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.6",
    "react-router-dom": "^5.3.0",
    "redux": "^4.1.2",
    "redux-devtools-extension": "^2.13.9"
  
  ## Parcel
  * Parcel path for hosting locally: src/index.html


## Links

- GitHub repository: https://github.com/Jaim-e/myFlix-client
