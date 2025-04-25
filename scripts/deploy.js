const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying TaxedERC20 with account:", deployer.address);

  const name = "Taxed Token";
  const symbol = "TAX";
  const initialSupply = hre.ethers.utils.parseUnits("1000000", 18); // 1,000,000 tokens
  const taxRate = 300; // 3% in basis points
  const taxWallet = deployer.address; // Initially tax goes to deployer

  const TaxedERC20 = await hre.ethers.getContractFactory("TaxedERC20");
  const token = await TaxedERC20.deploy(name, symbol, initialSupply, taxRate, taxWallet);

  await token.deployed();

  console.log("✅ TaxedERC20 deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
