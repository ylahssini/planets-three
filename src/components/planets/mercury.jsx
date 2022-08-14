import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '@src/store';
import useOrbit from '@src/hooks/useOrbit';
import MercuryColorMap from '@src/assets/mercury/mercury_map.webp';
import MercuryNormalMap from '@src/assets/mercury/mercury_normal.webp';
import MercuryBumpMap from '@src/assets/mercury/mercury_bump.webp';

const selector = ({ sun, target}) => ({ sun, target });

const Mercury = () => {
    const [colorlMap, bumpMap, normalMap] = useLoader(THREE.TextureLoader, [MercuryColorMap, MercuryBumpMap, MercuryNormalMap]);
    const { sun, target } = useStore(selector);
    const orbitRef = useOrbit({ radius: 60, speed: 0.895, enabled: target === '' });
    const mercuryRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (mercuryRef.current) {
            mercuryRef.current.rotation.y = elapsed / 16;
        }
    });

    return (
        <group ref={orbitRef} name="mercury">
            {
                ['mercury', ''].includes(target) ? (
                    <>
                        <mesh ref={mercuryRef} position={sun.position}>
                            <sphereGeometry args={[0.4, 100, 100]} />
                            <meshPhongMaterial specular={bumpMap} />
                            <meshStandardMaterial
                                map={colorlMap}
                                normalMap={normalMap}
                                bumpMap={bumpMap}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                    </>
                ) : null
            }
        </group>
    );
};

export default Mercury;
