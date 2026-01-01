// Script to validate .env.local configuration
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('\n📝 Create a .env.local file in the root directory with your Firebase configuration.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

// Parse .env.local file
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

// Required Firebase variables
const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

// Optional but recommended
const recommendedVars = [
  'NEXT_PUBLIC_ADMIN_EMAILS',
];

console.log('🔍 Validating .env.local configuration...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value) {
    console.error(`❌ Missing: ${varName}`);
    hasErrors = true;
  } else if (value.includes('your_') || value.includes('example')) {
    console.error(`❌ ${varName} appears to be a placeholder value: ${value.substring(0, 20)}...`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}`);
  }
});

// Check recommended variables
recommendedVars.forEach(varName => {
  const value = envVars[varName];
  if (!value) {
    console.warn(`⚠️  Missing (recommended): ${varName}`);
    hasWarnings = true;
  } else {
    console.log(`✅ ${varName}`);
  }
});

// Validate format of specific variables
if (envVars.NEXT_PUBLIC_FIREBASE_API_KEY) {
  if (!envVars.NEXT_PUBLIC_FIREBASE_API_KEY.startsWith('AIza')) {
    console.warn('⚠️  NEXT_PUBLIC_FIREBASE_API_KEY should start with "AIza"');
    hasWarnings = true;
  }
}

if (envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  if (!envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN.includes('.firebaseapp.com')) {
    console.warn('⚠️  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN should end with ".firebaseapp.com"');
    hasWarnings = true;
  }
}

if (envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
  if (!envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET.includes('.appspot.com')) {
    console.warn('⚠️  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET should end with ".appspot.com"');
    hasWarnings = true;
  }
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.error('\n❌ Configuration has errors. Please fix them before running the app.');
  console.log('\n📖 Get your Firebase config from: https://console.firebase.google.com/');
  console.log('   Project Settings > General > Your apps > Web app');
  process.exit(1);
} else if (hasWarnings) {
  console.warn('\n⚠️  Configuration has warnings but should work.');
  console.log('   Consider fixing the warnings for better functionality.');
} else {
  console.log('\n✅ All configuration looks good!');
  console.log('   You can now run: npm run dev');
}

