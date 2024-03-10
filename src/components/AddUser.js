import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Credentials }  from '../Credentials';
import Card from './Card';
import Button from './Button';
import './AddUser.css';
import { jwtDecode } from 'jwt-decode';


const AddUser = (props) => {
  console.log('AddUser component rendered');
  const spotify = Credentials;
  const [token, setToken] = useState('');
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [songs, setSongs] = useState([]);
  const [playlistLinks, setPlaylistLinks] = useState([]);

  useEffect(() => {
    console.log('useEffect in AddUser triggered');
    axios('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${spotify.ClientId}:${spotify.ClientSecret}`),
      },
      data: 'grant_type=client_credentials',
    })
      .then(tokenResponse => {
        setToken(tokenResponse.data.access_token);
      })
      .catch(error => {
        console.error('Error during token request:', error);
      });
  }, [spotify.ClientId, spotify.ClientSecret]);

  const searchSongs = async () => {
    console.log('searchSongs function called');
    try {
      const searchResponse = await axios.get(
        'https://api.spotify.com/v1/search',
        {
          params: {
            q: `${mood} ${genre} songs`, // Include "songs" at the end of the query
            type: 'track',
            limit: 15,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const songs = searchResponse.data.tracks.items;
      console.log('Retrieved songs:', songs);
      setSongs(songs);
      console.log('Songs state updated:', songs);
      const user = localStorage.getItem('auth-token');
      const decodedUser = jwtDecode(user);
      const userId = decodedUser.id;
      // Pass the query results to the parent (App.js)
      props.addUser({
        key: songs[0].id, // or use a unique identifier
        img: songs[0].album.images[0].url,
        description: songs[0].album.name,
        urls: songs.map(song => song.external_urls.spotify),
        name: name,
        user: userId,
      });
      
    } catch (error) {
      console.error('Error during Spotify API query:', error.message);
    }
  };


  const moodChangeHandler = (event) => {
    setMood(event.target.value);
  };

  const genreChangeHandler = (event) => {
    setGenre(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  }

  // New function to handle "Add" button click
  const handleAddButtonClick = (url) => {
    // Perform actions when the "Add" button is clicked
    console.log('Adding:', url);
    console.log('Current playlistLinks:', playlistLinks);
    setPlaylistLinks((prevLinks) => [...prevLinks, url]);    // Call the prop function to pass the URL to the parent component (App.js)
    props.handleAddButtonClick(url);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    searchSongs();
  };

  return (
    <Card className="input" style={{ backgroundColor: 'black' }}>
      <form onSubmit={submitHandler}>
        <label>Mood</label>
        <input id="mood" type="text" onChange={moodChangeHandler} value={mood} />
        <label>Genre</label>
        <input id="genre" type="text" onChange={genreChangeHandler} value={genre} />
        <label>Name</label>
        <input id="name" type="text" onChange={nameChangeHandler} value={name} />
        <Button type="submit">Submit</Button>
      </form>

      {songs.length > 0 && (
  <div className="addUser"> 
    <h2>generated {mood} {genre} songs</h2>
    <ul>
      {songs.map((song) => (
        <li key={song.id}>
          <button className="addBtn" onClick={() => handleAddButtonClick(song.external_urls.spotify)}>Add</button>
          <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          {song.name} </a> by {song.artists.map((artist) => artist.name).join(', ')}
          {/* Add button next to each name */}
          
        </li>
      ))}
    </ul>
  </div>
  )}
    </Card>
  );
};

export default AddUser;