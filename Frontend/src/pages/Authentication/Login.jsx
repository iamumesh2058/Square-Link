import React from 'react';
import Wrapper from './RegisterAndLoginPage.style';
import { FormRow, Logo } from '../../components';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Login</h4>

                <FormRow
                    type="email"
                    name="email"
                    defaultValue="example@gmail.com"
                />

                <FormRow
                    type="password"
                    name="password"
                    defaultValue="Secret&123"
                />

                <button type="submit" className="btn btn-block">Login</button>
                <Link to={"/dashboard"}>
                    <button type="submit" className="btn btn-block">Explore the app</button>
                </Link>
                <p>
                    Not a memeber yet?
                    <Link to={"/register"} className="member-btn">Register</Link>
                </p>
            </form>
        </Wrapper>
    )
}

export default Login;