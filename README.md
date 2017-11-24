# SensToken
A token sale for SenseTokens built with react, redux, and solidity

## Install

`npm install` or `yarn install`

## Available Scripts

### `npm run dev`

Assuming you have Truffle 4 (`npm install -g truffle`) running in `truffle develop` in a terminal instance this script will build the contracts and migrate them on port `9545`<br>
It then opens [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload or hot reload on edits.<br>

### `npm run build`

Builds the app for production.

### `npm run migrate:rinkeby`

Migrates the contract to the rinkeby network

### `npm run migrate:rinkeby`

Migrates the contract to your local network on port `9545`

## TO DO

* Write unit tests for contracts and redux actions, reducers, selectors, sagas, or other middleware.
* Detect account changes in MetaMask (Will probably wait for a better way to listen for account changes than the  recommended `setInterval`...)
