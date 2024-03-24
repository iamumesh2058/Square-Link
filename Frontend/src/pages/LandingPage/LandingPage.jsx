import React from 'react';
import Wrapper from './LandingPage.style';
import { Link } from 'react-router-dom';
import main from '../../assets/images/main-alternative.svg';
import { Logo } from '../../components';

const LandingPage = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className="info">
                    <h1>
                        An <span>online</span> game
                    </h1>
                    <p>
                        This is a multiplayer game ( 2 or more players, 2/3 players are good ) in which we first draw a matrix of small circles/dots on our copy/paper which serves as a playground. Each player then takes turn to draw a line starting from one circle to another. Turn by turn as you draw edges from one circle to another you will finally enclose a square. When a player draws the last edge of the square they score a point. Such square must be formed with unit edges or adjacent circles. When you score a point, your initials or symbols are inscribed inside the square for later count. One all of the edges are finished, scores for each player are counted based on count of their symbols or how many squares they managed to enclose. <Link to={'howtoplay'} className='learn-link'>How to play?</Link>
                    </p>
                    <Link to="/register" className='btn register-link'>Register</Link>
                    <Link to="/login" className='btn'>Login</Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default LandingPage;