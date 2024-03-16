import React, { useContext } from 'react';
import Wrapper from './ThemeToggle.style';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useDashboardContext } from '../../pages/DashboardLayout/DashboardLayout';

const ThemeToggle = () => {
    const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
    return (
        <Wrapper onClick={toggleDarkTheme}>
            {
                isDarkTheme ?
                    <BsFillSunFill className='toggle-icon' />
                    :
                    <BsFillMoonFill />
            }
        </Wrapper>
    )
}

export default ThemeToggle;