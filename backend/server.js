// // server.js - Backend Proxy for CampusDash API
// const express = require('express');
// const cors = require('cors');
// const crypto = require('crypto');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// // Validate environment variables
// const requiredEnvVars = ['API_KEY', 'API_SECRET', 'API_URL'];
// const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

// if (missingVars.length > 0) {
//   console.error('❌ Error: Missing required environment variables:');
//   missingVars.forEach(envVar => console.error(`   - ${envVar}`));
//   console.error('\nPlease check your .env file and ensure all variables are set.');
//   process.exit(1);
// }

// console.log('✓ All environment variables loaded');
// console.log(`  API_KEY: ${process.env.API_KEY.substring(0, 10)}...`);
// console.log(`  API_URL: ${process.env.API_URL}`);

// // Helper function to generate HMAC signature
// function generateSignature(message, secret) {
//   return crypto.createHmac('sha256', secret).update(message).digest('hex');
// }

// // Helper function to generate random nonce
// function generateNonce() {
//   return crypto.randomBytes(8).toString('hex');
// }

// // Validate email format
// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// // POST endpoint to add email to waitlist
// app.post('/api/waitlist', async (req, res) => {
//   console.log('📧 Waitlist request received');
//   console.log('Request body:', req.body);

//   try {
//     const { email } = req.body;

//     // Validate email
//     if (!email || typeof email !== 'string') {
//       console.log('❌ Validation failed: Email is required');
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       });
//     }

//     if (!isValidEmail(email.trim())) {
//       console.log('❌ Validation failed: Invalid email format');
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid email format'
//       });
//     }

//     console.log('✓ Email validated:', email.trim());

//     // Check if we should use mock mode (for testing when API is unreachable)
//     const useMockMode = process.env.USE_MOCK_API === 'true';

