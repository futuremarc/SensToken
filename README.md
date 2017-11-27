# SensToken
A token sale dApp for SensTokens built with react, redux, and truffle

[See it here](https://futuremarc.github.io/SensToken/)

## Install

`npm install` or `yarn install`

## Available Scripts

### `npm run dev`

Install Truffle 4 (`npm install -g truffle`) and run in `truffle develop`, this script will build the contracts and migrate them on port `9545` and open the app in dev mode at [http://localhost:3000](http://localhost:3000).<br>

### `npm run build`

Builds the app for production and compiles the contracts.

### `npm run migrate:rinkeby`

Migrates the contract to the rinkeby network.

### `npm run migrate:local`

Migrates the contract to your local network on port `9545`

### `npm run deploy`

Migrates the contract to rinkeby and deploys to gh-pages.

### `npm run test`

Tests the solidity contracts and react app.




## TO DO
* Add tip to check metamask popup.
* Add tip to add contract address to metamask afterwords.
* Detect account changes from MetaMask.
* Write unit tests.
