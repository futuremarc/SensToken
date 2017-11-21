module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*"
    },
  	rpc: {
  		host: "localhost",
  		gas: 4712388,
  		port: 9545
  	},
  	solc: {
  		optimizer: {
  			enabled: true,
  			runs: 200
  		}
  	}
  }
};

//testrpc -p 8545 --gasLimit 6721975 --gasPrice 100000000000
