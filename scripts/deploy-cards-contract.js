const hre = require("hardhat");

async function main() {
  //const Cards = await hre.ethers.getContractFactory("Cards");
  const CardsOwnership = await hre.ethers.getContractFactory("CardsOwnership");
  //const cards = await Cards.deploy();
  const cardsOwnership = await CardsOwnership.deploy();
  
  //await cards.deployed();
  await cardsOwnership.deployed();

  //console.log("Cards deployed to:", cards.address);
  console.log("CardsOwnership deployed to:", cardsOwnership.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
