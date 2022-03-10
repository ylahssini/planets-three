import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '../../store';
import useOrbit from '../../hooks/useOrbit';
import UranusColorMap from '../../assets/uranus/uranus_map.webp';
import UranusBumpMap from '../../assets/uranus/uranus_bump.webp';

const selector = ({ sun, target}) => ({ sun, target });

const Uranus = () => {
    const [colorlMap, bumpMap] = useLoader(THREE.TextureLoader, [UranusColorMap, UranusBumpMap]);
    const { sun, target } = useStore(selector);
    const uranusRef = useRef();
    const orbitRef = useOrbit({ radius: 260, speed: 0.025, enabled: target === '' });

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (uranusRef.current) {
            uranusRef.current.rotation.y = elapsed / 6;
        }
    });

    return (
        <group ref={orbitRef} name="uranus">
            {
                ['uranus', ''].includes(target) ? (
                    <mesh ref={uranusRef} position={sun.position} rotation={[0.978, 0, 0]}>
                        <sphereBufferGeometry args={[8, 200, 200]} />
                        <meshPhongMaterial specular={bumpMap} />
                        <meshStandardMaterial
                            map={colorlMap}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ) : null
            }
        </group>
    );
};

export default Uranus;
