import React, { useState } from 'react';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import Wrapper from './LogoutContainer.sytle';
import { useDashboardContext } from '../../pages/DashboardLayout/DashboardLayout';

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser} = useDashboardContext();
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