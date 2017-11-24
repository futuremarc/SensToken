# SensToken
A token sale dApp for SensTokens built with react, redux, and truffle

## Install

`npm install` or `yarn install`

## Available Scripts

### `npm run dev`

Assuming you have Truffle 4 (`npm install -g truffle`) running in `truffle develop` in a terminal instance this script will build the contracts and migrate them on port `9545`. It will open [http://localhost:3000](http://localhost:3000) to view it in the browser and the page will reload or hot reload on edits.<br><br>
Make sure you are connected to localhost:9545 on MetaMask! There currently is no proper handling when users are on a different network!

### `npm run build`

Builds the app for production.

### `npm run migrate:rinkeby`

Migrates the contract to the rinkeby network

### `npm run migrate:local`

Migrates the contract to your local network on port `9545`

## TO DO
* Warn and handle the case of users being on a different network
* Write unit tests for contracts and redux actions, reducers, selectors, sagas, or other middleware.
* Detect account changes in MetaMask (Will probably wait for a better way to listen for account changes than the  recommended `setInterval`...)
