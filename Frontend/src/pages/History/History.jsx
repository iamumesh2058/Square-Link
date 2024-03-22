import React from 'react';
import { useLoaderData } from 'react-router-dom';
import customFetch from "../../utils/customFetch";
import Wrapper from './History.Style';
import { HistoryComponent } from '../../components';


export const loader = async () => {
    const { data } = await customFetch.get("/history/getallhistory")
    return data.history;
}

const History = () => {
    const histories = useLoaderData();

    if (histories.length === 0) {
        return (
            <Wrapper>
                <h2>No history to display...</h2>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <h5>{histories.length} {histories.length === 1 ? "Game" : "Games"} played</h5>
            <div className="history">
                {
                    histories.map((history) => {
                        return (
                            <HistoryComponent key={history._id} {...history} />
                        )
                    })
                }
            </div>
        </Wrapper>
    )
}

export default History;