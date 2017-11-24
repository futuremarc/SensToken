let rpcUrl;
process.env.NODE_ENV !== 'production' ? rpcUrl = 'http://localhost:9545' : rpcUrl = 'https://rinkeby.infura.io/';
const config = {
  rpcUrl,
  localMnemonic: 'senior field myself usage spare purse lecture worry harsh mercy interest exile',
  rinkebyMnemonic: 'slender lyrics cloud rifle author enhance tray jelly vapor item blame coin'
};

export default config;
