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
                    name="firstName"
                    labelText="First Name"
                    defaultValue="Umesh"
                />

                <FormRow
                    type="text"
                    name="lastName"
                    labelText="Last Name"
                    defaultValue="Gurung"
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