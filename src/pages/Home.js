import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { MdMail } from 'react-icons/md';
import { PiGithubLogoFill } from 'react-icons/pi';

const Home = () => {
    const handleDownload = (lang) => {
        let path = '';
        let filename = '';
        switch (lang) {
            case 'EN':
                path = '/CV Nader CHATTI EN.pdf';
                filename = 'CV Nader CHATTI EN.pdf';
                break;
            case 'FR':
                path = '/CV Nader CHATTI FR.pdf';
                filename = 'CV Nader CHATTI FR.pdf';
                break;
            default:
                path = '/CV Nader CHATTI EN.pdf';
                filename = 'CV Nader CHATTI EN.pdf';
                break;
        }

        const link = document.createElement('a');
        link.href = path;
        link.setAttribute('download', filename);
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    return (
        <div className='home' id='home'>
            <div className='home-content'>
                <div>
                    <h1>Hi, I'm <br /><span>Nader Chatti</span></h1>
                    <div className='text-animate'>
                        <h3>Fullstack Developer</h3>
                    </div>
                    <div className='home-sci'>
                        <Link to='https://www.linkedin.com/in/naderchatti' target='_blank'>
                            <FaLinkedinIn />
                        </Link>
                        <Link to='https://github.com/chattinader' target='_blank'>
                            <PiGithubLogoFill />
                        </Link>
                        <Link to='https://twitter.com/naderchatti' target='_blank'>
                            <FaTwitter />
                        </Link>
                        <Link to='mailto:contact@naderchatti.com'>
                            <MdMail />
                        </Link>
                    </div>
                </div>
                <div className='download-button'>
                    <button type='button' onClick={() => handleDownload('EN')}>Download En CV</button>
                    <button type='button' onClick={() => handleDownload('FR')}>Download Fr CV</button>
                </div>
            </div>
        </div>
    );
};

export default Home;