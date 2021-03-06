import ClickableWord from "./ClickableWord";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";


export default function MatchWords({ wordsArray, className, gameController }) {
    const userSubmission = useSelector((state) => state.matchWords.userSubmission)

    const handleResetBtnClick = () => {
        gameController.resetWord()
    }

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

    const resetIconSize = isDesktop ? 38 : 24
    return (
        <div className={`font-medium flex flex-col gap-y-4 ${className} w-full`}>
            <button onClick={handleResetBtnClick} className="self-end flex ">
                <Image src="/../public/retry.png" height={resetIconSize} width={resetIconSize}></Image>
            </button>
            <div className="w-full bg-gray-light rounded-lg p-4 h-14 shadow-md md:text-4xl md:h-[72px] " > {userSubmission?.join(" ")}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                {wordsArray.map(((wordObject) => <ClickableWord word={wordObject.word} key={wordObject.index} index={wordObject.index} />))}
            </div>
        </div>
    );
}
