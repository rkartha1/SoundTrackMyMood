import React, { useState, useEffect } from 'react';
import AddUser from './components/AddUser';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUsername from './components/AddUsername';
import AddAccount from './components/AddAccount';
import axios from 'axios';
import UserContext from './context/UserContext';
import UsersList from './components/UsersList';
import Hdr from './components/Hdr';

function App() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [playlist, setPlaylist] = useState([]);

  const handleAddButtonClick = (link) => {
    setPlaylist([...playlist, link]);
  };

  const handleDeleteButtonClick = (index) => {
    const updatedLinks = playlist.filter((_, i) => i !== index);
    setPlaylist(updatedLinks);
  };



  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        let token = localStorage.getItem("auth-token");
        if (token == null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenResponse = await axios.post(
          "http://localhost:8082/api/users/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );
        if (tokenResponse.data) {
          const userRes = await axios.get("http://localhost:8082/", {
            headers: { "x-auth-token": token },
          });
          setUserData({
            token,
            user: userRes.data,
          });

        }
      } catch (error) {
        console.error('Error in checkLoggedIn:', error);
      }
    };
    checkLoggedIn();
  }, []);

  const [displayUsersList, setDisplayUsersList] = useState(false);

  const addUser = (user) => {
    setUsers([user]);
    setDisplayUsersList(true);
  };

  useEffect(() => {
    if (window.location.pathname !== '/add-user') {
      setDisplayUsersList(false);
    }
  }, [window.location.pathname, users]);

  return (
    <div>
      {userData.token && <Hdr />}
      {userData.token && (
        <UsersList users={users} addedLinks={playlist} handleDeleteButtonClick={handleDeleteButtonClick} />
      )}

      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<AddUsername />} />
              <Route path='/create-account' element={<AddAccount />} />
              {userData.token && (
                <Route
                  path='/add-user'
                  element={<AddUser addUser={addUser} handleAddButtonClick={handleAddButtonClick} />}
                />
              )}
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;