import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();

  const handleSpeak = () => {
    if (isSpeaking) {
      cancel();
      setIsSpeaking(false);
    } else {
      speak({ text });
      setIsSpeaking(true);
    }
  };

  return (
    <div>
      <button className='btn btn-sm rounded-circle' onClick={handleSpeak}>
        {isSpeaking ? <FaPause color='#989898' /> : <FaPlay color='#989898' />}
      </button>
    </div>
  );
};

export default TextToSpeech;
