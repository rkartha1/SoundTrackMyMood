// Home.js
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

// Create a context with all image files in the 'images' folder
const imagesContext = require.context('./images/firstRow', false, /\.(png)$/);

// Get an array of all image file paths
const imagePaths = imagesContext.keys().map(imagesContext);

const Home = () => {
  return (
    <div>

      <div className="container">
        <section>
          <h1>SoundTrackMyMood</h1>
          <div className="explanation">
            <p>Create an account, and you can create a playlist depending on the mood you have at the moment.</p>
            <nav>
            <Link to='/login' className='btn btn-login'> Login </Link>
            <Link to='/create-account' className='btn btn-signup'> SignUp </Link>
            </nav>
          </div>
        </section>
      </div>
      <div className="image-gallery">
        {/* Render all images dynamically */}
        {imagePaths.map((path, index) => (
          <img key={index} src={path} alt={`Album Cover ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Home;




