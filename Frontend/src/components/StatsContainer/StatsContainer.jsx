import React from 'react'
import Wrapper from './StatsContainer.style'
import { RiEmotionHappyLine, RiEmotionUnhappyLine } from "react-icons/ri";
import { BsEmojiNeutral } from "react-icons/bs";
import StatItem from '../StatItem/StatItem';

const StatsContainer = ({ defaultStats }) => {
    const stats = [
        {
            title: "Games Win",
            count: defaultStats?.Win || 0,
            icon: <RiEmotionHappyLine />,
            color: "#066146",
            bcg: "#fef3c7"
        },
        {
            title: "Games Draw",
            count: defaultStats?.Draw || 0,
            icon: <BsEmojiNeutral />,
            color: "#9c883a",
            bcg: "#fef3c7"
        },
        {
            title: "Games Lose",
            count: defaultStats?.Lose || 0,
            icon: <RiEmotionUnhappyLine />,
            color: "#ac4d4d",
            bcg: "#fef3c7"
        },

    ]
  return (
    <Wrapper>
        {
            stats.map((item) => {
                return <StatItem key={item.title} {...item} />
            })
        }

    </Wrapper>
  )
}

export default StatsContainer