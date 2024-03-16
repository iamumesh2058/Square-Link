import React from "react";

import { IoGameControllerSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { ImProfile } from 'react-icons/im';
import { IoBarChartSharp } from 'react-icons/io5';

const links = [
    {
        text: 'play game',
        path: '.',
        icon: <IoGameControllerSharp />,
    },
    {
        text: 'history',
        path: 'history',
        icon: <FaHistory />,
    },
    {
        text: 'stats',
        path: 'stats',
        icon: <IoBarChartSharp />,
    },
    {
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />,
    },
]

export default links;