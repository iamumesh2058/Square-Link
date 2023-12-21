import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Error.style';
import img from '../../assets/images/not-found.svg';
import { UserContext } from '../../context/UserContext';

const Error = () => {
    const { user } = useContext(UserContext);
    return (
        <Wrapper>
            <div>
                <img src={img} alt="not found" />
                <h3>Ohh! page not found</h3>
                <p>We can't seem to find the page you are looking for</p>
                {
                    user?.name ?
                        <Link to={'/dashboard'}>Back to home</Link>
                        :
                        <Link to={'/'}>Back to home</Link>
                }
            </div>
        </Wrapper>
    )
}

export default Error;