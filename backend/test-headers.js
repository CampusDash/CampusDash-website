// test-headers.js - Test different header formats
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const testEmail = 'test@example.com';
const requestBody = JSON.stringify({ email: testEmail });
const timestamp = Math.floor(Date.now() / 1000).toString();
const nonce = crypto.randomBytes(8).toString('hex');
const action = 'waitlist';

// Build canonical message
const message = `${process.env.API_KEY}|${action}|${timestamp}|${requestBody}`;

// Generate HMAC signature
const signature = crypto.createHmac('sha256', process.env.API_SECRET)
  .update(message)
  .digest('hex');

console.log('\n=== Testing Different Header Formats ===\n');

// Test 1: Standard headers (current approach)
async function test1() {
  console.log('Test 1: Standard X- prefixed headers');
  try {
    const response = await axios({
      method: 'POST',
      url: process.env.API_URL,
      headers: {
        'X-Api-Key': process.env.API_KEY,
        'X-Signature': signature,
        'X-Timestamp': timestamp,
        'X-Nonce': nonce,
        'ACT': action,
        'Content-Type': 'application/json'
      },
      data: requestBody,
      timeout: 10000,
      validateStatus: null
    });
    
    console.log('✓ Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    if (response.status === 200) return true;
  } catch (error) {
    console.log('✗ Error:', error.message);
  }
  console.log('');
  return false;
}

// Test 2: Without X- prefix
async function test2() {
  console.log('Test 2: Headers without X- prefix');
  try {
    const response = await axios({
      method: 'POST',
      url: process.env.API_URL,
      headers: {
        'Api-Key': process.env.API_KEY,
        'Signature': signature,
        'Timestamp': timestamp,
        'Nonce': nonce,
        'ACT': action,
        'Content-Type': 'application/json'
      },
      data: requestBody,
      timeout: 10000,
      validateStatus: null
    });
    
    console.log('✓ Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    if (response.status === 200) return true;
  } catch (error) {
    console.log('✗ Error:', error.message);
  }
  console.log('');
  return false;
}

// Test 3: All uppercase
async function test3() {
  console.log('Test 3: All uppercase headers');
  try {
    const response = await axios({
      method: 'POST',
      url: process.env.API_URL,
      headers: {
        'X-API-KEY': process.env.API_KEY,
        'X-SIGNATURE': signature,
        'X-TIMESTAMP': timestamp,
        'X-NONCE': nonce,
        'ACT': action,
        'CONTENT-TYPE': 'application/json'
      },
      data: requestBody,
      timeout: 10000,
      validateStatus: null
    });
    
    console.log('✓ Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    if (response.status === 200) return true;
  } catch (error) {
    console.log('✗ Error:', error.message);
  }
  console.log('');
  return false;
}

// Test 4: Lowercase
async function test4() {
  console.log('Test 4: Lowercase headers');
  try {
    const response = await axios({
      method: 'POST',
      url: process.env.API_URL,
      headers: {
        'x-api-key': process.env.API_KEY,
        'x-signature': signature,
        'x-timestamp': timestamp,
        'x-nonce': nonce,
        'act': action,
        'content-type': 'application/json'
      },
      data: requestBody,
      timeout: 10000,
      validateStatus: null
    });
    
    console.log('✓ Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    if (response.status === 200) return true;
  } catch (error) {
    console.log('✗ Error:', error.message);
  }
  console.log('');
  return false;
}

// Test 5: Using HTTP_ prefix (PHP style)
async function test5() {
  console.log('Test 5: HTTP_ prefixed headers (PHP $_SERVER style)');
  try {
    const response = await axios({
      method: 'POST',
      url: process.env.API_URL,
      headers: {
        'HTTP_X_API_KEY': process.env.API_KEY,
        'HTTP_X_SIGNATURE': signature,
        'HTTP_X_TIMESTAMP': timestamp,
        'HTTP_X_NONCE': nonce,
        'HTTP_ACT': action,
        'Content-Type': 'application/json'
      },
      data: requestBody,
      timeout: 10000,
      validateStatus: null
    });
    
    console.log('✓ Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    if (response.status === 200) return true;
  } catch (error) {
    console.log('✗ Error:', error.message);
  }
  console.log('');
  return false;
}

// Run all tests
async function runTests() {
  console.log('Request Details:');
  console.log('  Email:', testEmail);
  console.log('  Timestamp:', timestamp);
  console.log('  Nonce:', nonce);
  console.log('  Signature:', signature.substring(0, 20) + '...');
  console.log('  API Key:', process.env.API_KEY.substring(0, 20) + '...');
  console.log('');

  const tests = [test1, test2, test3, test4, test5];
  
  for (let i = 0; i < tests.length; i++) {
    const success = await tests[i]();
    if (success) {
      console.log(`\n✅ SUCCESS with Test ${i + 1}!`);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between tests
  }
  
  console.log('\n❌ All header format tests failed.');
  console.log('\n💡 Next steps:');
  console.log('1. Contact backend developer to confirm exact header format expected');
  console.log('2. Check if API requires authentication in query parameters instead');
  console.log('3. Verify the endpoint.php file is correctly reading headers');
  console.log('4. Check Apache/Nginx configuration for header forwarding');
}

runTests().catch(error => {
  console.error('\n💥 Test error:', error.message);
  process.exit(1);
});