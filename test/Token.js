// Import the necessary modules
const { expect } = require("chai");

describe("Token Contract", function () {
    let Token, token, owner, addr1, addr2;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, _] = await ethers.getSigners();
        token = await Token.deploy(1000); // Deploy with an initial supply of 1000
        await token.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await token.ownerOfContract()).to.equal(owner.address);
        });

        it("Should assign the initial supply to the owner", async function () {
            expect(await token.balanceOf(owner.address)).to.equal(1000);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            await token.transfer(addr1.address, 50);
            expect(await token.balanceOf(addr1.address)).to.equal(50);
            expect(await token.balanceOf(owner.address)).to.equal(950);
        });

        it("Should emit Transfer events on transfers", async function () {
            await expect(token.transfer(addr1.address, 50))
                .to.emit(token, "Transfer")
                .withArgs(owner.address, addr1.address, 50);
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialBalance = await token.balanceOf(owner.address);
            await expect(token.transfer(addr1.address, initialBalance + 1)).to.be.revertedWith("revert");
        });
    });

    describe("Approval", function () {
        it("Should approve tokens for delegated transfer", async function () {
            await token.approve(addr1.address, 100);
            expect(await token.allowance(owner.address, addr1.address)).to.equal(100);
        });

        it("Should emit Approval events on approvals", async function () {
            await expect(token.approve(addr1.address, 100))
                .to.emit(token, "Approval")
                .withArgs(owner.address, addr1.address, 100);
        });
    });

    describe("Delegated Transfers", function () {
        it("Should transfer tokens using transferFrom", async function () {
            await token.approve(addr1.address, 100);
            await token.connect(addr1).transferFrom(owner.address, addr2.address, 50);
            expect(await token.balanceOf(addr2.address)).to.equal(50);
            expect(await token.balanceOf(owner.address)).to.equal(950);
        });

        it("Should fail if approval amount is not enough", async function () {
            await token.approve(addr1.address, 50);
            await expect(token.connect(addr1).transferFrom(owner.address, addr2.address, 100)).to.be.revertedWith("revert");
        });
    });

    describe("Token Holder Info", function () {
        it("Should return correct token holder data", async function () {
            await token.transfer(addr1.address, 100);
            const [id, to, from, total, holder] = await token.getTokenHolderData(addr1.address);
            expect(id).to.be.gt(0);
            expect(to).to.equal(addr1.address);
            expect(from).to.equal(owner.address);
            expect(total).to.equal(100);
            expect(holder).to.be.true;
        });

        it("Should return the list of token holders", async function () {
            await token.transfer(addr1.address, 50);
            await token.transfer(addr2.address, 30);
            const holders = await token.getTokenHolder();
            expect(holders).to.include(addr1.address);
            expect(holders).to.include(addr2.address);
        });
    });
});
