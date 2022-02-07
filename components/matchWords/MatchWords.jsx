import ClickableWord from "./ClickableWord";
import { useSelector } from "react-redux";
import Image from "next/image";


export default function MatchWords({ wordsArray, className, gameController }) {
    const userSubmission = useSelector((state) => state.matchWords.userSubmission)

    const handleResetBtnClick = () => {
        gameController.resetWord()
    }

    return (
        <div className={`font-medium flex flex-col gap-y-4 ${className}`}>
            <button onClick={handleResetBtnClick} className="self-end flex "><Image src="/../public/retry.png" height={24} width={24}></Image></button>
            <div className="w-full bg-gray-light rounded-lg p-4 h-14 shadow-md " > {userSubmission?.join(" ")} </div>
            <div className="flex flex-wrap gap-4 justify-center"> {wordsArray.map(((wordObject) => <ClickableWord word={wordObject.word} key={wordObject.index} index={wordObject.index} />))}</div>
        </div>
    );
}
