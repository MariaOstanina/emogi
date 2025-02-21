import { useEffect, useRef } from 'react';
import { Fireworks as F } from 'fireworks-js';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & > * {
    position: absolute;
  }
`;

export const Fireworks = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const fireworks = new F(containerRef.current, {
        speed: 3,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineWidth: { explosion: { min: 1, max: 4 }, trace: { min: 1, max: 2 } },
        brightness: { min: 50, max: 100 },
        decay: { min: 0.01, max: 0.02 },
        sound: {
          enabled: true,
          files: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3'],
          volume: { min: 10, max: 30 },
        },
        mouse: { click: true, move: false, max: 3 },
      });

      fireworks.start();
      return () => fireworks.stop();
    }
  }, []);

  return <Wrapper ref={containerRef} />;
};
