import React, { useContext } from 'react';
import links from '../../utils/links';
import { NavLink } from 'react-router-dom';
import { DashboardContext } from '../../context/DashboardContext';

const NavLinks = ({ isBigSidebar}) => {
    const { toggleSidebar } = useContext(DashboardContext);
    return (
        <div className='nav-links'>
            {
                links.map((link, i) => {
                    const { text, path, icon } = link;
                    return <NavLink
                        to={path}
                        key={i}
                        onClick={isBigSidebar ? null : toggleSidebar}
                        className='nav-link'
                        end
                    >
                        <span className="icon">
                            {icon}
                        </span>
                        {text}
                    </NavLink>
                })
            }
        </div>
    )
}

export default NavLinks;