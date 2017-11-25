var HDWalletProvider = require("truffle-hdwallet-provider");
var config = require("./config/eth");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
    rinkeby: {
      host: "localhost",
      port: 9546,
      network_id: 4,
      from: config.rinkeby.wallet,
      gas: 6721975
    },
  	solc: {
  		optimizer: {
  			enabled: true,
  			runs: 200
  		}
  	},
  rinkeby: {
    provider: function() {
      return new HDWalletProvider(config.rinkeby.mnemonic, "https://rinkeby.infura.io/");
    },
    network_id: 4
  },
  test: {
    provider: function() {
      return new HDWalletProvider(config.local.mnemonic, "http://localhost:8546/");
    },
    network_id: "*"
  },
  }
};
