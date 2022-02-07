
import { useSelector, } from "react-redux";
import { useEffect, useState } from "react";
import WordGameController, { wordSubmitStatus } from "../../features/wordGameController";

export default function ClickableWord({ word }) {
    const gameController = new WordGameController()

    const [isButtonActive, setIsActive] = useState(false)
    const [hasError, setHasError] = useState(false)
    const userSubmission = useSelector((state) => state.matchWords.userSubmission);
    const initialPhrase = useSelector((state) => state.matchWords.initialPhrase);


    useEffect(() => {
        if (userSubmission.length == 0) setIsActive(true)
    }, [userSubmission])

    const handleClick = () => {

        if (hasError || !isButtonActive) return
        const submitWord = gameController.trySubmitWord(word, userSubmission, initialPhrase)

        if (submitWord == wordSubmitStatus.completed) {
            setIsActive(false)
        }
        else if (submitWord == wordSubmitStatus.failed) {
            errorAnimation(750)
        } else {
            //Remove word option probably not necessary
            //removeWord()
        }
    }

    const errorAnimation = (ms) => {
        setHasError(true)
        setTimeout(() =>
            setHasError(false), ms
        )
    }

    return (
        <button onClick={handleClick} className={`
         bg-gray-light rounded-lg p-4 h-14
       shadow-md ${isButtonActive && "hover:scale-110" || "text-gray-medium"}  ${hasError ? "text-red animate-shake" : ""} transition-all duration-300 font-medium`}>
            {word}
        </button>
    );
}

