var SensysToken = artifacts.require("./SensysToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SensysToken);
};
