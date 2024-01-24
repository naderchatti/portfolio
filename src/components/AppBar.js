import React from 'react';
import { Link } from 'react-router-dom';

const AppBar = () => {
    return (
        <div className='appbar'>
            <Link to='/' className='logo'>Nader.</Link>
        </div>
    );
};

export default AppBar;