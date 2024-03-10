import React, { useState, useContext } from 'react';
import './AddUser';
import './AddUsername.css';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import Button from './Button';
import Card from './Card';

const AddUsername = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const loginUser = {
        email,
        password
      };
      const loginRes = await axios.post("http://localhost:8082/api/users/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      //navigate('/');
      console.log("Navigating to /add-user");
      navigate('/add-user');
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 400) {
        setError(err.response.data.msg);
      } else {
        setError('An error occurred during signup.');
      }
    }
  };


  return (
    <Card className="input">
      <form onSubmit={handleSubmit}>
        <Link to='/' className='btn btn-signup'> Home </Link>
        <h2> </h2>
        <label>Email</label>
        <input
          id="email"
          type="text"
          required onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          id="password"
          type="password"
          required onChange={e => setPassword(e.target.value)}
        />
        <p className="error-message">{error}</p>
        <h2> </h2>
        <Button disabled={loading} type="submit"> Submit </Button>
        <h2> </h2>
        <Link to='/create-account' className='btn btn-signup'> Create Account </Link>
      </form>
    </Card>
  );
};
//<Link to='/add-user' className='btn btn-signup'> Submit </Link>

export default AddUsername;