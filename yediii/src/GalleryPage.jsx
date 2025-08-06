import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// Images (Add more as needed)
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.jpg';
import pic6 from './assets/pic6.jpg';
import pic7 from './assets/pic7.jpg';
import pic8 from './assets/pic8.jpg';
import pic9 from './assets/pic9.jpg';
import pic10 from './assets/pic10.jpg';

const imageUrls = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic1, pic2, pic3];

const gradient = keyframes`
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1);}
  50% { opacity: 1; transform: scale(1.2);}
`;

const spotlightPulse = keyframes`
  0%, 100% {opacity:0.5;} 50% {opacity:0.9;}
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin:0; padding:0; min-height:100vh;
    background: linear-gradient(120deg,#ffd6e3,#ffe3ba,#c9f7f5,#d2b4fd,#eeaeca,#fff6eb);
    background-size: 300% 300%;
    animation: ${gradient} 14s ease-in-out infinite;
    display: flex; justify-content: center; align-items: center;
    font-family: 'Quicksand', 'Arial', sans-serif;
    overflow:hidden;
  }
`;

const FloatingLove = styled.div`
  position:fixed;
  top:40px; left:50%;
  transform:translateX(-50%);
  color:#fc5c7d;
  font-family:'Dancing Script', cursive;
  font-size:2.5em;
  text-shadow:0 2px 12px #fff9, 0 0 24px #fc5c7d40;
  opacity:0.86;
  pointer-events:none;
  z-index:2000;
  letter-spacing:2px;
  margin-bottom : 10px;
`;

const Stars = styled.div`
  position: fixed; top:0; left:0; width:100vw; height:100vh; pointer-events: none;
  z-index: 0;
`;

const Star = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  animation: ${twinkle} 2.3s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay};
  background: white;
  border-radius: 50%;
  position: absolute;
  box-shadow: 0 0 4px 2px #fff7, 0 0 16px #fec;
