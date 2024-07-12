// ActiveLink.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './ActiveLink.css'; // Make sure ActiveLink.css file is correctly imported for styling

const ActiveLink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className="active-link" // Ensure this class matches the CSS for the active state
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;
