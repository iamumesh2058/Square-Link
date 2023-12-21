import React, { useContext } from 'react';
import Wrapper from './DashboardLayout.style';
import { BigSidebar, Navbar, SmallSidebar } from '../../components';
import { Outlet } from 'react-router-dom';
import { DashboardContext, DashboardProvider } from '../../context/DashboardContext';

const DashboardLayout = () => {
    const { showSidebar } = useContext(DashboardContext);
    return (
        <Wrapper>
            <main className="dashboard">
                {
                    showSidebar ?
                        <SmallSidebar />
                        :
                        <></>

                }
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}

export default DashboardLayout;