import React, { useContext } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import Wrapper from './SmallSidebar.style';
import NavLinks from '../NavLinks/NavLinks';
import Logo from '../Logo/Logo';
import { FaTimes } from 'react-icons/fa';

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useContext(DashboardContext);
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