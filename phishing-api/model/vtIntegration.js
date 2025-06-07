// vtIntegration.js
require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

const VT_API_KEY = process.env.VIRUSTOTAL_API_KEY;

// Submit URL for analysis
export async function submitUrl(url) {
  try {
    const response = await axios.post(
      'https://www.virustotal.com/api/v3/urls',
      qs.stringify({ url }),
      {
        headers: {
          'x-apikey': VT_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.data.id; // analysis_id
  } catch (error) {
    console.error('Error submitting URL:', error.response?.data || error.message);
    throw error;
  }
}

// Retrieve analysis report
export async function getAnalysisReport(analysisId) {
  try {
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: {
          'x-apikey': VT_API_KEY,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error retrieving analysis report:', error.response?.data || error.message);
    throw error;
  }
}

// Retrieve detailed URL report
export async function getUrlReport(url) {
  try {
    const urlId = Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/urls/${urlId}`,
      {
        headers: {
          'x-apikey': VT_API_KEY,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error retrieving URL report:', error.response?.data || error.message);
    throw error;
  }
}