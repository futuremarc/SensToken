let rpcUrl;

process.env.NODE_ENV !== 'production' ?  rpcUrl = 'https://rinkeby.infura.io/' : 'http://localhost:9545';

const config = {rpcUrl};

export default config;
