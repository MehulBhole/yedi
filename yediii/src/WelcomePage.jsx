import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Gradient & float animations
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;
const floatHeart = keyframes`
  0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity:0; }
  20% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity:0; }
`;

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ffafbd, #ffc3a0, #ffdde1);
    background-size: 300% 300%;
    font-family: 'Quicksand', sans-serif;
    overflow: hidden;
    position: relative;
    animation: ${gradient} 15s ease infinite;
    transition: background 0.5s;
  }
`;

const GlassContainer = styled.div`
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 40px 60px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  text-align: center;
  animation: ${float} 6s ease-in-out infinite;
`;

const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 5em;
  background: linear-gradient(45deg, #ff6b6b, #fc5c7d, #6c5b7b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 10px rgba(255,255,255,0.3);
  margin-bottom: 30px;
  letter-spacing: 2px;
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;
const Button = styled.button`
  font-family: 'Quicksand', sans-serif;
  padding: 15px 40px;
  font-size: 1.2em;
  background: linear-gradient(45deg, #fc5c7d, #6c5b7b);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.5s;
  box-shadow: 0 5px 15px rgba(252,92,125,0.4);
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(252,92,125,0.6);
  }
  &.color-btn {
    background: linear-gradient(45deg, #ff6b6b, #fc5c7d);
  }
`;
const Subtitle = styled.p`
  color: white;
  font-size: 1.2em;
  margin-bottom: 30px;
  font-weight: 300;
  opacity: 0.9;
`;
const LoveMsg = styled.p`
  position: absolute;
  bottom: 20px;
  font-size: 0.9em;
  color: white;
  opacity: 0.8;
  font-weight: 300;
  left: 50%;
  transform: translateX(-50%);
`;

const Heart = styled.div`
  position: absolute;
  font-size: 1.5rem;
  pointer-events: none;
  animation: ${floatHeart} ${(props) => props.duration}s linear forwards;
  left: ${(props) => props.left}vw;
  opacity: 0.6;
`;

const PageTransition = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: white;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s;
  z-index: 1000;
`;

export function WelcomePage({ onEnterGallery }) {
  const [bgIndex, setBgIndex] = React.useState(0);
  const [hearts, setHearts] = React.useState([]);
  const pageTransitionRef = useRef(null);

  useEffect(() => {
    const heartEmojis = ['💗','💖','💝','💕','♥️'];
    const interval = setInterval(() => {
      setHearts((hearts) => [
        ...hearts,
        {
          id: Date.now(),
          emoji: heartEmojis[Math.floor(Math.random()*heartEmojis.length)],
          left: Math.random() * 100,
          duration: Math.random() * 5 + 3,
        }
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (hearts.length > 50) setHearts((h) => h.slice(h.length-50));
  }, [hearts]);

  const gradients = [
    'linear-gradient(135deg, #ffafbd, #ffc3a0, #ffdde1)',
    'linear-gradient(135deg, #e0c3fc, #8ec5fc, #c2e9fb)',
    'linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4)',
    'linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)',
    'linear-gradient(135deg, #ffecd2, #fcb69f, #fad0c4)',
  ];

  useEffect(() => {
    document.body.style.background = gradients[bgIndex];
  }, [bgIndex]);

  // Go to gallery with fade out
  function handleEnterGallery() {
    const node = pageTransitionRef.current;
    if (node) {
      node.style.opacity = '1';
      setTimeout(() => {
        onEnterGallery();
      }, 1000);
    }
  }

  return (
    <>
      <GlobalStyle />
      <PageTransition ref={pageTransitionRef} />
      {hearts.map(h => (
        <Heart key={h.id} left={h.left} duration={h.duration}>{h.emoji}</Heart>
      ))}
      <GlassContainer>
        <Title>Welcome to Our Gallery</Title>
        <Subtitle>Every moment with you is a treasure worth keeping...</Subtitle>
        <BtnContainer>
          <Button className="color-btn" onClick={()=>setBgIndex(v=>((v+1)%gradients.length))}>
            Change Colors 🎨
          </Button>
          <Button onClick={handleEnterGallery}>
            Enter Our Love Story ✨
          </Button>
        </BtnContainer>
      </GlassContainer>
      <LoveMsg>Made with love, for my pookie 💕</LoveMsg>
    </>
  );
}
