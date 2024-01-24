import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { MdMail } from 'react-icons/md';

const Home = () => {
    return (
        <section className='home' id='home'>
            <div className='home-content'>
                <h1>Hi, I'm <span>Nader Chatti</span></h1>
                <div className='text-animate'>
                    <h3>Fullstack Developer</h3>
                </div>
            </div>
            <div className='home-sci'>
                <Link to='#'>
                    <FaLinkedinIn />
                </Link>
                <Link to='#'>
                    <FaTwitter />
                </Link>
                <Link to='#'>
                    <MdMail />
                </Link>
            </div>
        </section>
    );
};

export default Home;