# Step-by-Step Guide to create an App

## 1. Configure environment

#### 1.1. Install Node.js

Follow the instructions at [Node.js Downloads](https://nodejs.org/en/download/package-manager/current). Download and install Node.js.

Open terminal after installation and check versions:

```bash
node -v
npm -v
```

#### 1.2. Install [Yarn](https://yarnpkg.com/getting-started) package manager

Yarn is a faster, more secure, and more reliable package manager for JavaScript.

```bash
npm install --global yarn
```

Check version:

```bash
yarn -v
```

## 2. Create a React App

#### 2.1. Initialize a new React app

Create React App is an officially supported way to create single-page React applications. Follow the instructions at [Create React App](https://create-react-app.dev/docs/getting-started).

Open the terminal and run the following command:

```bash
yarn create react-app test-app --template typescript
```

It will create a folder `test-app` and install the `create-react-app` template into it with all necessary dependencies.

Navigate to the app directory and start the app:

```bash
cd test-app
yarn start
```

It should open a new browser window at http://localhost:3000/ with the React app running.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/acc45ad680ae13602e30aa58f0fcd53b53b367c9)

#### 2.2. Add basic components

Add necessary components, providers, update styles, etc.
[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/34e839855aad8e200eb83d4e224de76f685cc6ae)

#### 2.3. Move Frontend Files to `client` subfolder

```bash
mkdir client
mv * client
cd client
yarn start
```

Update `.gitignore` and change the name of the app in the `package.json` file.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/e47e2912f31d402e0738249d49ce65e3fff89c80)

## 3. Create Server App

In the root project directory, create a new folder for the server app and navigate to it. Initialize a new app:

```bash
mkdir server
cd server
yarn init
```

Install dependencies:

```bash
yarn add nodemon -D
yarn add express colors dotenv morgan
```

**nodemon**: automatically restarting the node application when file changes in the directory are detected
**express**: web framework
**colors**: get color and style in your node.js console
**dotenv**: loads environment variables from a .env file into process.env
**morgan**: HTTP request logger middleware for node.js

Add necessary components and initialize an app in the `server.js` file. Create a `config` folder with a `config.env` file.

Start the server:

```bash
yarn start
```

Alternatively, run the server in development mode with autoreload on file changes:

```bash
yarn server
```

Browse http://localhost:5001/api/v1/transactions

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/e24b8994bc16915f6c18370a962f1caa1dff23e3)

## 4. Link Frontend with API

Navigate to the client app folder and install `axios`:

```bash
cd client
yarn add axios
```

Update client components to be able to call a server API.
To tell the development server to proxy any unknown requests to your API server in development, add a `proxy` field to the client `package.json` file.

Make sure the server is running and start the client app:

```bash
yarn start
```

Browse http://localhost:3000/ and check the app.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/b9a6a3a217074b230e8695f8cde95d301d4076b6)

## 5. Lock Node and Yarn versions

Working on projects, it is important that all contributors are using the same versions of tools. To achieve this, you can lock the Node.js and Yarn versions with Volta.

Follow the [instructions](https://docs.volta.sh/guide/getting-started) to read about and install Volta.

Install Volta on Windows:

```bash
winget install Volta.Volta
```

Install Volta on Unix/MacOS:

```bash
curl https://get.volta.sh | bash
```

In the root project folder, create a root `package.json` file:

```bash
yarn init
```

Add `volta` sections to `package.json` files.
Add scripts section to the root `package.json` file. To be able to start both client and server apps with a single command, install `concurrently` and add a `dev` script:

```bash
yarn add concurrently -D
```

Verify:

```bash
cd test-app
yarn dev
```

It should run both server and client apps simultaneously.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/b1c62e698afe54632beb3932d4de008262cd42f8)

## 6. Use Workspaces

_Workspaces_ is a feature of Yarn that allows you to work with multiple packages in one repository. It allows you to split your project into sub-packages (each with its own `package.json` file) and manage them all in one place. Follow the instructions at [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

Add `workspaces` section to the root `package.json` file:

```json
"workspaces": [
  "client",
  "server"
]
```

Set `private` property to `true`. Remove `node_modules` folders and `yarn.lock` files from the client and server apps. From now, all operations with dependencies will be managed from the root project folder.

Navigate to the root project folder and check the workspaces:

```bash
yarn workspaces info
```

Restore all dependencies for all workspaces:

```bash
yarn install
```

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/639e2dda7e8ea479b6fb0a4401d58d1469d4ea67)

## 7. Configure code formatters

