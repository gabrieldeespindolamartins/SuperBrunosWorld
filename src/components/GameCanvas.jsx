// GameCanvas.jsx

import { Stage, Sprite } from '@pixi/react'; // Importando da versão 7 correta
import { useState, useEffect } from 'react';

import background from '../assets/background.png'; // Imagem de fundo
import bruno from '../assets/bruno.png';           // Sprite do personagem

const GameCanvas = () => {
  const [position, setPosition] = useState({ x: 200, y: 350 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((pos) => {
        switch (e.key) {
          case 'ArrowRight':
          case 'd':
          case 'D':
            return { ...pos, x: pos.x + 5 };
          case 'ArrowLeft':
          case 'a':
          case 'A':
            return { ...pos, x: pos.x - 5 };
          case 'ArrowUp':
          case 'w':
          case 'W':
            return { ...pos, y: pos.y - 5 };
          case 'ArrowDown':
          case 's':
          case 'S':
            return { ...pos, y: pos.y + 5 };
          default:
            return pos;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#222' }}>
      <Stage width={1200} height={800} options={{ backgroundColor: 0x1099bb }}>
        {/* Fundo do jogo */}
        <Sprite image={background} x={0} y={0} width={1200} height={800} />
        {/* Personagem Bruno */}
        <Sprite image={bruno} x={position.x} y={position.y} scale={0.3} />
      </Stage>
    </div>
  );
};

export default GameCanvas;
