import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '@src/store';
import useOrbit from '@src/hooks/useOrbit';
import MarsNormalMap from '@src/assets/mars/mars_normal.webp';
import MarsColorlMap from '@src/assets/mars/mars_map.webp';
import MarsBumpMap from '@src/assets/mars/mars_bump.webp';
import MarsCloudsMap from '@src/assets/mars/mars_clouds.webp';

const selector = ({ sun, target }) => ({ sun, target });

const Mars = () => {
    const [normalMap, colorlMap, bumpMap, cloudMap] = useLoader(THREE.TextureLoader, [MarsNormalMap, MarsColorlMap, MarsBumpMap, MarsCloudsMap]);
    const { sun, target } = useStore(selector);
    const orbitRef = useOrbit({ radius: 140, speed: 0.1, enabled: target === '' });
    const marsRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (marsRef.current) {
            marsRef.current.rotation.y = elapsed / 12;
            cloudRef.current.rotation.y = elapsed / 12;
        }
    });

    return (
        <group ref={orbitRef} name="mars">
            {
                ['mars', ''].includes(target) ? (
                    <>
                        <mesh ref={cloudRef} position={sun.position} rotation={[-0.252, 0, 0]}>
                            <sphereGeometry args={[0.505, 100, 100]} />
                            <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.5} />
                        </mesh>
                        <mesh ref={marsRef} position={sun.position} rotation={[-0.252, 0, 0]}>
                            <sphereGeometry args={[0.5, 100, 100]} />
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

export default Mars;
