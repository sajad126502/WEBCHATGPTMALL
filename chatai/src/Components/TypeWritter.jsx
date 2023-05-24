import React, { useState, useEffect } from "react";

export default function TypeWriter(props) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingDelay = 30;
    const newText = props.response;

    let charIndex = 0;

    const typeWriter = () => {
      if (charIndex < newText.length) {
        const currentText = newText.substring(0, charIndex + 1);
        setDisplayText(currentText);
        charIndex++;
        setTimeout(typeWriter, typingDelay);
      } else {
        setShowCursor(false);
      }
    };

    typeWriter();
  }, [props.response]);

  return (
    <div className="type-writter">
      <p>
        {displayText}
        <span className="blinking-slash">{showCursor ? "|" : ""}</span>
      </p>
    </div>
  );
}
