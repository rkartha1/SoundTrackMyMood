import React from 'react';
import './User.css';

const User = props => {
    return (
        <li key={props.id} className="user-item">
            <div className="user-info">
                <h2>{props.email}</h2>
                <h2>{props.username} </h2>
                <h3>{props.password}</h3>
            </div>
        </li>
    )
}

export default User;
