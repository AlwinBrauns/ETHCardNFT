const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const CardsOwnership = await hre.ethers.getContractFactory("CardsOwnership")
  const cardsOwnership = await CardsOwnership.deploy()
  const TransactionManager = await hre.ethers.getContractFactory("CardTransactionManager")
  const transactionManager = await TransactionManager.deploy()
  const OfferFactory = await hre.ethers.getContractFactory("OfferFactory")
  const offerFactory = await OfferFactory.deploy()

  const addressJSON = JSON.stringify({
    cards: cardsOwnership.address,
    transactions: transactionManager.address,
    offerFactory: offerFactory.address
  }, null, 4)
  fs.writeFileSync("src/address.json", addressJSON, err => {
    console.log("error while writing json")
  })
  console.log("CardsOwnership deployed to:", cardsOwnership.address)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
