import React, {useCallback} from 'react';
import Particles from 'react-particles';
import {loadFull} from 'tsparticles';

export const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: 'transparent',
        },
        particles: {
          color: {value: '#fff'},
          move: {
            direction: 'bottom',
            enable: true,
            outModes: 'out',
            speed: 2,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: 10,
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 10,
          },
          zIndex: {
            value: {min: 0, max: 100},
          },
        },
      }}
    />
  );
};
