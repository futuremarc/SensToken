let Token = artifacts.require("SensToken");

contract('SensToken', (accounts) => {
  it("totalSupply()", () => {
    return Token.deployed().then((instance) => {
     return instance.totalSupply.call();
   }).then((result) => {
     assert.equal(result.toNumber(), 0);
    })
  });
});
