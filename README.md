# Personality Test - Introvert or Extrovert

Please see the project's [brief](./BRIEF.md).

## Rationale

### Next.js

I wanted a simple way to set up an "API" without having to build a separate application.

### The Questions and Results

Since I'm no psychology expert, I wanted to work with any set of odd-numbered questions as that would mean the answers would _always_ tilt one way (introvert) or the other (extrovert).

For simplicity, I selected the first three (3) questions from this [page](https://www.psychologies.co.uk/self/are-you-an-introvert-or-an-extrovert.html.

### Code Structure

There is just one component - the question renderer - and you can find it [here](./components/QuestionRenderer.tsx). For the rest of the code, I followed Next.js's [convention](https://nextjs.org/docs/basic-features/pages) for creating pages.

There are three pages:

1. [Home](./pages/index.tsx)
2. [Test page](./pages/test-page/index.tsx)
3. [Results page](./pages/results-page/index.tsx)

### Tests

Tests are located in the `__tests__` directory. You can use the `yarn test` command to run the test suite.

### Running locally

If you've cloned the project, make sure to install the dependencies by running `yarn` in the project's root folder. Run `yarn dev` to start the application on [localhost:3000](http://localhost:3000) when the dependencies have been installed.
