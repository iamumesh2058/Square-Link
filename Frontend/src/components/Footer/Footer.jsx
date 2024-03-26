import React from 'react';
import Wrapper from './Footer.style';
import { FaGithub, FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Wrapper>
            <div className="copyright">
                <h5>Designed By: Square Link Team</h5>
                <p>Copyright &copy; 2024</p>
            </div>
            <div className="social-media">
                <Link to="https://github.com/iamumesh2058/Square-Link" className='link'>
                    <FaGithub />
                </Link>
                <Link to="https://github.com/iamumesh2058/Square-Link" className='link'>
                    <FaFacebook />
                </Link>
                <Link to="https://github.com/iamumesh2058/Square-Link" className='link'>
                    <FaInstagramSquare />
                </Link>
                <Link to="https://github.com/iamumesh2058/Square-Link" className='link'>
                    <FaTwitter />
                </Link>


            </div>
        </Wrapper>
    )
}

export default Footer;