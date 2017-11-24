let rpcUrl;
process.env.NODE_ENV !== 'production' ? rpcUrl = 'http://localhost:9545' : rpcUrl = 'https://rinkeby.infura.io/';
const config = {rpcUrl};

export default config;
