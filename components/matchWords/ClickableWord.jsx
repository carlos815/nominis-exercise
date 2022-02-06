import { add, remove } from "../../features/matchWords/matchWordsSlice";
import { decrementLives } from "../../features/game/gameSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function ClickableWord({ word, onClick }) {
    const [isActive, setIsActive] = useState(true)
    const [hasError, setHasError] = useState(false)
    const userSubmission = useSelector((state) => state.matchWords.userSubmission);
    const initialPhrase = useSelector((state) => state.matchWords.initialPhrase);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("LOG")
    }, [])

    const handleClick = () => {
        if (hasError) {
            return
        }
        else if (isActive) {
            submitWord()
        } else {
            //Remove word option probably not necessary
            //removeWord()
        }
    }

    const submitWord = () => {
        if (isRightWord()) {
            dispatch(add(word))
            setIsActive(false)
        } else {
            userMadeMistake()
        }
    }

    const isRightWord = () => {
        const indexOfSubmittedWord = userSubmission.length;
        const indexOfCorrectWord = initialPhrase.indexOf(word);
        return indexOfSubmittedWord == indexOfCorrectWord
    }

    const userMadeMistake = () => {
        dispatch(decrementLives())
        errorAnimation(750)
    }

    const errorAnimation = (ms) => {
        setHasError(true)
        setTimeout(() =>
            setHasError(false), ms
        )
    }

    const removeWord = () => {
        dispatch(remove(word))
        setIsActive(!isActive)
    }

    return (
        <button onClick={onClick} className={`
         bg-gray-light rounded-lg p-4 h-14
       shadow-md hover:scale-110 ${!isActive && "text-gray-medium "}  ${hasError ? "text-red animate-shake" : ""} transition-all duration-300 font-medium   `}>
            {word}
        </button>
    );
}

