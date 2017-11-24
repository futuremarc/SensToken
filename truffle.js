var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  ontracts_build_directory: "./output",
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
      from: "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544",
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
      return new HDWalletProvider("slender lyrics cloud rifle author enhance tray jelly vapor item blame coin", "https://rinkeby.infura.io/");
    },
    network_id: '4'
  },
  test: {
    provider: function() {
      return new HDWalletProvider("senior field myself usage spare purse lecture worry harsh mercy interest exile", "http://localhost:8546/");
    },
    network_id: '*'
  },
  }
};
