# x-github-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that aids x-dash's workflow

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Rules

- When a Pull Request is created or labelled with the `Component` label
  - Create a Label with the name of the PR's branch, linking to the PR in its description
  - Create a Project with the name of the PR's branch, linking to the PR in its description
  - Add the Project to the Components board
- When a PR is created or labelled with the label of a component's name
  - Add it to the component's board