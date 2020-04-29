//custom hook
import {useEffect, useState} from "react";
import utils from "../deps/mathUtils";

function useGameState (){


    const [stars ,setStars] = useState(utils.random(1,9));
    const [availableNums ,setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums ,setCandidateNums] = useState([]);
    const [secondsLeft,setSeconds] = useState(10);



    useEffect(()=>{
        const timerId = setTimeout(()=>{
            if(secondsLeft>0 && availableNums.length > 0){
                setSeconds(secondsLeft-1)
            }
        },1000);
        //return a clean up effect on side effect
        return () => clearTimeout(timerId);
    });

    const setGameState = (newCandidateNums) =>{
        if(utils.sum(newCandidateNums)!== stars){
            setCandidateNums(newCandidateNums);
        }else{
            const newAvailableNums = availableNums.filter(
                n=> !newCandidateNums.includes(n)
            );
            //redraw from whats available
            setStars(utils.randomSumIn(newAvailableNums,9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return{stars, availableNums, candidateNums, secondsLeft, setGameState, utils}
}
export default useGameState;
