// test-api.js - Test script to verify API connectivity
const crypto = require('crypto');
require('dotenv').config();

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test 1: Check environment variables
function testEnvVariables() {
  log('\n=== Test 1: Environment Variables ===', 'blue');
  
  const required = ['API_KEY', 'API_SECRET', 'API_URL'];
  let allPresent = true;
  
  required.forEach(envVar => {
    if (process.env[envVar]) {
      log(`✓ ${envVar}: ${envVar === 'API_SECRET' ? '***hidden***' : process.env[envVar].substring(0, 30)}...`, 'green');
    } else {
      log(`✗ ${envVar}: NOT SET`, 'red');
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Test 2: Test DNS resolution
async function testDNS() {
  log('\n=== Test 2: DNS Resolution ===', 'blue');
  
  const dns = require('dns').promises;
  const url = new URL(process.env.API_URL);
  
  try {
    const addresses = await dns.resolve4(url.hostname);
    log(`✓ DNS resolved: ${url.hostname} -> ${addresses.join(', ')}`, 'green');
    return true;
  } catch (error) {
    log(`✗ DNS resolution failed: ${error.message}`, 'red');
    return false;
  }
}

// Test 3: Test basic connectivity (ping-like)
async function testConnectivity() {
  log('\n=== Test 3: Network Connectivity ===', 'blue');
  
  const net = require('net');
  const url = new URL(process.env.API_URL);
  const port = url.port || (url.protocol === 'https:' ? 443 : 80);
  
  return new Promise((resolve) => {
    const socket = net.createConnection({
      host: url.hostname,
      port: port,
      timeout: 10000
    });
    
    socket.on('connect', () => {
      log(`✓ TCP connection successful to ${url.hostname}:${port}`, 'green');
      socket.end();
      resolve(true);
    });
    
    socket.on('timeout', () => {
      log(`✗ Connection timeout to ${url.hostname}:${port}`, 'red');
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', (error) => {
      log(`✗ Connection failed: ${error.message}`, 'red');
      resolve(false);
    });
  });
}

// Test 4: Test API request with HMAC authentication
async function testAPIRequest() {
  log('\n=== Test 4: API Request ===', 'blue');
  
  try {
    const fetch = (await import('node-fetch')).default;
    
    // Prepare test request
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
    
    log('Request details:', 'yellow');
    log(`  Email: ${testEmail}`);
    log(`  Timestamp: ${timestamp}`);
    log(`  Nonce: ${nonce}`);
    log(`  Signature: ${signature.substring(0, 20)}...`);
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    
    log('\nSending request...', 'yellow');
    const startTime = Date.now();
    
    const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.API_KEY,
        'X-Signature': signature,
        'X-Timestamp': timestamp,
        'X-Nonce': nonce,
        'ACT': action,
        'Content-Type': 'application/json'
      },
      body: requestBody,
      signal: controller.signal
    });
    
    clearTimeout(timeout);
    const duration = Date.now() - startTime;
    
    log(`\n✓ Response received in ${duration}ms`, 'green');
    log(`  Status: ${response.status} ${response.statusText}`);
    log(`  Content-Type: ${response.headers.get('content-type')}`);
    
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      log('\nResponse body:', 'yellow');
      console.log(JSON.stringify(data, null, 2));
    } else {
      data = await response.text();
      log('\nResponse body (text):', 'yellow');
      console.log(data.substring(0, 500));
    }
    
    if (response.ok) {
      log('\n✓ API request successful!', 'green');
      return true;
    } else {
      log(`\n⚠ API returned error status: ${response.status}`, 'yellow');
      return false;
    }
    
  } catch (error) {
    log(`\n✗ API request failed: ${error.message}`, 'red');
    if (error.code) {
      log(`  Error code: ${error.code}`, 'red');
    }
    return false;
  }
}

// Run all tests
async function runTests() {
  log('\n╔════════════════════════════════════════╗', 'blue');
  log('║   CampusDash API Connection Test      ║', 'blue');
  log('╚════════════════════════════════════════╝', 'blue');
  
  const envOk = testEnvVariables();
  if (!envOk) {
    log('\n❌ Environment variables not properly configured. Please check your .env file.', 'red');
    process.exit(1);
  }
  
  const dnsOk = await testDNS();
  const connectOk = await testConnectivity();
  const apiOk = await testAPIRequest();
  
  log('\n=== Test Summary ===', 'blue');
  log(`Environment Variables: ${envOk ? '✓' : '✗'}`, envOk ? 'green' : 'red');
  log(`DNS Resolution: ${dnsOk ? '✓' : '✗'}`, dnsOk ? 'green' : 'red');
  log(`Network Connectivity: ${connectOk ? '✓' : '✗'}`, connectOk ? 'green' : 'red');
  log(`API Request: ${apiOk ? '✓' : '✗'}`, apiOk ? 'green' : 'red');
  
  if (envOk && dnsOk && connectOk && apiOk) {
    log('\n✅ All tests passed! Your API connection is working correctly.', 'green');
  } else {
    log('\n❌ Some tests failed. Please review the errors above.', 'red');
    
    if (!dnsOk) {
      log('\n💡 Tip: DNS resolution failed. Check if the API URL is correct in your .env file.', 'yellow');
    }
    
    if (!connectOk) {
      log('\n💡 Tip: Network connectivity failed. This could be:', 'yellow');
      log('  - Firewall blocking the connection', 'yellow');
      log('  - VPN interfering with the connection', 'yellow');
      log('  - The API server is down', 'yellow');
      log('  - Your internet connection is unstable', 'yellow');
    }
    
    if (!apiOk && connectOk) {
      log('\n💡 Tip: Connection works but API request failed. This could be:', 'yellow');
      log('  - Incorrect API_KEY or API_SECRET', 'yellow');
      log('  - The API endpoint path is wrong', 'yellow');
      log('  - The API is not accepting requests', 'yellow');
    }
  }
  
  log('');
}

runTests().catch(error => {
  log(`\n💥 Unexpected error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});