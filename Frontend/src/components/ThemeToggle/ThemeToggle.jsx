import React, { useContext } from 'react';
import Wrapper from './ThemeToggle.style';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { DashboardContext } from '../../context/DashboardContext';

const ThemeToggle = () => {
    const { isDarkTheme, toggleDarkTheme } = useContext(DashboardContext);
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