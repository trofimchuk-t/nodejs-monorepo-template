# Expense tracker

### Simple React/Node.js app to track expenses

A starter template for building full-stack applications with a monorepo structure. This project includes a React frontend and a Node.js Express API, both written in TypeScript. It comes preconfigured with Prettier, ESLint, and Husky for code quality and consistency.

#### App features:

- Show list of transactions
- Add and delete transactions

Based on [Traversy Media tutorial](https://www.youtube.com/watch?v=XuFDcZABiDQ).

### Technologies

- [React](https://create-react-app.dev/docs/getting-started) (`create-react-app`) + TypeScript
- [Node.js](https://nodejs.org/en) + [Express](https://expressjs.com) (server API) + TypeScript
- [Yarn](https://classic.yarnpkg.com/en/docs) (package manager)
- [Volta](https://docs.volta.sh/guide/) (Node.js/Yarn version manager)
- Package.json [workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) (allows managing dependencies and running both client and server with a single command from the root folder)
- [Prettier](https://prettier.io/docs/en/install.html) (code formatting) + [ESLint](https://eslint.org/docs/latest/use/getting-started) (code linting with different configs for client and server) + [Husky](https://github.com/typicode/husky) (pre-commit hooks)

> To see step-by-step guide how to create this app from scratch, check the [step-by-step guide](Guide.md).

## Getting Started

### Prerequisites

Follow [these instructions](https://docs.volta.sh/guide/getting-started) to install Volta. Volta manages Node and Yarn versions automatically.

### Install dependencies and run the app:

Open terminal and run scripts:

```bash
yarn install
```

```bash
yarn dev
```

It will start both client and server apps in development mode and open [http://localhost:3000](http://localhost:3000) in the browser.

## Available Scripts

Run the client app in development mode:

```bash
yarn dev:client
```

Run the server app in development mode:

```bash
yarn dev:server
```

Run both the client and server apps in development mode:

```bash
yarn dev
```

Build the client app for production:

```bash
yarn build:client
```

Build the server app for production:

```bash
yarn build:server
```

Build both the client and server apps for production:

```bash
yarn build:all
```

Run the server app in production mode:

```bash
yarn start
```

Check the code formatting of all files in the codebase using Prettier:

```bash
yarn format
```

Note: Prettier is run automatically on every commit (using a configured Husky pre-commit hook).

Run the code linter on all files in the codebase using ESLint:

```bash
yarn lint
```

## Run in production mode

```bash
yarn start
```

Open [http://localhost:5001](http://localhost:5001) to view it in the browser.

## Misc

### Work with workspaces in `yarn`:

#### Define workspaces

Add a section to the root `package.json` file:

```json
{
  ...
  "workspaces": [
    "client",
    "server"
  ],
  ...
}
```

Each workspace points to its own subfolder with its own `package.json` file.

List all workspaces:

```bash
yarn workspaces info
```

#### Dependencies management

For all operations with dependencies, run commands in the project's root folder.

To add a dependency for a specific workspace:

```bash
yarn workspace <workspace-name> add <package-name>
yarn workspace <workspace-name> remove <package-name>
```

where `<workspace-name>` should be `test-app-client` or `test-app-server` and `<package-name>` is the name of the package to install/remove.

To add a dependency for all workspaces:

```bash
yarn add <package-name> -W
yarn remove <package-name> -W
```

To restore all dependencies (for root and all workspaces) run `yarn install` in the root folder.

#### Run scripts

To run a script in a specific workspace:

```bash
yarn workspace <workspace-name> <script-name>
```
