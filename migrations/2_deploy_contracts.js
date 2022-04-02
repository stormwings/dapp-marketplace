const Marketplace = artifacts.require("Marketplace");
// const SocialNetwork = artifacts.require("SocialNetwork");

module.exports = function(deployer) {
    deployer.deploy(Marketplace);
    // deployer.deploy(SocialNetwork);
};