[EditorConfig](https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. It applies formatting rules **before** writing code.

Add an `.editorconfig` file to the root project folder.

[Prettier](https://prettier.io/) removes all original styling and ensures that all outputted code conforms to a consistent style. It applies formatting rules **after** writing code.
Follow the instructions to install and configure [Prettier](https://prettier.io/docs/en/install):

```bash
yarn add --dev --exact prettier -W
yarn add --dev @ianvs/prettier-plugin-sort-imports prettier-plugin-jsdoc -W
```

Create and fill `.prettierignore` and `.prettierrc`:

To _check_ all files, run the following command:

```bash
yarn prettier . --check
```

To _update and save_ all files, run this command:

```bash
yarn prettier . --write
```

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/ce7d323c0005ff8fc8f407d68ce4a4c3c45d3f75)

## 8. Add pre-commit hook

Configure a pre-commit hook to run Prettier before committing changes. It will check all staged files and fail if they are not formatted. See an [article](https://prettier.io/docs/en/precommit) for more details.

Add `husky`:

```bash
yarn add --dev husky lint-staged -W
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','yarn lint-staged\n')"
```

Add `lint-staged` section to the `package.json` file. It will run the Prettier check command over staged files before committing them and fail if they are unformatted.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/cf1230275917b5fb1436875b4705b6d00223f900)

## 9. Add static code analysis

ESLint statically analyzes your code to quickly find problems. It can be used with Prettier to enforce code style and formatting rules. Follow the instructions at [ESLint](https://eslint.org/docs/user-guide/getting-started).

Although ESLint has a built-in tool `yarn create @eslint/config` to install and configure, due to an issue with Yarn workspaces, it is better to install it manually.

To install ESLint and necessary plugins, run the following commands:

```bash
yarn add --dev eslint@8.x.x -W
yarn add --dev eslint-config-prettier eslint-plugin-jest-dom @typescript-eslint/eslint-plugin eslint-plugin-jest eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser eslint-plugin-prettier -W
```

Create an `.eslintrc.js` file in the root project folder and fill it with the necessary configuration.

> Note that you should remove the `eslintConfig` section from the **client** `package.json` file.

Command to check client app files:

```bash
yarn run eslint ./client
```

Feel free to explore the [ESLint Rules](https://eslint.org/docs/rules/) and adjust the configuration to your needs.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/890e913d1d8f8c68eb6ecee52db826789bb3d356)

## 10. Reformat Codebase with Prettier

Run the following command to reformat the client app codebase:

```bash
yarn prettier --write ./client
```

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/b751acd214a075c3ef5c95bdb14154f73788cd11)

## 11. Refactor and improve the server codebase

#### 11.1. Convert Server Files to TypeScript

Follow the [LogRocket Blog](https://blog.logrocket.com/how-to-set-up-node-typescript-express/#running-typescript-node-ts-node) article for more information.

Initialize TypeScript:

```bash
yarn workspace test-app-server tsc --init
```

Add dependencies:

```bash
yarn add typescript nodemon -W
```

```bash
# Add TypeScript execution engine for Node.js:
yarn workspace test-app-server add --dev ts-node
# Add type definitions:
yarn workspace test-app-server add --dev @types/node @types/morgan @types/express
```

Rename `server.js` to `index.js`, change extensions for source files to `.ts`, move source files to `/src` subfolder, and fix TypeScript errors.
Update `.gitignore` to exclude build artifacts.

Build the app:

```bash
yarn workspace test-app-server build
```

Start the app in production mode:

```bash
yarn workspace test-app-server start
```

Run in dev mode with autoreload:

```bash
yarn workspace test-app-server server
# or
yarn dev:server
```

Reformat the server codebase with Prettier:

```bash
yarn prettier --write ./server
```

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/fb2c3319aad4418a91d9e20e016059197171f484)

#### 11.2. Add Error Handlers

Add dependency:

```bash
yarn workspace test-app-server add express-async-errors
```

Create error models and error middleware.
Import `express-async-errors` and register middleware in the `server.ts` file.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/a5c6421ecac65a3e839a238fbf5151001916ea15)

#### 11.3. Enable Production Mode

Add `cross-env` package to set environment variables:

```bash
yarn add --dev cross-env -W
```

Update `index.ts` file to serve the client app in production mode.
Add useful scripts to the root `package.json` file to build apps and start the server in production mode.

To run the app:

1. Build client and server:

```bash
yarn build:client
yarn build:server
# or
yarn build:all
```

2. Run the server in production mode:

```bash
yarn start
```

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/5483f9946e585e6cd7a8c45dda9fa1b9f3b41ca9)

#### 11.4. Add Exit Handler

Add `exitHandler` to gracefully shutdown the server when the app is terminated.
Update the startup script and add the `nodemon --signal SIGHUP` option to gracefully shutdown the app when nodemon restarts due to file changes.

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/d4d2c28782d14572c50cd322a8a70fadf8ecc24c)

## 12. Configure Debugging

Follow the instructions at [VS Code Debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configurations-for-common-scenarios).

In VS Code, go to the `Run and Debug` view and click the `create a launch.json file` link to create a `launch.json`.

Add configuration to launch the client app in Chrome and another one to launch and debug the server app using the `nodemon` scenario.

To debug a client app, firstly run the app:

```bash
yarn dev:client
```

Another way is to create and configure `tasks.json` to start the client app automatically. This task should be registered in the `launch.json` file in the `preLaunchTask` property.

Then press `F5` (or click the green arrow) to launch the debugger and open a new browser instance.

In the same way, you can run the server in debug mode by selecting the `Debug Server app` configuration and pressing `F5` (or clicking the green arrow).

[[see commit changes]](https://github.com/trofimchuk-t/nodejs-monorepo-template/commit/52364463f3bea78955f0e1c8c302379ba2f26a71)

## 13. Use Redux Toolkit as a State Manager

Install [Redux Toolkit](https://redux.js.org/introduction/installation) and [react-redux](https://react-redux.js.org/introduction/getting-started) packages:

```bash
yarn workspace test-app-client add @reduxjs/toolkit
yarn workspace test-app-client add react-redux
```

Create `transactionsSlice.ts` file with a slice for transactions.\
Add async actions, add selectors to precompute derived state.\
Add `store.ts` file with a store configuration.\
Create `hooks.ts` with custom typed hooks to access the store and dispatch actions.\
Update components to use custom selectors and dispatch actions.

For more information, please follow https://redux.js.org/usage/configuring-your-store/.
