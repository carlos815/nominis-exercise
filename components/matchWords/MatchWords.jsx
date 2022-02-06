import ClickableWord from "./ClickableWord";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { reset } from "../../features/matchWords/matchWordsSlice";

export default function MatchWords({ wordsArray }) {
    const [a, seta] = useState(
        "a"

    )
    const userSubmission = useSelector((state) => state.matchWords.userSubmission)

    const dispatch = useDispatch()

    const handleResetBtnClick = () => {
        dispatch(reset())

        seta("b");
    }

    return (
        <div className="font-medium flex flex-col gap-y-4">
            <button onClick={handleResetBtnClick} className="self-end flex "><Image src="/../public/retry.png" height={24} width={24}></Image></button>
            <div className="w-full bg-gray-light rounded-lg p-4 h-14 shadow-md " > {userSubmission?.join(" ")} </div>
            <div className="flex flex-wrap gap-4 justify-center"> {wordsArray.map((word => <ClickableWord word={word} key={word} a={a} />))}</div>
        </div>
    );
}
