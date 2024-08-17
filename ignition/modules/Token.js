const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenModule", (m) => {
  const initialSupply = 1000000; 
  const tokenContract = m.contract("Token", [initialSupply]);

  return { tokenContract };
});
