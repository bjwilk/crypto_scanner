const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config()

const app = express();
const PORT = 3001; // Choose any available port

// Enable CORS middleware
app.use(cors());

// Define a route to proxy requests to the CoinMarketCap API
app.get('/api/coins', async (req, res) => {
  try {
    // Make a request to the CoinMarketCap API
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': `${process.env.API_KEY}`, // Replace with your CoinMarketCap API key
      },
    });
    // Forward the response from CoinMarketCap API to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
