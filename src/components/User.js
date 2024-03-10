import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';
import { jwtDecode } from 'jwt-decode';
import './User.css';
import SpotifyAuth from './SpotifyAuth';

const User = (props) => {
  const [currentPlaylist, setCurrentPlaylist] = useState({
    name: '',
    urls: [], // Initialize with an empty list
  });

  const [savedPlaylists, setSavedPlaylists] = useState([]);

  const resetCurrentPlaylist = () => {
    setCurrentPlaylist({
      name: props.name,
      urls: [],
    });
  };


  const { accessToken, handleSpotifyAuth } = SpotifyAuth();
  

  const handleSaveButtonClick = async () => {
    console.log('Save Playlist button clicked');
    const authToken = localStorage.getItem("auth-token");

    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      console.log('Decoded Token:', decodedToken);

      try {
        setCurrentPlaylist({
          name: props.name,
          urls: props.urls,
        });

        const response = await axios.post(
          "http://localhost:8082/api/savePlaylist/save",
          { name:props.name, links: props.urls, user: decodedToken.id, public: true},
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );

        // Open the Spotify playlist in a new tab
       window.open(`https://open.spotify.com/`, '_blank');
  
        setSavedPlaylists((prevPlaylists) => [
          ...prevPlaylists,
          { name: currentPlaylist.name, urls: [...currentPlaylist.urls] },
        ]);
        resetCurrentPlaylist();
        console.log('Playlist saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving playlist:', error);
        // Handle the error, show an error message, etc.
      }
    } else {
      console.error('Auth token not found.');
    }
  };

  return (
    <li className="user-item">
      <div className="user-info">
        <h3>playlists:</h3>
        <ul>
          {savedPlaylists.map((playlist, index) => (
            <li key={index}>
              {playlist.name}
            </li>
          ))}
        </ul>
        <ul>
          {props.urls && props.urls.map((url, index) => (
            <li key={index}>
              <button className="deleteBtn" onClick={() => props.handleDeleteButtonClick(index)}>Delete</button>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
        {(
          <button className="savePlaylistBtn" onClick={handleSaveButtonClick}>
            Save Playlist
          </button>
        )}
      </div>
    </li>
  );
}

export default User;

