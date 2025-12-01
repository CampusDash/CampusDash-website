// test-query-params.js - Test if query parameters work
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

console.log('\n=== Testing Query Parameter Approaches ===\n');
console.log('Request Details:');
console.log('  Email:', testEmail);
console.log('  Timestamp:', timestamp);
console.log('  Nonce:', nonce);
console.log('  Signature:', signature.substring(0, 20) + '...');
console.log('');

// Test 1: Query parameters with underscores
async function test1() {
  console.log('Test 1: Query parameters with underscores (api_key, x_signature, etc.)');
  
  const url = new URL(process.env.API_URL);
  url.searchParams.set('api_key', process.env.API_KEY);
  url.searchParams.set('x_signature', signature);
  url.searchParams.set('x_timestamp', timestamp);
  url.searchParams.set('x_nonce', nonce);
  url.searchParams.set('act', action);
  
  console.log('URL:', url.toString());
  
  try {
    const response = await axios({
      method: 'POST',
      url: url.toString(),
      headers: {
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

// Test 2: Query parameters with dashes (matching header names)
async function test2() {
  console.log('Test 2: Query parameters with dashes (X-Api-Key format)');
  
  const url = new URL(process.env.API_URL);
  url.searchParams.set('X-Api-Key', process.env.API_KEY);
  url.searchParams.set('X-Signature', signature);
  url.searchParams.set('X-Timestamp', timestamp);
  url.searchParams.set('X-Nonce', nonce);
  url.searchParams.set('ACT', action);
  
  console.log('URL:', url.toString());
  
  try {
    const response = await axios({
      method: 'POST',
      url: url.toString(),
      headers: {
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

// Test 3: Simplified parameter names
async function test3() {
  console.log('Test 3: Simplified parameter names (key, sig, ts, action)');
  
  const url = new URL(process.env.API_URL);
  url.searchParams.set('key', process.env.API_KEY);
  url.searchParams.set('signature', signature);
  url.searchParams.set('timestamp', timestamp);
  url.searchParams.set('nonce', nonce);
  url.searchParams.set('action', action);
  
  console.log('URL:', url.toString());
  
  try {
    const response = await axios({
      method: 'POST',
      url: url.toString(),
      headers: {
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

// Test 4: GET request instead of POST
async function test4() {
  console.log('Test 4: GET request with query parameters');
  
  const url = new URL(process.env.API_URL);
  url.searchParams.set('api_key', process.env.API_KEY);
  url.searchParams.set('signature', signature);
  url.searchParams.set('timestamp', timestamp);
  url.searchParams.set('nonce', nonce);
  url.searchParams.set('action', action);
  url.searchParams.set('email', testEmail);
  
  console.log('URL:', url.toString());
  
  try {
    const response = await axios({
      method: 'GET',
      url: url.toString(),
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

// Test 5: POST with form data instead of JSON
async function test5() {
  console.log('Test 5: POST with form-encoded data');
  
  const url = new URL(process.env.API_URL);
  url.searchParams.set('api_key', process.env.API_KEY);
  url.searchParams.set('signature', signature);
  url.searchParams.set('timestamp', timestamp);
  url.searchParams.set('nonce', nonce);
  url.searchParams.set('action', action);
  
  const formData = new URLSearchParams();
  formData.append('email', testEmail);
  
  console.log('URL:', url.toString());
  
  try {
    const response = await axios({
      method: 'POST',
      url: url.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData.toString(),
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
  const tests = [test1, test2, test3, test4, test5];
  
  for (let i = 0; i < tests.length; i++) {
    const success = await tests[i]();
    if (success) {
      console.log(`\n✅ SUCCESS with Test ${i + 1}!`);
      console.log('\n🎉 Found a working method! Update your backend to use this approach.');
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n❌ All query parameter tests failed too.');
  console.log('\n🚨 CRITICAL: The API is not accepting data via headers OR query parameters.');
  console.log('\n💡 This means:');
  console.log('1. The backend PHP code needs to be updated to handle authentication differently');
  console.log('2. OR Cloudflare needs to be configured to forward headers');
  console.log('3. OR there\'s a different authentication method we\'re not aware of');
  console.log('\n📧 You MUST contact the backend developer with this information:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Subject: Urgent - API Authentication Not Working\n');
  console.log('Hi,\n');
  console.log('The waitlist API is not accepting authentication via headers or query parameters.');
  console.log('All requests return: "Missing required headers (X-Api-Key, X-Signature, X-Timestamp, ACT)"\n');
  console.log('Issue: API is behind Cloudflare which strips custom headers.\n');
  console.log('Tested:');
  console.log('- Headers (all formats) ❌');
  console.log('- Query parameters (all formats) ❌');
  console.log('- GET and POST methods ❌\n');
  console.log('Solutions needed:');
  console.log('1. Update endpoint.php to read from $_GET or $_REQUEST');
  console.log('2. OR configure Cloudflare to preserve custom headers');
  console.log('3. OR provide alternative authentication method\n');
  console.log('Please advise on the correct way to authenticate with the API.');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

runTests().catch(error => {
  console.error('\n💥 Test error:', error.message);
  process.exit(1);
});