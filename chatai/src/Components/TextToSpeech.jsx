import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaStop, FaAngleDoubleRight } from "react-icons/fa";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      synth.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  return (
    <div>
      <button className="btn btn-sm me-1 rounded-pill">
        {isPlaying ? (
          <FaPause color="#989898" onClick={handlePause}></FaPause>
        ) : (
          <FaPlay color="#989898" onClick={handlePlay} />
        )}
      </button>
    </div>
  );
};

export default TextToSpeech;
