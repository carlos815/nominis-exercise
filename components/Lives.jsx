import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";



export default function Lives() {

    const livesCount = useSelector((state) => state.game.lives);
    const livesTotal = useSelector((state) => state.game.livesTotal);

    return (
        <div className="flex gap-2 h-max ">


            <Hearts livesCount={livesCount} livesTotal={livesTotal} />
        </div>
    );
}

function Hearts({ livesCount, livesTotal }) {
    const hearts = []
    for (let i = 0; i < livesTotal; i++) {

        if (i < livesCount) {
            hearts.push(
                <Image src="/../public/heart-filled.png" width={20} height={20} key={i} />
            )
        } else {
            hearts.push(
                <Image src="/../public/heart-empty.png" width={20} height={20} key={i} />

            )
        }
    }

    return hearts
}
