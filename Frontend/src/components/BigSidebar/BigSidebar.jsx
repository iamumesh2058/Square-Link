import React, { useContext } from 'react';
import Wrapper from './BigSidebar.style';
import Logo from '../Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import { DashboardContext } from '../../context/DashboardContext';


const BigSidebar = () => {
    const { showSidebar } = useContext(DashboardContext)
    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSidebar />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar;