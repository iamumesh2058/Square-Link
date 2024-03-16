import React, { useContext } from 'react';
import Wrapper from './SmallSidebar.style';
import NavLinks from '../NavLinks/NavLinks';
import Logo from '../Logo/Logo';
import { FaTimes } from 'react-icons/fa';
import { useDashboardContext } from '../../pages/DashboardLayout/DashboardLayout';

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className={showSidebar ? `sidebar-container show-sidebar` : `sidebar-container`}>
                <div className="content">
                    <button type='button' className="close-btn" onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar;