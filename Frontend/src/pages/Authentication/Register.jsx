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
        await customFetch.post('/auth/register', data);
        toast.success('Registration successfull');
        return redirect('/login');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const Register = () => {
    return (
        <Wrapper>
            <Form method='post' className="form">
                <Logo />
                <h4>Register</h4>

                <FormRow
                    type="text"
                    name="username"
                    labelText="User Name"
                    defaultValue=""
                />

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

                <button type="submit" className="btn btn-block">Register</button>
                <p>
                    Already a memeber?
                    <Link to={"/login"} className="member-btn">Login</Link>
                </p>
            </Form>
        </Wrapper>
    )
}

export default Register;