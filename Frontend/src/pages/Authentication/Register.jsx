import React from 'react';
import Wrapper from './RegisterAndLoginPage.style';
import { FormRow, Logo } from '../../components';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Register</h4>

                <FormRow
                    type="text"
                    name="userName"
                    labelText="User Name"
                    defaultValue="iamumesh"
                />

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

                <button type="submit" className="btn btn-block">Register</button>
                <p>
                    Already a memeber?
                    <Link to={"/login"} className="member-btn">Login</Link>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register;