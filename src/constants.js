import Token from './Token.json';

export let DEPLOYED_NETWORK_NAME; /*get the network which contract is deployed*/

if (Token.networks['1']) DEPLOYED_NETWORK_NAME = 'Main Network';
else if (Token.networks['3']) DEPLOYED_NETWORK_NAME = 'Ropsten Network';
else if (Token.networks['4']) DEPLOYED_NETWORK_NAME = 'Rinkeby Network';
else DEPLOYED_NETWORK_NAME = 'Local Network';

export const INITIALIZE_APP = 'INITIALIZE_APP';
export const GET_WEB3 = 'GET_WEB3';
export const GET_WEB3_DONE = 'GET_WEB3_DONE';
export const GET_WALLET = 'GET_WALLET';
export const GET_WALLET_DONE = 'GET_WALLET_DONE';
export const GET_WALLET_FAILED = 'GET_WALLET_FAILED';
export const GET_TOKENS = 'GET_TOKENS';
export const GET_TOKENS_DONE = 'GET_TOKENS_DONE';
export const GET_CONTRACT = 'GET_CONTRACT';
export const GET_CONTRACT_DONE = 'GET_CONTRACT_DONE';
export const GET_CONTRACT_FAILED = 'GET_CONTRACT_FAILED';
export const BUY_TOKENS = 'BUY_TOKENS';
export const BUY_TOKENS_DONE = 'BUY_TOKENS_DONE';
export const BUY_TOKENS_FAILED = 'BUY_TOKENS_FAILED';
