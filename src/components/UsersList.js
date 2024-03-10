import React from 'react';
import { useContext } from 'react';
import './UsersList.css';
import User from './User';
import Card from './Card';
import UserContext from '../context/UserContext';


const UsersList = (props) => {
    return (
      <Card className="users">
        <ul>
          {props.users.map((user) => (
            <User
              key={user.id}
              name={user.name}
              description={user.description} // Use description instead of album
              urls={props.addedLinks} // Pass the URL as an array
              handleDeleteButtonClick={props.handleDeleteButtonClick}
            />
          ))}
        </ul>
      </Card>
    );
  };
  


export default UsersList;


