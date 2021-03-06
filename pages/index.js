import Head from "next/head";
import Image from "next/image";
import Lives from "../components/Lives";
import MatchWords from "../components/matchWords/MatchWords";
import { userWonGame, gameStatusTypes } from "../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BackgroundImage from "../components/BackgroundImage";
import WordGameController, {
  wordGameStatus,
} from "../features/wordGameController";
import { phraseStatusTypes } from "../features/matchWords/matchWordsSlice";
import { Desktop, Mobile } from "../components/Responsive";
import { getDataWordGame } from "../fetchData/getDataWordGame";

export async function getStaticProps() {
  const wordsGameData = await getDataWordGame();
  return {
    props: {
      wordsGameData,
    },
    revalidate: 43200, //12 hours
  };
}

export default function Home({ wordsGameData }) {
  console.log(wordsGameData);
  const dispatch = useDispatch();
  const initialPhrase = useSelector((state) => state.matchWords.initialPhrase);
  const gameStatus = useSelector((state) => state.game.gameStatus);
  const shuffledPhrase = useSelector(
    (state) => state.matchWords.shuffledPhrase
  );
  const phraseStatus = useSelector((state) => state.matchWords.phraseStatus);
  const phrasesArray = useSelector((state) => state.matchWords.phrasesArray);
  const currentPhraseIndex = useSelector(
    (state) => state.matchWords.currentPhraseIndex
  );
  const gameController = new WordGameController();

  useEffect(() => {
    gameController.startWordGame(wordsGameData);
  }, []);

  useEffect(() => {
    if (
      phraseStatus == phraseStatusTypes.completed &&
      initialPhrase.length != 0
    ) {
      const nextGameStatus = gameController.tryNextPhrase(
        currentPhraseIndex,
        phrasesArray
      );

      if (nextGameStatus == wordGameStatus.completed) {
        dispatch(userWonGame());
      }
    }
  }, [phraseStatus]);

  const restartGame = () => {
    gameController.startWordGame(wordsGameData);
  };

  const Title = ({ className }) => {
    return (
      <div className={className}>
        <h1 className="text-4xl font-medium mb-3  md:text-5xl">
          {"Let's Practice"}
        </h1>
        <p className="text-xl md:text-3xl">
          Put the words in the right order to make a correct sentence.
        </p>
      </div>
    );
  };

  const Header = ({ className }) => (
    <div className={`flex mb-11  ${className}`}>
      <div className="flex h-fit w-full place-items-center gap-x-8 ">
        <div className="mr-auto  items-center text-left hidden md:block">
          <div>
            <h2 className="text-5xl font-display text-red w-full">
              Story Title
            </h2>
            <h3 className="text-4xl font-body text-red w-full">Episode 1</h3>
          </div>
        </div>
        <div className="mr-auto flex items-center md:hidden ">
          <Image src="/../public/logo.png" height={19} width={103} />
        </div>
        <Lives />
        <div className="rounded-xl bg-white shadow-sm min-h-20 min-w-20 max-h-20 max-w-20 overflow-hidden md:block hidden">
          <Image
            src="/../public/profile.png"
            height={90}
            width={90}
            layout="fixed"
            objectFit="cover"
          />
        </div>
        <div className="md:hidden block">
          <Image src="/../public/speaker.png" height={34} width={34} />
        </div>
      </div>
    </div>
  );

  const gameScreen = (
    <>
      <Desktop>
        <div className="grid grid-cols-7 gap-x-12   h-[95vh]">
          <Header className="col-start-1  col-end-5 row-start-1 mr-9" />
          <Title className="col-start-1 col-end-5  row-span-full flex flex-col justify-center mr-9" />
          <div className="col-span-3 col-start-5 w-auto flex  justify-center items-center row-span-full">
            <MatchWords
              className=""
              gameController={gameController}
              wordsArray={shuffledPhrase.slice().map((word, index) => {
                return { word: word, index: index };
              })}
            />
          </div>
        </div>
      </Desktop>
      <Mobile>
        <Header />
        <Title />
        <div className="w-full fixed top-[50%] left-0  p-6 justify-items-stretch h">
          <MatchWords
            className=""
            gameController={gameController}
            wordsArray={shuffledPhrase.slice().map((word, index) => {
              return { word: word, index: index };
            })}
          />{" "}
        </div>
      </Mobile>
    </>
  );

  const RenderedScreen = () => {
    if (gameStatus == gameStatusTypes.win) {
      return <WinScreen onClickRestartButton={restartGame} />;
    } else if (gameStatus == gameStatusTypes.lose) {
      return <LoseScreen onClickRestartButton={restartGame} />;
    } else if (gameStatus == gameStatusTypes.playing) {
      return gameScreen;
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-6 relative min-h-screen ">
        <RenderedScreen />
      </main>

      <footer></footer>
      <BackgroundImage />
    </>
  );
}

const LoseScreen = ({ onClickRestartButton }) => (
  <div className="flex flex-col justify-center items-center h-screen ">
    <h1 className="text-4xl mb-3 font-bold">OH NOES you lost!</h1>
    <TryAgainBtn onClick={onClickRestartButton} />
  </div>
);

const WinScreen = ({ onClickRestartButton }) => (
  <div className="flex flex-col justify-center items-center h-screen ">
    <h1 className="text-4xl mb-3 font-bold">Congrats!, you won!</h1>
    <TryAgainBtn onClick={onClickRestartButton} />
  </div>
);

const TryAgainBtn = ({ onClick }) => (
  <button
    className="bg-white rounded-lg text-base shadow-md p-4 font-bold"
    onClick={onClick}
  >
    TRY AGAIN?
  </button>
);
