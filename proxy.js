const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

const proxyUrl = 'http://customer-3xufacebook_ndSiX_ndSiX-cc-US:3xufacebook_ndSiX@pr.oxylabs.io:7777';
const agent = new HttpsProxyAgent(proxyUrl);

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  const { url, method = 'GET', headers = {}, body } = req.body;

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
      httpsAgent: agent,
      httpAgent: agent,
      timeout: 30000,
      validateStatus: () => true
    });

    res.json({
      success: true,
      statusCode: response.status,
      headers: response.headers,
      body: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
