import Image from "next/image";
import React from "react";
import MediaQuery, { useMediaQuery } from 'react-responsive';

export default function BackgroundImage() {
    /* const mobileWidth = 640
 
 
     const Desktop = ({ children }) => {
         const isDesktop = useMediaQuery({ minWidth: mobileWidth })
         return isDesktop ? children : null
     }
     const Mobile = ({ children }) => {
         const isMobile = useMediaQuery({ maxWidth: mobileWidth })
         return isMobile ? children : null
     }
 */
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 -z-10">

            <div className="invisible xl:visible">
                <Image src="/../public/desktop-background.png" height={1080} width={1920} layout="fill" objectFit="cover" />
            </div>

            <div className="xl:invisible visible">

                <Image src="/../public/mobile-background.png" height={1365.33} width={768} layout="fill" objectFit="cover" />
            </div>
        </div>
    );
}

