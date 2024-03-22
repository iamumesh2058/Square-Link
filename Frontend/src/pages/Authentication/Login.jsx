import React from 'react';
import Wrapper from './RegisterAndLoginPage.style';
import { FormRow, Logo } from '../../components';
import { Form, Link, redirect } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/login', data);
        toast.success('Login successfull');
        return redirect('/dashboard');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const Login = () => {
    return (
        <Wrapper>
            <Form method='post' className="form">
                <Logo />
                <h4>Login</h4>

                <FormRow
                    type="email"
                    name="email"
                    defaultValue=""
                />

                <FormRow
                    type="password"
                    name="password"
                    defaultValue=""
                />

                <button type="submit" className="btn btn-block">Login</button>
                <p>
                    Not a memeber yet?
                    <Link to={"/register"} className="member-btn">Register</Link>
                </p>
            </Form>
        </Wrapper>
    )
}

export default Login;