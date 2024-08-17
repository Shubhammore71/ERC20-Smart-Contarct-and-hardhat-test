# vERC20 Token Sale Platform

This repository contains a basic Hardhat project and a React application that demonstrates the use of Hardhat for deploying and testing smart contracts, along with building a Web3 token sale platform. The project includes a sample ERC20 token contract and a React Context Provider for managing interactions with the token.

## Project Structure

### Hardhat Project

- **Contracts**: The `contracts` directory contains the smart contract code.
- **Test**: The `test` directory contains tests for the smart contract using Hardhat's testing framework.
- **Ignition**: The `ignition` directory contains a Hardhat Ignition module for deploying the contract.

### Next.js App Structure

The Next.js app includes the following directory structure:

- **components**: Contains reusable React components.
- **context**: Provides React context for state management (includes `ERC20Provider` component).
- **contracts**: Includes smart contract ABIs and other related files.
- **ignition/modules**: Contains modules for Hardhat Ignition deployment.
- **pages**: Contains Next.js pages.
- **public**: Static assets like images and fonts.
- **styles**: Global styles and CSS files.
- **test**: Test files for the Next.js application.

## Getting Started

To get started with this project, follow the instructions below:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Install the required dependencies by running:

```bash
npm install
```

### 3. Compile the Contracts

Compile the smart contracts using the Hardhat CLI:

```bash
npx hardhat compile
```

### 4. Run Tests

Run the provided tests to ensure that everything is working correctly:

```bash
npx hardhat test
```

To run tests with gas reporting enabled:

```bash
REPORT_GAS=true npx hardhat test
```

### 5. Deploy the Contracts

You can deploy the contracts to a local Hardhat network using the following command:

```bash
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

### 6. Build Your Own Token Sale Platform

This repository provides the foundation for building a Web3 token sale platform using ERC20 tokens. You can extend the functionality by adding features such as:

- **Custom Pricing**: Implement a pricing strategy for your token sale.
- **Whitelist**: Add a whitelist feature to restrict purchases to specific addresses.
- **Token Vesting**: Implement a vesting schedule for purchased tokens.

### 7. Build Your Next.js App

The provided Next.js app structure serves as a starting point for building your Web3 application. You can follow this structure to organize your components, context, pages, and other files. 

### 8. React Context Provider

The `context/ERC20Provider.js` file contains a React Context Provider component for managing interactions with the ERC20 token smart contract. It includes methods for:

- **Checking Connection**: Connect to the Ethereum wallet and fetch account details.
- **Fetching Token Details**: Retrieve information about the token, including total supply, name, symbol, and owner.
- **Transferring Tokens**: Transfer tokens to a specified address.
- **Fetching Token Holder Data**: Retrieve and display data about token holders.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## Contact

For any inquiries, please contact shubham.more@iitgn.ac.in.

