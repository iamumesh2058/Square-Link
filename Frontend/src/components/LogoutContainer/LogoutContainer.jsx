import React, { useContext, useState } from 'react';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import Wrapper from './LogoutContainer.sytle';
import { UserContext } from '../../context/UserContext';

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser} = useContext(UserContext);
    return (
        <Wrapper>
            <button type='button' className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>
                <FaUserCircle />
                {user.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button' className='dropdown-btn' onClick={(logoutUser)}>
                    logout
                </button>
            </div>
        </Wrapper>
    )
}

export default LogoutContainer;