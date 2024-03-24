import React from 'react';
import customFetch from "../../utils/customFetch";
import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../../components';

export const loader = async () => {
	const response = await customFetch.get('/history/stats');
	return response.data;
}

const Stats = () => {
	const data = useLoaderData();
	const { defaultStats, weeklyGames } = data;
	return (
		<>
			<StatsContainer defaultStats={defaultStats} />
			{
				weeklyGames?.length > 0 &&
				<ChartsContainer data={weeklyGames} />
			}
		</>
	)
}

export default Stats;