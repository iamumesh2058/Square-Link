import React from "react";

import { IoGameControllerSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { ImProfile } from 'react-icons/im';
import { MdLeaderboard } from "react-icons/md";

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
        text: 'leaderboard',
        path: 'leaderboard',
        icon: <MdLeaderboard />,
    },
    {
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />,
    },
]

export default links;