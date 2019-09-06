This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Overview
  This project has functions:
  1.	View all people in the Star Wars universe as a lazy loaded list.
  2.	View the detail of all the people in the Star Wars universe. Homeworld, films, vehicles and starships related to each character should be links to a new screen or modal with more information.
  3.	People search bar with partial search functionality.
  
# Prerequisites

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - [Set it up for Github, connecting over SSH](https://help.github.com/articles/set-up-git/)
2. Install [Python v2.7.x](https://www.python.org/downloads/release/python-27) (v3.x is not supported by `node-gyp`)
3. Install [Node.js v6.9.2 or higher](https://nodejs.org/en/download/)

# Developer Install

1. Checkout the source code
  - Latest and greatest is in `master`

  ```sh
  git clone https://github.com/tientrung92/star-war-universe.git
  cd star-war-universe
  ```
2. Install the application's dependencies by issuing the following command from star-war-universe directory

  ```sh
  npm install
  ```
3. Run the application with `npm start`
4. Access the application in a browser at http://localhost:3000
  The page will reload if you make edits.<br>
  You will also see any lint errors in the console.

# Build Application

```sh
  npm run build
  ```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
