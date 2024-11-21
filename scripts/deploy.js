//imports
const { ethers, run, network } = require("hardhat");

async function main() {
    // Get the contract factory
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying simpleStorage...");

    // Deploy the contract
    const simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();

    console.log(`Deployed contract to: ${simpleStorage.address}`);
    await simpleStorage.deployTransaction.wait(6)
    if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        //await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    //update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

//Progammatic Verification of contract
async function verify(contractAddress, args) {
    console.log("Verifying contract!");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if(e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
