# SensToken
A token sale dApp for SensTokens built with react, redux, and truffle.

[See it here](https://futuremarc.github.io/SensToken/)

## Install

1. Make sure you have truffle installed globally `npm install -g truffle`.
2. `npm install` or `yarn install`
3. Run in `truffle develop` on port `9545`.

## Available Scripts

### `npm run dev`

this script will build the contracts and migrate them to port `9545` then open the app in dev mode at [http://localhost:3000](http://localhost:3000).<br>

### `npm run build`

Builds the app for production and compiles the contracts.

### `npm run migrate:rinkeby`

Migrates the contract to the rinkeby network.

### `npm run migrate:local`

Migrates the contract to your local network on port `9545`.

### `npm run deploy`

Migrates the contract to rinkeby and deploys to gh-pages.

### `npm run test`

Tests the solidity contracts and react app.


## TO DO
* Add tip to check MetaMask popup on purchase.
* Add tip to add contract address into MetaMask Tokens list afterwords.
* Handle account and network changes from MetaMask.
* Write unit tests.
