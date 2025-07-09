// GameCanvas.jsx
/*
//lista de tarefas//
1- criar limite de background
2- mover o personagem com as setas do teclado/concluido
3- fazer o personagem pular
4- criar sprite especifico paraa cabeça do Bruno que siga o mouse
*/

import { Stage, Sprite } from '@pixi/react';
import { useState, useEffect, useRef } from 'react';

import background from '../assets/background.png';
import bruno from '../assets/bruno.png';

const GRAVITY = 0.5;
const JUMP_STRENGTH = -12;
const GROUND_Y = 490;
const MOVE_SPEED = 5;
const STAGE_WIDTH = 800;

const GameCanvas = () => {
  const [position, setPosition] = useState({ x: 100, y: GROUND_Y });
  const [flip, setFlip] = useState(false);

  const velocityY = useRef(0);
  const jumpCount = useRef(0); // contador de pulos
  const keysPressed = useRef({
    left: false,
    right: false,
    up: false,
  });

  // Função para tentar pular
  const tryJump = () => {
    if (jumpCount.current < 2) {
      velocityY.current = JUMP_STRENGTH;
      jumpCount.current += 1;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keysPressed.current.left = true;
          setFlip(true);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keysPressed.current.right = true;
          setFlip(false);
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
        case ' ':
          tryJump();
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keysPressed.current.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keysPressed.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const update = () => {
      setPosition((pos) => {
        let newX = pos.x;
        let newY = pos.y;

        // Movimento horizontal
        if (keysPressed.current.left) {
          newX = Math.max(newX - MOVE_SPEED, 0 + 10);
        }
        if (keysPressed.current.right) {
          newX = Math.min(newX + MOVE_SPEED, STAGE_WIDTH - 10);
        }

        // Movimento vertical (pulo + gravidade)
        newY += velocityY.current;
        velocityY.current += GRAVITY;

        // Ao tocar no chão
        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          velocityY.current = 0;
          jumpCount.current = 0; // resetar contador de pulos
        }

        return { x: newX, y: newY };
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#222',
      }}
    >
      <Stage width={STAGE_WIDTH} height={600} options={{ backgroundColor: 0x1099bb }}>
        <Sprite image={background} x={0} y={0} width={STAGE_WIDTH} height={600} />
        <Sprite
          image={bruno}
          x={position.x}
          y={position.y}
          anchor={0.5}
          scale={{ x: flip ? -0.3 : 0.3, y: 0.3 }}
        />
      </Stage>
    </div>
  );
};

export default GameCanvas;
