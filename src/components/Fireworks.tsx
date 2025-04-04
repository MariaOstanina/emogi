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
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
          min: 0,
          max: 360,
        },
        delay: {
          min: 30,
          max: 60,
        },
        rocketsPoint: {
          min: 50,
          max: 50,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3,
          },
          trace: {
            min: 1,
            max: 2,
          },
        },
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.015,
          max: 0.03,
        },
        mouse: {
          click: false,
          move: false,
          max: 1,
        },
      });

      fireworks.start();
      return () => fireworks.stop();
    }
  }, []);

  return <Wrapper ref={containerRef} />;
};
