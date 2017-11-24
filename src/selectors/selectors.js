import {createSelector} from 'reselect'

const accountSelector = state => state.account.id;
const tokensSelector = state => state.tokens.totalSupply;

const appInitializedSelector = createSelector(
  accountSelector,
  tokensSelector,
  (account, tokens) => (account && tokens)
)

export {appInitializedSelector};