`;

const Spotlight = styled.div`
  position: fixed; top:0; left:50%; width:410px; height:410px;
  transform: translateX(-50%);
  background:
    radial-gradient(circle at 60% 40%,#ffdde1bf 0%,transparent 70%),
    radial-gradient(circle at 10% 100%,#fff0caae 0%,transparent 70%);
  pointer-events:none;
  z-index: 2;
  border-radius:50%;
  animation: ${spotlightPulse} 7s infinite;
`;

const AmbientLight = styled.div`
  position: fixed; pointer-events: none; width: 100vw; height: 100vh;
  background: radial-gradient(circle at 60% 12%, #fffbeab6 0%, transparent 50%);
  z-index: 1;
`;

const GalleryContainer = styled.div`
  position:fixed; top:53%; left:50%;
  transform: translate(-50%,-50%);
  width:100vw; height:100vh;
  display:flex; justify-content:center; align-items:center;
  perspective:2200px;
  z-index: 5;
`;

const Gallery = styled.div`
  position:relative;
  width:320px; height:440px;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(.7,-0.11,.37,1.02);
  touch-action: pan-y;
`;

const softGlow = css`
  box-shadow:
    0 8px 26px 6px #ffd6e345,
    0 0 0 3px #fff9,
    0 1.9px 7px #fba3b3a6;
`;

const Card = styled.div`
  position: absolute;
  width: 320px; height:440px;
  background: linear-gradient(140deg,rgba(235,255,254,.29),rgba(255,248,255,.43) 90%);
  border-radius:32px;
  border:2.5px solid #ffd6e3b0;
  transition: all 0.6s ease;
  cursor:pointer; overflow:hidden;
  transform-origin: center center;
  ${softGlow}
  opacity:0.84;
  z-index:1;
  &.active {
    transform: scale(1.19) translateZ(250px);
    box-shadow:
      0 16px 48px #fc5c7d55,
      0 0 0 3px #fff,
      0 2px 35px #fbb6cebb;
    border: 2.7px solid #fff;
    opacity:1;
    z-index:5;
  }
  &:hover {
    opacity:0.98;
    box-shadow:
      0 24px 60px #fcd8e878,
      0 0 15px #ffaec60c inset;
  }
  @media (max-width:768px) {
    width: 210px; height:290px; border-radius: 20px;
  }
`;

const CardImg = styled.img`
  width:100%; height:100%;
  object-fit: cover;
  object-position: center;
  border-radius:inherit;
  box-shadow: 0 0 33px #fbc2eb16 inset;
  filter: brightness(1.02) saturate(1.12) contrast(1.02);
  transition:
    transform 0.45s cubic-bezier(.53,0,.42,1),
    filter 0.37s cubic-bezier(.44,0,.3,1);
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.08) saturate(1.2);
  }
`;

const HeartOverlay = styled.div`
  position: absolute;
  left:11%; top:8%; font-size:2.3em; opacity:0.23; z-index:5;
  pointer-events: none;
  @media (max-width:768px) { font-size:1.1em; top:5%; }
`;

const Number = styled.div`
  position: absolute;
  bottom: 20px; right: 22px;
  background: linear-gradient(90deg,#fc5c7d85,#fbc2ebb7 80%);
  color: #fff; padding: 7px 19px;
  border-radius: 22px; font-size: 16px; font-weight: 600;
  z-index: 7; box-shadow: 0 2px 11px #ffe1d56c;
  backdrop-filter: blur(8px);
  letter-spacing:2px;
  text-shadow: 0 1px 3px #fc5c7d24;
`;

const NavButton = styled.button`
  position: fixed; top:53%;
  transform: translateY(-50%);
  width: 54px; height:54px; background: transparent;
  border: none; border-radius:50%;
  cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  color:#fc5c7d; font-size:31px; z-index: 1100;
  background: linear-gradient(135deg,#ffe3ba 35%,#ffb1b1 95%);
  opacity:.84; transition:box-shadow .21s, background .16s, scale .09s;
  ${softGlow}
  border:2.25px solid #fff7;
  outline:none;
  &:hover, &:focus {
    opacity:1;
    scale:1.10;
    background:linear-gradient(120deg,#fbc2eb 37%,#fc6c7b 99%);
    color:#fff;
    box-shadow:0 0 22px #fea4a3a6,0 0 60px #fff3,0 0 0 2.8px #fff8;
  }
  left: ${({ $prev }) => ($prev ? "12vw" : "unset")};
  right: ${({ $prev }) => ($prev ? "unset" : "12vw")};
  @media (max-width:768px) {
    left: ${({ $prev }) => ($prev ? "6vw" : "unset")};
    right: ${({ $prev }) => ($prev ? "unset" : "6vw")};
    width:38px; height:38px; font-size:22px;
  }
`;

export function GalleryPage() {
  const totalCards = imageUrls.length;
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startAngle = useRef(0);
  const galleryRef = useRef();
  const [radius, setRadius] = useState(540);
useEffect(() => {
  const baseCardWidth = window.innerWidth < 768 ? 210 : 320;
  const minAngleGap = 20; // Minimum degrees between cards

  const angleGap = Math.max(minAngleGap, 360 / totalCards);
  const angleGapRad = angleGap * (Math.PI / 180);

  // Calculate exact radius using trigonometry to avoid overlap
  const computedRadius = baseCardWidth / (2 * Math.tan(angleGapRad / 2));

  setRadius(computedRadius * 1.1); // 1.1 adds small spacing buffer
}, [totalCards]);


  const onMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startAngle.current = currentAngle;
    galleryRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const diff = (e.clientX - startX.current) * 0.5;
    setCurrentAngle(startAngle.current + diff);
  };
  const onMouseUp = () => {
    setIsDragging(false);
    galleryRef.current.style.cursor = 'grab';
  };
  const onTouchStart = (e) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    startAngle.current = currentAngle;
  };
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const diff = (e.touches[0].clientX - startX.current) * 0.5;
    setCurrentAngle(startAngle.current + diff);
  };
  const onTouchEnd = () => setIsDragging(false);

  const onWheel = (e) => {
    setCurrentAngle((curr) => curr + (e.deltaX * 0.1 || e.deltaY * 0.1));
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') setCurrentAngle((c) => c + 36);
      if (e.key === 'ArrowRight') setCurrentAngle((c) => c - 36);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 180 }, () => ({
        size: Math.random() * 3 + 1.5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
      }))
    );
  }, []);

  const cards = [];
const angleGap = Math.max(20, 360 / totalCards); // Same as used above
for (let i = 0; i < totalCards; i++) {
    const angle = (currentAngle + i * angleGap) * Math.PI / 180;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const rotateY = angle * (180 / Math.PI);
    const normalized = ((currentAngle + i * angleGap) % 360 + 360) % 360;
    const isActive = normalized > 350 || normalized < 10;
    const opacity = Math.max(3, 1 - Math.abs(normalized - 180) / 180);

    cards.push(
      <Card
        key={i}
        className={isActive ? "active" : ""}
        style={{
          transform: `translate3d(${x}px,0,${z}px) rotateY(${rotateY}deg)`,
          opacity,
        }}>
        <HeartOverlay>💗</HeartOverlay>
        <CardImg src={imageUrls[i]} alt={`Photo ${i + 1}`} draggable={false} />
        <Number>#{i + 1}</Number>
      </Card>
    );
  }

  const rotateGallery = (dir) => setCurrentAngle((c) => c + dir * angleGap);

  return (
    <>
      <GlobalStyle />
      <FloatingLove>💞</FloatingLove>
      <AmbientLight />
      <Spotlight />
      <Stars>
        {stars.map((star, i) => (
          <Star key={i} {...star} />
        ))}
      </Stars>
      <NavButton $prev onClick={() => rotateGallery(1)} aria-label="Previous">💕</NavButton>
      <NavButton onClick={() => rotateGallery(-1)} aria-label="Next">💖</NavButton>
      <GalleryContainer>
        <Gallery
          ref={galleryRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}
        >
          {cards}
        </Gallery>
      </GalleryContainer>
    </>
  );
}
