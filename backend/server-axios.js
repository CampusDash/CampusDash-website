// server-axios.js - Alternative backend using axios (better PHP compatibility)
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Validate environment variables
const requiredEnvVars = ['API_KEY', 'API_SECRET', 'API_URL'];
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error('❌ Error: Missing required environment variables:');
  missingVars.forEach(envVar => console.error(`   - ${envVar}`));
  console.error('\nPlease check your .env file and ensure all variables are set.');
  process.exit(1);
}

console.log('✓ All environment variables loaded');
console.log(`  API_KEY: ${process.env.API_KEY.substring(0, 10)}...`);
console.log(`  API_URL: ${process.env.API_URL}`);

// Helper function to generate HMAC signature
function generateSignature(message, secret) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

// Helper function to generate random nonce
function generateNonce() {
  return crypto.randomBytes(8).toString('hex');
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show toast notification
const showToast = (message, type = 'success') => {
  setToast({ show: true, message, type });
  setTimeout(() => {
    setToast({ show: false, message: '', type: '' });
  }, 4000);
};

// POST endpoint to add email to waitlist
app.post('/api/waitlist', async (req, res) => {
  console.log('📧 Waitlist request received');
  console.log('Request body:', req.body);

  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      console.log('❌ Validation failed: Email is required');
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    if (!isValidEmail(email.trim())) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    console.log('✓ Email validated:', email.trim());

    // Check if we should use mock mode
    const useMockMode = process.env.USE_MOCK_API === 'true';

    if (useMockMode) {
      console.log('🧪 MOCK MODE: Simulating successful API response');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return res.status(200).json({
        success: true,
        message: 'Successfully added to waitlist',
        data: {
          email: email.trim(),
          status: 'added',
          timestamp: new Date().toISOString(),
          mock: true
        }
      });
    }

    // Prepare request body for CampusDash API
    const requestBody = JSON.stringify({ email: email.trim() });
    
    // Generate timestamp and nonce
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = generateNonce();
    const action = 'waitlist';

    // Build canonical message
    const message = `${process.env.API_KEY}|${action}|${timestamp}|${requestBody}`;
    console.log('📝 Canonical message:', message);

    // Generate HMAC signature
    const signature = generateSignature(message, process.env.API_SECRET);
    console.log('🔐 Generated signature:', signature.substring(0, 20) + '...');

    const headers = {
      'X-Api-Key': process.env.API_KEY,
      'X-Signature': signature,
      'X-Timestamp': timestamp,
      'X-Nonce': nonce,
      'ACT': action,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'WaitlistBackend/1.0'
    };

    console.log('📤 Sending request to CampusDash API...');
    console.log('URL:', process.env.API_URL);
    console.log('Method: POST');
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Body:', requestBody);

    try {
      // Make request using axios (better for PHP servers)
      const response = await axios({
        method: 'POST',
        url: process.env.API_URL,
        headers: headers,
        data: requestBody,
        timeout: 15000,
        validateStatus: null, // Don't throw on any status
        maxRedirects: 5
      });

      console.log('📥 Response status:', response.status, response.statusText);
      console.log('Response headers:', response.headers);
      console.log('Response data:', JSON.stringify(response.data, null, 2));

      // Forward the response from CampusDash API
      if (response.status >= 200 && response.status < 300) {
        console.log('✅ Successfully added to waitlist');
        return res.status(200).json({
          success: true,
          message: 'Successfully added to waitlist',
          data: response.data
        });
      } else {
        console.log('❌ CampusDash API returned error');
        return res.status(response.status).json({
          success: false,
          message: response.data.message || response.data.error || 'Failed to add email to waitlist',
          error: response.data
        });
      }

    } catch (axiosError) {
      console.error('🌐 Request error:', axiosError.message);
      
      if (axiosError.response) {
        // Server responded with error status
        console.error('Response status:', axiosError.response.status);
        console.error('Response data:', axiosError.response.data);
        
        return res.status(axiosError.response.status).json({
          success: false,
          message: axiosError.response.data.message || axiosError.response.data.error || 'API request failed',
          error: axiosError.response.data
        });
      } else if (axiosError.request) {
        // Request made but no response
        console.error('No response received from API');
        return res.status(504).json({
          success: false,
          message: 'No response from API server. It may be down or unreachable.'
        });
      } else {
        // Request setup error
        console.error('Request setup error:', axiosError.message);
        return res.status(500).json({
          success: false,
          message: 'Failed to setup API request'
        });
      }
    }

  } catch (error) {
    console.error('💥 Server error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API URL: ${process.env.API_URL}`);
});