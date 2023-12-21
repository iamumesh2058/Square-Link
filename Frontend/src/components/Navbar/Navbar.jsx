import React, { useContext } from 'react';
import Wrapper from './Navbar.style';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LogoutContainer from '../LogoutContainer/LogoutContainer';
import { DashboardContext } from '../../context/DashboardContext';


const Navbar = () => {
    const { showSidebar, toggleSidebar } = useContext(DashboardContext);
    return (
        <Wrapper>
            <div className="nav-center">
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                </div>
                <div className="btn-container">
                    <ThemeToggle />
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar;