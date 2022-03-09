import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import useOrbit from '../../hooks/useOrbit';
import useRings from '../../hooks/useRings';
import { useStore } from '../../store';
import SaturnColorMap from '../../assets/saturn/saturn_map.webp';
import SaturnNormalMap from '../../assets/saturn/saturn_normal.webp';
import SaturnBumpMap from '../../assets/saturn/saturn_bump.webp';
import SaturnCloudsMap from '../../assets/saturn/saturn_clouds.webp';

const selector = ({ sun, target}) => ({ sun, target });

const Saturn = () => {
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(THREE.TextureLoader, [SaturnColorMap, SaturnBumpMap, SaturnNormalMap, SaturnCloudsMap]);
    const { sun, target } = useStore(selector);
    const orbitRef = useOrbit({ radius: 230, speed: 0.07, enabled: target === '' });
    const saturnRef = useRef();
    const cloudRef = useRef();
    const rings = useRings({
        colors: [0x655f45, 0xd8ae6d, 0xffe1ab, 0xdbb57c, 0xb89c72],
        start: 20,
        end: 21,
    });

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (saturnRef.current) {
            saturnRef.current.rotation.y = elapsed / 10 * -1;
            cloudRef.current.rotation.y = elapsed / 10 * -1;
        }
    });

    return (
        <group ref={orbitRef} name="saturn">
            <>
                {
                    ['saturn', ''].includes(target) ? (
                        <>
                            <mesh ref={cloudRef} position={sun.position} castShadow>
                                <sphereGeometry args={[16.01, 100, 100]} />
                                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
                            </mesh>
                            <mesh ref={saturnRef} position={sun.position} castShadow>
                                <sphereGeometry args={[16, 100, 100]} />
                                <meshPhongMaterial specular={bumpMap} />
                                <meshStandardMaterial
                                    map={colorlMap}
                                    normalMap={normalMap}
                                    bumpMap={bumpMap}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                            {
                                rings.map((ring, i) => (
                                    <mesh key={ring.color + i} position={sun.position} rotation={[-30, 0.1, 0]} receiveShadow>
                                        <ringGeometry args={ring.args} />
                                        <meshStandardMaterial attach="material" color={ring.color} side={THREE.DoubleSide} opacity={0.85} />
                                    </mesh>
                                ))
                            }
                        </>
                    ) : null
                }
            </>
        </group>
    );
};

export default Saturn;
