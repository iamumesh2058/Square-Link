import React from 'react';
import Wrapper from './Profile.style';
import { toast } from 'react-toastify';
import { Form, redirect, useNavigation, useOutletContext } from 'react-router-dom';
import customFetch from "../../utils/customFetch";
import { FormRow } from '../../components';


export const action = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if (file && file.size > 500000) {
        toast.error("Image size too large");
        return null;
    }

    try {
        await customFetch.patch('/user/update-user', formData);
        toast.success("Profile updated successfully");
        return redirect('/dashboard');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return null;
    }
}

const Profile = () => {
    const { user } = useOutletContext();
    const { username, email } = user;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Wrapper>
            <Form method='post' className='form' encType='multipart/form-data'>
                <h4 className="form-title">Profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className='form-label'>
                            Select an image file (max 0.5mb)
                        </label>
                        <input type="file" id='avatar' name='avatar' className='form-input' accept='image/*' />
                    </div>
                    <FormRow type="text" name="username" labelText="usernmae" defaultValue={username} />
                    <FormRow type="email" name="email" defaultValue={email} />
                    <button
                        type='submit'
                        className='btn btn-block form-btn'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : 'Update'}
                    </button>
                </div>

            </Form>
        </Wrapper>
    )
}

export default Profile;