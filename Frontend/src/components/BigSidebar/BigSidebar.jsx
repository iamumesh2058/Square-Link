import React, { useContext } from 'react';
import Wrapper from './BigSidebar.style';
import Logo from '../Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
import { useDashboardContext } from '../../pages/DashboardLayout/DashboardLayout';


const BigSidebar = () => {
    const { showSidebar } = useDashboardContext();
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