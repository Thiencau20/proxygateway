const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

// Oxylabs Residential Proxy
const proxyUrl = 'http://customer-3xufacebook_ndSiX_ndSiX-cc-US:3xufacebook_ndSiX@pr.oxylabs.io:7777';
const agent = new HttpsProxyAgent(proxyUrl);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  try {
    const { url, method = 'GET', headers = {}, body } = req.body;

    if (!url) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing URL parameter' 
      });
    }

    console.log(`[PROXY] ${method} ${url}`);

    // Make request through Oxylabs proxy
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: body,
      httpsAgent: agent,
      httpAgent: agent,
      timeout: 30000,
      maxRedirects: 5,
      validateStatus: () => true // Accept any status code
    });

    console.log(`[PROXY] Response: ${response.status}`);

    // Return to Apps Script
    res.json({
      success: true,
      statusCode: response.status,
      headers: response.headers,
      body: response.data
    });

  } catch (error) {
    console.error('[PROXY ERROR]', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
