const express = require('express');
const Web3 = require('web3');
const DeFiManagerABI = require('./DeFiManagerABI.json');

const app = express();
const PORT = 3000;

// Connect to Ethereum (use Infura/Alchemy in production)
const web3 = new Web3('http://localhost:8545'); 
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contract = new web3.eth.Contract(DeFiManagerABI, contractAddress);

// API Endpoint to get user balance
app.get('/balance/:address', async (req, res) => {
  try {
    const balance = await contract.methods.balances(req.params.address).call();
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
