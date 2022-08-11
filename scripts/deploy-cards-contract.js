const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const CardsOwnership = await hre.ethers.getContractFactory("CardsOwnership")
  const cardsOwnership = await CardsOwnership.deploy()
  const TransactionManager = await hre.ethers.getContractFactory("CardTransactionManager")
  const transactionManager = await TransactionManager.deploy()

  const addressJSON = JSON.stringify({
    address: cardsOwnership.address,
    transactionManager: transactionManager.address
  })
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
