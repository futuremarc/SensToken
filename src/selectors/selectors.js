import {createSelector} from 'reselect';

const walletSelector = state => state.wallet.id;
const tokenSelector = state => state.token.totalSupply;
const web3Selector = state => state.web3;
const contractSelector = state => state.contract;

const appInitializedSelector = createSelector(
  walletSelector,
  tokenSelector,
  web3Selector,
  contractSelector,
  (wallet, token, web3, contract) => {
    const contractFailed = (!contract || contract.stack)
    const deployedAndReady = (wallet !== '' && Object.keys(token).length !== 0);
    const notDeployedAndReady = (web3.eth && contractFailed); /*check if contract deployed here*/
    return (deployedAndReady || notDeployedAndReady);
  }
);

export {appInitializedSelector};
