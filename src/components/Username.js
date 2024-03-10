import React from 'react';
import './Username.css';

const Username = props => {
    return (
        <li key={props.id} className="user-item">
            <div className="user-info">
                <h2>{props.username} </h2>
                <h3>{props.password}</h3>
            </div>
        </li>
    )
}

export default Username;
