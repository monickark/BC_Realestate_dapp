//const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Realestate contract", function () {
  
  it("List New Property", async function() {
    const [addr1, addr2] = await ethers.getSigners();

    const realEstateContract = await ethers.deployContract("RealEstateContract");

    let propId = await realEstateContract.listProperty(addr1, 100, "Casagrand", 
                "Gated Community", 
                "https://cdn.pixabay.com/photo/2024/03/04/16/07/winter-8612635_1280.jpg",
                "Perumbakkam"
            ); 
    console.log("propId : "+ propId);
  });
});