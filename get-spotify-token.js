// Simple script to get Spotify refresh token
// Run: node get-spotify-token.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🎵 Spotify Refresh Token Generator\n');
  console.log('You need to get these from: https://developer.spotify.com/dashboard\n');
  
  const clientId = await question('Enter your Spotify Client ID: ');
  const clientSecret = await question('Enter your Spotify Client Secret: ');
  
  console.log('\n📋 Step 1: Create Redirect URI');
  console.log('1. Go to https://developer.spotify.com/dashboard');
  console.log('2. Click on your app');
  console.log('3. Click "Edit Settings"');
  console.log('4. Add this Redirect URI: http://localhost:3000/callback');
  console.log('5. Click "Add" and then "Save"\n');
  
  await question('Press Enter when you\'ve added the redirect URI...');
  
  const scopes = 'user-read-currently-playing user-read-playback-state';
  const redirectUri = 'http://localhost:3000/callback';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  
  console.log('\n🔗 Step 2: Authorize the app');
  console.log('Open this URL in your browser:\n');
  console.log(authUrl);
  console.log('\nYou will be redirected to a localhost URL that doesn\'t exist - that\'s OK!');
  console.log('Copy the ENTIRE URL from your browser\'s address bar (it will look like:');
  console.log('http://localhost:3000/callback?code=...)\n');
  
  const callbackUrl = await question('Paste the full callback URL here: ');
  
  // Extract code from URL
  const url = new URL(callbackUrl);
  const code = url.searchParams.get('code');
  
  if (!code) {
    console.error('\n❌ Error: Could not find code in URL. Make sure you copied the entire URL.');
    rl.close();
    return;
  }
  
  console.log('\n🔄 Exchanging code for tokens...\n');
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error:', error);
      rl.close();
      return;
    }
    
    const data = await response.json();
    
    console.log('✅ Success! Here are your tokens:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Add these to your .env.local file:\n');
    console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
    console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚠️  Important: Keep your refresh token secret!');
    console.log('   The refresh token is long-lived and can be used to access your Spotify account.\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  rl.close();
}

main();

