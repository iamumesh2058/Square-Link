import React from "react";

import { IoBarChartSharp } from 'react-icons/io5';
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
    {
        text: 'play game',
        path: '.',
        icon: <FaWpforms />,
    },
    {
        text: 'stats',
        path: 'stats',
        icon: <MdAdminPanelSettings />,
    },
    {
        text: 'leaderboard',
        path: 'leaderboard',
        icon: <IoBarChartSharp />,
    },
    {
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />,
    },
]

export default links;