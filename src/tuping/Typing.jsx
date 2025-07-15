import React, { useState, useEffect } from "react";
import "./Typing.css";
import keyboardHands from "./keyboard-hands.svg";

const initialKeys = ["f", "d", "g", "h", "j"];
const nextKeys = ["a", "f", "i", "f", "b"]; // Yashil bosilganda yangi ketma-ketlik

export default function Typing() {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [isNextStage, setIsNextStage] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [keys, setKeys] = useState(initialKeys);
  const [soundOn, setSoundOn] = useState(true); // Ovozni yoqish/ochirish uchun state

  const handleKeyDown = (e) => {
    if (e.key === keys[current]) {
      setSuccess(true);
      if (soundOn) {
        const utterance = new SpeechSynthesisUtterance(e.key);
        window.speechSynthesis.speak(utterance); // To'g'ri tugma bosilganda ovoz chiqaradi
      }
      setCompleted((prev) => [...prev, current]);
      setTimeout(() => {
        setSuccess(false);
        const nextIndex = (current + 1) % keys.length;
        if (nextIndex === 0 && current === keys.length - 1) {
          if (!isNextStage) {
            setIsNextStage(true);
            setKeys(nextKeys); // Yashil bosilganda yangi ketma-ketlikka o'tadi
            setCompleted([]);
          } else {
            setShowCompletion(true); // Ikkala bosqich tugagach "Good Job!" ko'rsatiladi
          }
        }
        setCurrent(nextIndex);
      }, 500);
      setError(false);
    } else if ("asdfghjkl".includes(e.key)) {
      setError(true);
      setTimeout(() => {
        setError(false);
        if (current > 0) {
          setCurrent(current - 1);
          setCompleted((prev) => prev.filter((i) => i !== current));
        }
      }, 300);
    }
  };

  const handleTryAgain = () => {
    setCurrent(0);
    setError(false);
    setSuccess(false);
    setCompleted([]);
    setIsNextStage(false);
    setShowCompletion(false);
    setKeys(initialKeys); // "Try again" bosilganda original ketma-ketlikka qaytadi
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, keys, soundOn]); // soundOn qo'shildi

  if (showCompletion) {
    return (
      <div className="completion-screen">
        <div className="checkmark-animation">✓</div>
        <h1>GOOD JOB!</h1>
        <div className="progress-bar">
          <button className="try-again-btn" onClick={handleTryAgain}>Try again</button>
          <div className="progress"></div>
          <button className="next-btn">→</button>
        </div>
      </div>
    );
  }

  return (
    <div className="typing-container">
      <div className="top-row">
        <div className="letter-boxes">
          {keys.map((key, idx) => (
            <div
              key={idx}
              className={`letter ${
                completed.includes(idx)
                  ? "completed"
                  : idx === current
                  ? error
                    ? "error"
                    : success
                    ? "success"
                    : "active"
                  : ""
              }`}
            >
              {completed.includes(idx) && <span className="check">✓</span>}
              {key}
            </div>
          ))}
        </div>
      </div>
      <div className="keyboard">
        {"asdfghjkl".split("").map((key) => (
          <button
            key={key}
            className={`key ${
              key === keys[current]
                ? error
                  ? "error-key"
                  : "active-key"
                : completed.includes(keys.indexOf(key))
                ? "completed-key"
                : ""
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="hands-img">
        <img
          src={keyboardHands}
          alt="Hands on keyboard"
          className="hands-svg"
        />
      </div>
    </div>
  );
}