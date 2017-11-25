# SensToken
A token sale dApp for SensTokens built with react, redux, and truffle

## Install

`npm install` or `yarn install`

## Available Scripts

### `npm run dev`

Assuming you have Truffle 4 (`npm install -g truffle`) running in `truffle develop` in a terminal instance this script will build the contracts and migrate them on port `9545`. It will open [http://localhost:3000](http://localhost:3000) to view it in the browser and the page will reload or hot reload on edits.<br><br>
**Make sure your MetaMask is signed in and connected to localhost:9545!**

### `npm run build`

Builds the app for production and compiles the contracts.

### `npm run migrate:rinkeby`

Migrates the contract to the rinkeby network. A local rpc must be running on port `9546`

### `npm run migrate:local`

Migrates the contract to your local network on port `9545`

## TO DO
* Handle when users have MetaMask but not being signed in, currently hangs
* Clear warning when users are on a network without the contract deployed
* Write unit tests for contracts, actions, reducers, selectors, sagas, and other middleware.
* Detect account changes in MetaMask (Will probably wait for a better way to listen for account changes than the  recommended `setInterval`...)
