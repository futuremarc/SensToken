var IERC20 = artifacts.require("./IERC20.sol");
var SensysToken = artifacts.require("./SensysToken.sol");


module.exports = function(deployer) {
  deployer.deploy(IERC20);
  deployer.deploy(SensysToken);
};
