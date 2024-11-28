import { useEffect } from "react";
import ground from "./assets/grass_ground.jpg";
import player from "./assets/image.gif";
import "./App.css";
import music1 from "./assets/music/silverwolf.wav";
import music2 from "./assets/music/got-a-date-8-bit.mp3";

function App() {
  useEffect(() => {
    import("./script.js");
  }, []);
  return (
    <>
      <div>
        <header>
          <h1>
            Dinosaur Game{" "}
            <img
              src={"./src/assets/dino-lose.png"}
              alt="icon"
              className="icon"
            />{" "}
            x Reactjs
            <img
              src={"./src/assets/logo.svg"}
              alt="icon"
              className="icon rotate"
            />
          </h1>
        </header>
      </div>
      <div className="world" data-world>
        <div className="display">
          <h3>Score:</h3>
        </div>
        <div className="score" data-score>
          <p>0</p>
        </div>
        <div className="start-screen" data-start-screen>
          <h4>Press Any Key To Start</h4>
        </div>
        <img src={ground} alt="ground" className="ground" data-ground />
        <img src={ground} alt="ground" className="ground" data-ground />
        <img src={player} alt="player" className="dino" data-dino />
      </div>
      <audio id="myAudio1" loop>
        <source src={music1} type="audio/mp3"></source>
      </audio>
      <audio id="myAudio2" loop>
        <source src={music2} type="audio/mp3"></source>
      </audio>
    </>
  );
}

export default App;
