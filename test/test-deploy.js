const {ethers} = require("hardhat")
const {assert, expect} = require("chai")


describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
        //expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async function() {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add a person and update nameToFavoriteNumber", async function() {
        const name = "Alice"
        const favoriteNumber = "42"
        const transactionResponse = await simpleStorage.addPerson(name, favoriteNumber)
        await transactionResponse.wait(1)

        const person = await simpleStorage.people(0)
        assert.equal(person.name, name)
        assert.equal(person.favoriteNumber.toString(), favoriteNumber.toString())

        const mappedValue = await simpleStorage.nameToFavorite(name)
        assert.equal(mappedValue.toString(), favoriteNumber.toString())
    })
})

//To run our test: yarn hardhat test
// If you have a thousand tests, and you want to only run one test: yarn hardhat test --grep store, or putting the only keyword in addition to our "it"
// it.only("jdj", () => {})















