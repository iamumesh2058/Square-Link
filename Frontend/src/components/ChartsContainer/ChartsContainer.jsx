import React, { useState } from 'react';
import Wrapper from './ChartsContainer.style';
import BarChart from '../BarChart/BarChart';
import AreaChart from '../AreaChart/AreaChart';

const ChartsContainer = ({ data }) => {
    const [barChart, setBarChart] = useState(true);
    return (
        <Wrapper>
            <h4>Daily Games</h4>
            <button type='button' onClick={() => setBarChart(!barChart)}>
                {
                    barChart ? 'Area Chart': 'Bar Chart'
                }
            </button>
            {
                barChart ?
                <BarChart data={data} /> :
                <AreaChart data={data} />
            }
        </Wrapper>
    )
}

export default ChartsContainer;