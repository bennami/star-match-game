import React from "react";
import PlayNumber from "./playNumber";
import StarsDisplay from "./starsDisplay";
import PlayAgain from "./playAgain";
import useGameState from "./useGameState";
import utils from "../deps/mathUtils";

const Game = (props) => {

    const {
        stars,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState,
    } = useGameState();
    useGameState();

    const candidatesAreWrong = utils.sum(candidateNums)>stars;
    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost': 'active';

    const numberStatus = (number) =>{
        if (!availableNums.includes(number)){
            return 'used';
        }
        if (candidateNums.includes(number)){
            return candidatesAreWrong ? 'wrong':'candidate'
        }
        return 'available'
    };

    /* const resetGame = () =>{
         setStars(utils.random(1,9));
         setCandidateNums([]);
         setAvailableNums(utils.range(1, 9))
     };
 */
    const onNumberClick = (number,currentStatus) =>{
        if(gameStatus !== 'active' || currentStatus === 'used'){
            return;
        }
        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);
        setGameState(newCandidateNums);
    };
    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== "active"?(
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>
                    ):(
                        <StarsDisplay  count={stars} utils={utils}/>
                    )}

                </div>
                <div className="right">
                    {utils.range(1,9).map(number=>
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            className="number"
                            onClick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};
export default Game
