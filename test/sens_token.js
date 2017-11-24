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

contract('SensToken', (accounts) => {
  it("maxSupply()", () => {
    return Token.deployed().then((instance) => {
     return instance.MAX_TOKENS();
   }).then((result) => {
     let maxTokens = 500000000;
     maxTokens /= Math.pow(10, -18);
     assert.equal(result.toNumber(), maxTokens); /*convert to wei*/
    })
  });
});
//
// it("should return the balance of token owner", function() {
//   let token;
//   return Token.deployed().then(function(instance){
//     token = instance;
//     return token.balanceOf.call(accounts[0]);
//   }).then(function(result){
//     assert.equal(result.toNumber(), 1000000, 'balance is wrong');
//   })
// });
//
// it("should transfer right token", function() {
//   let token;
//   return Token.deployed().then(function(instance){
//     token = instance;
//     return token.transfer(accounts[1], 500000);
//   }).then(function(){
//     return token.balanceOf.call(accounts[0]);
//   }).then(function(result){
//     assert.equal(result.toNumber(), 500000, 'accounts[0] balance is wrong');
//     return token.balanceOf.call(accounts[1]);
//   }).then(function(result){
//     assert.equal(result.toNumber(), 500000, 'accounts[1] balance is wrong');
//   })
// });
//
// it("should give accounts[1] authority to spend account[0]'s token", function() {
//   let token;
//   return Token.deployed().then(function(instance){
//    token = instance;
//    return token.approve(accounts[1], 200000);
//   }).then(function(){
//    return token.allowance.call(accounts[0], accounts[1]);
//   }).then(function(result){
//    assert.equal(result.toNumber(), 200000, 'allowance is wrong');
//    return token.transferFrom(accounts[0], accounts[2], 200000, {from: accounts[1]});
//   }).then(function(){
//    return token.balanceOf.call(accounts[0]);
//   }).then(function(result){
//    assert.equal(result.toNumber(), 300000, 'accounts[0] balance is wrong');
//    return token.balanceOf.call(accounts[1]);
//   }).then(function(result){
//    assert.equal(result.toNumber(), 500000, 'accounts[1] balance is wrong');
//    return token.balanceOf.call(accounts[2]);
//   }).then(function(result){
//    assert.equal(result.toNumber(), 200000, 'accounts[2] balance is wrong');
//   })
// });
//
// it("should show the transfer event", function() {
//   let token;
//   return Token.deployed().then(function(instance){
//     token = instance;
//     return token.transfer(accounts[1], 100000);
//   }).then(function(result){
//     console.log(result.logs[0].event)
//   })
// });
