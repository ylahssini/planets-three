import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '@src/store';
import useOrbit from '@src/hooks/useOrbit';
import UranusColorMap from '@src/assets/uranus/uranus_map.webp';
import UranusBumpMap from '@src/assets/uranus/uranus_bump.webp';
import useRings from '@src/hooks/useRings';

const selector = ({ sun, target}) => ({ sun, target });

const Uranus = () => {
    const [colorlMap, bumpMap] = useLoader(THREE.TextureLoader, [UranusColorMap, UranusBumpMap]);
    const { sun, target } = useStore(selector);
    const uranusRef = useRef();
    const orbitRef = useOrbit({ radius: 260, speed: 0.025, enabled: target === '' });
    const rings = useRings({
        colors: ['#d2d9dd', '#d2dadd', '#e5f0f0', '#f5f8fc', '#f1e9eb', '#eaeef0', '#f0f4f8', '#e6ebf3', '#d7e1ee', '#e6e8f0', '#f3f7fa', '#eff1f3', '#e4ecf5'],
        opacities: [0.1, 0.15, 0.12, 0.14, 0.25, 0.18, 0.17, 0.22, 0.24, 0.17, 0.33, 0.45, 0.9, 0.48],
        sizes: [0.1, 0.05, 0.12, 0.07, 0.09, 0.06, 0.07, 0.09, 0.75, 0.15, 0.17, 0.23, 0.18],
        start: 10,
    });

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
                    <>
                        <mesh ref={uranusRef} position={sun.position} rotation={[0.978, 0, 0]}>
                            <sphereBufferGeometry args={[8, 200, 200]} />
                            <meshPhongMaterial specular={bumpMap} />
                            <meshStandardMaterial map={colorlMap} side={THREE.DoubleSide} />
                        </mesh>
                        {
                            rings.map((ring, i) => {
                                return (
                                    <mesh key={ring.color + i} position={sun.position} rotation={[0, 0.45, 0]} receiveShadow>
                                        <ringGeometry args={ring.args} />
                                        <meshStandardMaterial color={ring.color} side={THREE.DoubleSide} transparent opacity={ring.opacity} />
                                    </mesh>
                                );
                            })
                        }
                    </>
                ) : null
            }
        </group>
    );
};

export default Uranus;
