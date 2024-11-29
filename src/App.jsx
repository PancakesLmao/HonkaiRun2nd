import { useEffect, useRef } from "react";
import ground from "./assets/grass_ground.jpg";
import player from "./assets/image.gif";
import "./App.css";
import music1 from "./assets/music/silverwolf.wav";
import music2 from "./assets/music/got-a-date-8-bit.mp3";
import Game from "./function/gameController";

function App() {
  const playerRef = useRef(null);
  const groundRefs = useRef([]);
  const worldRef = useRef(null);
  const scoreRef = useRef(null);
  const startScreenRef = useRef(null);
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);
  useEffect(() => {
    const game = new Game({
      playerElem: playerRef.current,
      groundElems: groundRefs.current,
      worldElem: worldRef.current,
      scoreElem: scoreRef.current,
      startScreenElem: startScreenRef.current,
      audio1: audio1Ref.current,
      audio2: audio2Ref.current,
    });

    game.initialize();
    return () => {
      // Clean up listeners when component unmounts
      window.removeEventListener("resize", game.setPixelToWorldScale);
      document.removeEventListener("keydown", game.handleStart);
    };
  }, []);
  return (
    <>
      {/* WORLD */}
      <div className="world" data-world ref={worldRef}>
        <div className="display">
          <h3>Score:</h3>
        </div>
        <div className="score" data-score ref={scoreRef}>
          <p>0</p>
        </div>
        <div className="start-screen" data-start-screen ref={startScreenRef}>
          <h4>Press Any Key To Start</h4>
        </div>
        <img
          src={ground}
          alt="ground"
          className="ground"
          data-ground
          ref={(el) => (groundRefs.current[0] = el)}
        />
        <img
          src={ground}
          alt="ground"
          className="ground"
          data-ground
          ref={(el) => (groundRefs.current[1] = el)}
        />
        <img
          src={player}
          alt="player"
          className="dino"
          data-player
          ref={playerRef}
        />
      </div>
      <audio id="myAudio1" loop ref={audio1Ref}>
        <source src={music1} type="audio/mp3"></source>
      </audio>
      <audio id="myAudio2" loop ref={audio2Ref}>
        <source src={music2} type="audio/mp3"></source>
      </audio>
    </>
  );
}

export default App;
