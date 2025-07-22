import express from 'express';
import Web3 from 'web3';
import cors from 'cors';
import 'dotenv/config';

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Web3 Configuration
const web3 = new Web3(process.env.INFURA_URL || 'http://localhost:8545');
const contractABI = [
  {
    "inputs": [],
    "name": "hello",
    "outputs": [{"internalType": "string","name": "","type": "string"}],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address","name": "token","type": "address"},
      {"internalType": "uint256","name": "amount","type": "uint256"}
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contract = new web3.eth.Contract(
  contractABI,
  process.env.CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
);

// Test Endpoint
app.get('/test', async (req, res) => {
  try {
    const message = await contract.methods.hello().call();
    res.json({ 
      status: 'API is working!',
      contractMessage: message,
      network: await web3.eth.net.getId()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${PORT}
  📡 Connected to: ${web3.currentProvider.host}
  📜 Contract: ${contract.options.address}
  `);
});
