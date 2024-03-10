import React, { useState} from 'react';
import { useContext } from 'react';
import Card from './Card';
import './AddUser.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import Button from './Button';



const AddUser = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const { setUserData } = useContext(UserContext);


  //post to signup route on the server side 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit triggered');
    console.log('Form values:', email, username, password);
    setLoading(true);
    try {
      const newUser = {
        email,
        username,
        password,
      };
      await axios.post("http://localhost:8082/api/users/signup", newUser);

      console.log(newUser);


      const loginRes = await axios.post("http://localhost:8082/api/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      setLoading(false);

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
          required onChange={(e) => setEmail(e.target.value)}
        />
        <label>Username</label>
        <input
          id="username"
          type="text"
          required onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          id="password"
          type="password"
          required onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error-message">{error}</p>
        <h2> </h2>
        <Button disabled={loading} type="submit"> Submit </Button>
        <h2> </h2>
        <Link to='/login' className='btn btn-signup'> Login </Link>
      </form>
    </Card>
  );
};
//<Link to='/add-user' className='btn btn-signup'> Submit </Link>

export default AddUser;