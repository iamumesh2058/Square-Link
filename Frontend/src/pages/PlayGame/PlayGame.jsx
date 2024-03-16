import React from 'react';
import FormRowSelect from '../../components/FormRowSelect/FormRowSelect';
import Wrapper from './PlayGame.style';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '../DashboardLayout/DashboardLayout';


const PlayGame = () => {
    const { rows, setRows } = useDashboardContext();
    const { cols, setCols } = useDashboardContext();
    const { gameLevel, setGameLevel } = useDashboardContext();
    const { gameMode, setGameMode } = useDashboardContext();

    console.log(rows, cols, gameLevel)

    return (
        <Wrapper>
            <div className="matrix">
                <FormRowSelect
                    labelText='Rows'
                    name="rows"
                    list={[4, 5, 6]}
                    defaultValue={rows.toString}
                    onChange={(e) => {
                        setRows(e.target.value);
                    }}
                />

                <FormRowSelect
                    labelText='Columns'
                    name="cols"
                    list={[4, 5, 6, 7, 8, 9, 10]}
                    defaultValue={cols.toString()}
                    onChange={(e) => {
                        setCols(e.target.value)
                    }}
                />
            </div>

            <FormRowSelect
                labelText="Game Mode"
                name='game-mode'
                list={["Vs Computer", "Vs Friends"]}
                defaultValue={gameMode}
                onChange={(e) => {
                    setGameMode(e.target.value);
                }}
            />

            {
                gameMode === 'Vs Computer' &&
                <FormRowSelect
                    labelText="Game Level"
                    name='game-level'
                    list={["Easy", "Medium", "Hard"]}
                    defaultValue={gameLevel}
                    onChange={(e) => {
                        setGameLevel(e.target.value);
                    }}
                />
            }

            {

                <div>
                    <Link to="/dashboard/gameroom" className='btn btn-block form-btn'>Play Game!</Link>
                </div>
            }
        </Wrapper>
    );
};

export default PlayGame;