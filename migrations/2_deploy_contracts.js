var SensToken = artifacts.require("SensToken");

module.exports = function(deployer) {
  deployer.deploy(SensToken);
};
