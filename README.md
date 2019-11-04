# Conway's Game of Life

This project is an implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) using React, Hooks, and TypeScript. It provides a graphical user interface to set the initial state and run the simulation.

To play the game, go to: https://sbrudz.github.io/life-react/

The project structure is organized according to Charles Stover's [Optimal file structure for React applications](https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes on Testing

This game was built using test-driven development. Tests are written using [jest](https://jestjs.io/) and [react-testing-library](https://github.com/testing-library/react-testing-library). It follows the testing philosophy of Guillermo Rauch and Kent C. Dodds: "Write tests. Not too many. Mostly integration". Kent has a great [blog post](https://kentcdodds.com/blog/write-tests) that explains this philosophy in more detail. React-testing-library (also created by Kent) is designed to encourage client-side integration tests, because “The more your tests resemble the way your software is used, the more confidence they can give you.”

In previous production applications, I've noticed that the React unit tests written with [enzyme](https://airbnb.io/enzyme/) have had a tendency to become brittle and often need to be updated when the client code is changed. When this happens, it makes you question the value of the tests -- just what are they testing after all? One of my goals in building this application with an integration test focus is to see how the tests hold up over time as more features are added to the application.

A second goal is to better understand how to effectively test components built with React hooks. Because they're functions called from within a functional React component, Hooks lend themselves better to integration tests. To mock out a hook requires really digging in to the implementation details of the component. You need to mock out the entire hook with Jest. Now your test is tightly coupled to the fact that your component is using a specific hook. If you change that hook, for example by extracting it out into a custom hook, you've just broken your test, even though the behavior of the component may not have changed. React-testing-library and integration testing claim to be a better alternative. Let's see how it works in practice.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run deploy`

Deploys the app to GitHub pages.
