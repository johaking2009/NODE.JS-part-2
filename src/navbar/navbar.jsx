import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Nav({ soundOn, setSoundOn, voiceOn, setVoiceOn }) {
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const soundMenuRef = useRef();
  const voiceMenuRef = useRef();

  // Menudan tashqariga bosilsa yopiladi
  useEffect(() => {
    function handleClick(e) {
      if (
        soundMenuRef.current &&
        !soundMenuRef.current.contains(e.target) &&
        voiceMenuRef.current &&
        !voiceMenuRef.current.contains(e.target)
      ) {
        setShowSoundMenu(false);
        setShowVoiceMenu(false);
      }
    }
    if (showSoundMenu || showVoiceMenu)
      document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showSoundMenu, showVoiceMenu]);

  return (
    <nav className="navbar">
      <div className="logo">edclub</div>
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Ovoz iconi */}
        <button
          className="sound-icon-btn"
          onClick={() => {
            setShowSoundMenu((v) => !v);
            setShowVoiceMenu(false);
          }}
          aria-label="Keyboard Sound"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 9v6h4l5 5V4L7 9H3z" stroke="#222" strokeWidth="2" fill="none"/>
            <path d="M16.5 8.5a5 5 0 010 7" stroke="#1976d2" strokeWidth="2" fill="none"/>
          </svg>
        </button>
        {showSoundMenu && (
          <div className="sound-menu" ref={soundMenuRef}>
            <label className="sound-switch-label">
              Keyboard Sound
              <input
                type="checkbox"
                checked={soundOn}
                onChange={() => setSoundOn((v) => !v)}
              />
              <span className="slider"></span>
            </label>
          </div>
        )}

        {/* Voice Over iconi */}
        <button
          className="sound-icon-btn"
          onClick={() => {
            setShowVoiceMenu((v) => !v);
            setShowSoundMenu(false);
          }}
          aria-label="Voice Over"
        >
          {/* Voice icon (microphone) */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="12" rx="3" stroke="#222" strokeWidth="2"/>
            <path d="M5 10v2a7 7 0 0014 0v-2" stroke="#1976d2" strokeWidth="2"/>
            <path d="M12 22v-4" stroke="#1976d2" strokeWidth="2"/>
          </svg>
        </button>
        {showVoiceMenu && (
          <div className="sound-menu" ref={voiceMenuRef}>
            <label className="sound-switch-label">
              Voice Over
              <input
                type="checkbox"
                checked={voiceOn}
                onChange={() => setVoiceOn((v) => !v)}
              />
              <span className="slider"></span>
            </label>
          </div>
        )}

        {/* Typing link */}
        <Link to="/typing" className="nav-link">
          Typing
        </Link>
      </div>
    </nav>
  );
}