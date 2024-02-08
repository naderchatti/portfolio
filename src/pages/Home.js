import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { MdMail } from 'react-icons/md';

const Home = () => {
    return (
        <div className='home' id='home'>
            <div className='home-content'>
                <h1>Hi, I'm <br /><span>Nader Chatti</span></h1>
                <div className='text-animate'>
                    <h3>Fullstack Developer</h3>
                </div>
            </div>
            <div className='home-sci'>
                <Link to='https://www.linkedin.com/in/naderchatti' target='_blank'>
                    <FaLinkedinIn />
                </Link>
                <Link to='https://twitter.com/naderchatti' target='_blank'>
                    <FaTwitter />
                </Link>
                <Link to='mailto:contact@naderchatti.com'>
                    <MdMail />
                </Link>
            </div>
        </div>
    );
};

export default Home;