module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
    rinkeby: {
      host: "https://rinkeby.infura.io/",
      port: 80,
      from: "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544",
      gas: 6721975
    },
  	solc: {
  		optimizer: {
  			enabled: true,
  			runs: 200
  		}
  	}
  }
};
