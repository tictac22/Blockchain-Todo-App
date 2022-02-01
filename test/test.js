const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Todo contract", () => {
  let owner;
  let contract;
  let addr1;
  beforeEach(async () => {
    [owner,addr1] = await ethers.getSigners();
    const Todo = await ethers.getContractFactory("Todo");
    contract = await Todo.deploy();
    
  });
  describe("Changing todo list", () => {
    beforeEach(async () => {
      await contract.addTodo("first deploy");
    })
    it("adds task", async () => {
      const todo = await contract.getTodo();
      expect(todo[0].text).to.equal("first deploy");
      expect(todo[0].id.toNumber()).to.equal(1);
    })
    it("doesn't add empty stirng", async () => {
      await expect(contract.addTodo("")).to.be.revertedWith("Empty string");
    })
    it("toggles task", async () => {
      await contract.toggledTask(1);
      const todo = await contract.getTodo();
      expect(todo[0].completed).to.equal(true);
    })
    it("deletes task", async () => {
      await contract.deleteTask(1);
      const todo = await contract.getTodo();
      expect(todo[0].id.toNumber()).to.equal(0);
    })
    it("gets todo with error", async () => {
      await expect(contract.connect(addr1).getTodo()).to.be.revertedWith("You don't have todos");
    });
  })
  describe("events and modifier",() => {
    it("triggers events", async () => {
        await expect(contract.addTodo("first deploy")).to.emit(contract,"AddedTask").withArgs(owner.address,"first deploy");
        await expect(contract.toggledTask(1)).to.emit(contract,"ToggledTask").withArgs(1,true);
        await expect(contract.deleteTask(1)).to.emit(contract,"DeletedTask").withArgs(1,"first deploy");
    })
    it("doesn't accept with param id = 0", async () => {
      await expect(contract.toggledTask(0)).to.be.revertedWith("Invalid id");
    })
  })
});

