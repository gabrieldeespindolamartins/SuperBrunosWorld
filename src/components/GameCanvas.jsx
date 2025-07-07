// GameCanvas.jsx
/*
//lista de tarefas//
1- criar limite de background
2- mover o personagem com as setas do teclado/concluido
3- fazer o personagem pular
4- criar sprite especifico paraa cabeça do Bruno que siga o mouse
*/

import { Stage, Sprite } from '@pixi/react'; // Importando da versão 7 correta
import { useState, useEffect } from 'react';

import background from '../assets/background.png'; // Imagem de fundo
import bruno from '../assets/bruno.png';           // Sprite do personagem

const GameCanvas = () => {
  const [position, setPosition] = useState({ x: 200, y: 350 });

  useEffect(() => {// Hook para lidar com eventos de teclado
    const handleKeyDown = (e) => {// Função para mover o personagem com as teclas do teclado
      setPosition((pos) => {
        const spriteWidth = 300 * 0.3;  // 90
        const spriteHeight = 500 * 0.3; // 150
        const stageWidth = 1200;
        const stageHeight = 800;
      
        let newX = pos.x;
        let newY = pos.y;
      
        switch (e.key) {
          case 'ArrowRight':
          case 'd':
          case 'D':
            newX = Math.min(pos.x + 5, stageWidth - spriteWidth);
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            newX = Math.max(pos.x - 5, 0);
            break;
          
          default:
            break;
        }
      
        return { x: newX, y: newY };
      });
        }



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
