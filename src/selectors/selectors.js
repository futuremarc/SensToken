import {createSelector} from 'reselect';

const walletSelector = state => state.wallet.id;
const tokensSelector = state => state.tokens.totalSupply;
const web3Selector = state => state.web3;
const contractSelector = state => state.contract;

const appInitializedSelector = createSelector(
  walletSelector,
  tokensSelector,
  web3Selector,
  contractSelector,
  (wallet, tokens, web3, contract) => {
    const deployedOnNet = (wallet !== '' && Object.keys(tokens).length !== 0);
    const notDeployed = (web3.eth && contract.stack); /*check if another network*/
    return ( deployedOnNet || notDeployed );
  }
);

export {appInitializedSelector};