//     if (useMockMode) {
//       console.log('🧪 MOCK MODE: Simulating successful API response');
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       return res.status(200).json({
//         success: true,
//         message: 'Successfully added to waitlist',
//         data: {
//           email: email.trim(),
//           status: 'added',
//           timestamp: new Date().toISOString(),
//           mock: true
//         }
//       });
//     }

//     // Prepare request body for CampusDash API
//     const requestBody = JSON.stringify({ email: email.trim() });
    
//     // Generate timestamp and nonce
//     const timestamp = Math.floor(Date.now() / 1000).toString();
//     const nonce = generateNonce();
//     const action = 'waitlist';

//     // Build canonical message
//     const message = `${process.env.API_KEY}|${action}|${timestamp}|${requestBody}`;
//     console.log('📝 Canonical message:', message);

//     // Generate HMAC signature
//     const signature = generateSignature(message, process.env.API_SECRET);
//     console.log('🔐 Generated signature:', signature.substring(0, 20) + '...');

//     const headers = {
//       'X-Api-Key': process.env.API_KEY,
//       'X-Signature': signature,
//       'X-Timestamp': timestamp,
//       'X-Nonce': nonce,
//       'ACT': action,
//       'Content-Type': 'application/json'
//     };

//     console.log('📤 Sending request to CampusDash API...');
//     console.log('URL:', process.env.API_URL);
//     console.log('Headers:', JSON.stringify(headers, null, 2));

//     // Make request to CampusDash API with timeout
//     const fetch = (await import('node-fetch')).default;
//     const controller = new AbortController();
//     const timeout = setTimeout(() => {
//       controller.abort();
//     }, 15000); // 15 second timeout

//     let response;
//     try {
//       response = await fetch(process.env.API_URL, {
//         method: 'POST',
//         headers: headers,
//         body: requestBody,
//         signal: controller.signal,
//         timeout: 15000
//       });
//       clearTimeout(timeout);
//     } catch (fetchError) {
//       clearTimeout(timeout);
      
//       if (fetchError.name === 'AbortError') {
//         console.error('⏱️ Request timeout - API took too long to respond');
//         return res.status(504).json({
//           success: false,
//           message: 'API request timed out. The API server may be down. Contact your backend developer or enable mock mode with USE_MOCK_API=true in .env'
//         });
//       }
      
//       console.error('🌐 Network error:', fetchError.message);
//       console.error('Error code:', fetchError.code);
//       console.error('Error type:', fetchError.type);
      
//       // Check specific error types
//       if (fetchError.code === 'ETIMEDOUT' || fetchError.code === 'ESOCKETTIMEDOUT') {
//         return res.status(504).json({
//           success: false,
//           message: 'Connection to API timed out. The API server might be down or unreachable. Try enabling mock mode with USE_MOCK_API=true in .env for testing.'
//         });
//       }
      
//       if (fetchError.code === 'ENOTFOUND') {
//         return res.status(502).json({
//           success: false,
//           message: 'API server not found. Please check the API_URL in your .env file.'
//         });
//       }
      
//       if (fetchError.code === 'ECONNREFUSED') {
//         return res.status(502).json({
//           success: false,
//           message: 'Connection refused by API server.'
//         });
//       }
      
//       // Generic network error
//       return res.status(502).json({
//         success: false,
//         message: 'Unable to connect to API server. Try enabling mock mode with USE_MOCK_API=true in .env',
//         error: process.env.NODE_ENV === 'development' ? {
//           code: fetchError.code,
//           message: fetchError.message
//         } : undefined
//       });
//     }

//     console.log('📥 Response status:', response.status, response.statusText);

//     const contentType = response.headers.get('content-type');
//     let data;

//     if (contentType && contentType.includes('application/json')) {
//       data = await response.json();
//       console.log('Response data:', JSON.stringify(data, null, 2));
//     } else {
//       const text = await response.text();
//       console.log('Response text:', text);
//       data = { message: text };
//     }

//     // Forward the response from CampusDash API
//     if (response.ok) {
//       console.log('✅ Successfully added to waitlist');
//       return res.status(200).json({
//         success: true,
//         message: 'Successfully added to waitlist',
//         data: data
//       });
//     } else {
//       console.log('❌ CampusDash API returned error');
//       return res.status(response.status).json({
//         success: false,
//         message: data.message || 'Failed to add email to waitlist',
//         error: data
//       });
//     }

//   } catch (error) {
//     console.error('💥 Server error:', error);
//     console.error('Error stack:', error.stack);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: process.env.NODE_ENV === 'development' ? {
//         message: error.message,
//         stack: error.stack
//       } : undefined
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', message: 'Server is running' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`✓ Server running on port ${PORT}`);
//   console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`✓ API URL: ${process.env.API_URL}`);
// });



const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
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

    // Check if we should use mock mode (for testing when API is unreachable)
    const useMockMode = process.env.USE_MOCK_API === 'true';

    if (useMockMode) {
      console.log('🧪 MOCK MODE: Simulating successful API response');
      
      // Simulate API delay
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
      'Accept': 'application/json'
    };

    console.log('📤 Sending request to CampusDash API...');
    console.log('URL:', process.env.API_URL);
    console.log('Method: POST');
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Body:', requestBody);

    // Make request to CampusDash API with timeout
    const fetch = (await import('node-fetch')).default;
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 15000); // 15 second timeout

    let response;
    try {
      response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: headers,
        body: requestBody,
        signal: controller.signal,
        timeout: 15000
      });
      clearTimeout(timeout);
    } catch (fetchError) {
      clearTimeout(timeout);
      
      if (fetchError.name === 'AbortError') {
        console.error('⏱️ Request timeout - API took too long to respond');
        return res.status(504).json({
          success: false,
          message: 'API request timed out. The API server may be down. Contact your backend developer or enable mock mode with USE_MOCK_API=true in .env'
        });
      }
      
      console.error('🌐 Network error:', fetchError.message);
      console.error('Error code:', fetchError.code);
      console.error('Error type:', fetchError.type);
      
      // Check specific error types
      if (fetchError.code === 'ETIMEDOUT' || fetchError.code === 'ESOCKETTIMEDOUT') {
        return res.status(504).json({
          success: false,
          message: 'Connection to API timed out. The API server might be down or unreachable. Try enabling mock mode with USE_MOCK_API=true in .env for testing.'
        });
      }
      
      if (fetchError.code === 'ENOTFOUND') {
        return res.status(502).json({
          success: false,
          message: 'API server not found. Please check the API_URL in your .env file.'
        });
      }
      
      if (fetchError.code === 'ECONNREFUSED') {
        return res.status(502).json({
          success: false,
          message: 'Connection refused by API server.'
        });
      }
      
      // Generic network error
      return res.status(502).json({
        success: false,
        message: 'Unable to connect to API server. Try enabling mock mode with USE_MOCK_API=true in .env',
        error: process.env.NODE_ENV === 'development' ? {
          code: fetchError.code,
          message: fetchError.message
        } : undefined
      });
    }

    console.log('📥 Response status:', response.status, response.statusText);

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
    } else {
      const text = await response.text();
      console.log('Response text:', text);
      data = { message: text };
    }

    // Forward the response from CampusDash API
    if (response.ok) {
      console.log('✅ Successfully added to waitlist');
      return res.status(200).json({
        success: true,
        message: 'Successfully added to waitlist',
        data: data
      });
    } else {
      console.log('❌ CampusDash API returned error');
      return res.status(response.status).json({
        success: false,
        message: data.message || 'Failed to add email to waitlist',
        error: data
      });
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


