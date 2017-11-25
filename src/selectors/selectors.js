import {createSelector} from 'reselect'

const accountSelector = state => state.account.id;
const tokensSelector = state => state.tokens.totalSupply;
const web3Selector = state => state.web3;
const contractSelector = state => state.contract;

const appInitializedSelector = createSelector(
  accountSelector,
  tokensSelector,
  web3Selector,
  contractSelector,
  (account, tokens, web3, contract) => {
    const deployedOnNet = (account !== '' && tokens);
    const notDeployed = (web3.eth && contract.failed); /*load app even if app not deployed on this net*/
    return ( deployedOnNet || notDeployed );
  }
)

export {appInitializedSelector};
