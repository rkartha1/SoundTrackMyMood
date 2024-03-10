import { useState, useEffect } from 'react';


const SpotifyAuth = () => {
const [accessToken, setAccessToken] = useState('');
useEffect(() => {
    // Check if the URL contains the access token after redirection
    const urlParams = new URLSearchParams(window.location.search);
    const receivedAccessToken = urlParams.get('access_token');

    if (receivedAccessToken) {
      // Store the access token in the state
      setAccessToken(receivedAccessToken);

      // Clear the URL parameters to remove the access token from the visible URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
const handleSpotifyAuth = async () => {
    const clientId = 'e3a4c4a7938840408cc170b0c64ee0c5';
    const redirectUri = 'http://localhost:3000/login';
    const scope = 'playlist-modify-public';
  
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
};

      return {
        accessToken,
        handleSpotifyAuth,
      };
  };

  export default SpotifyAuth;

  