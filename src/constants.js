import Token from './Token.json';

export let NETWORK_NAME_DEPLOYED; /*get the network which contract is deployed*/

if (Token.networks['1']) NETWORK_NAME_DEPLOYED = 'Main';
else if (Token.networks['3']) NETWORK_NAME_DEPLOYED = 'Ropsten';
else if (Token.networks['4']) NETWORK_NAME_DEPLOYED = 'Rinkeby';
else NETWORK_NAME_DEPLOYED = 'Local';

/*make sure to edit these 3 if needed*/
export const RPC_URL_LOCAL = 'http://localhost:9545';
export const RPC_URL_PRODUCTION = 'https://rinkeby.infura.io/';
export const TOKEN_TAGLINE = ''; /*if contract doesnt have tagline*/

export const INITIALIZE_APP = 'INITIALIZE_APP';
export const GET_WEB3 = 'GET_WEB3';
export const GET_WEB3_DONE = 'GET_WEB3_DONE';
export const GET_WALLET = 'GET_WALLET';
export const GET_WALLET_DONE = 'GET_WALLET_DONE';
export const GET_WALLET_FAILED = 'GET_WALLET_FAILED';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_DONE = 'GET_TOKEN_DONE';
export const GET_CONTRACT = 'GET_CONTRACT';
export const GET_CONTRACT_DONE = 'GET_CONTRACT_DONE';
export const GET_CONTRACT_FAILED = 'GET_CONTRACT_FAILED';
export const BUY_TOKEN = 'BUY_TOKEN';
export const BUY_TOKEN_DONE = 'BUY_TOKEN_DONE';
export const BUY_TOKEN_FAILED = 'BUY_TOKEN_FAILED';
