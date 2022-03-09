import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '../../store';
import useOrbit from '../../hooks/useOrbit';
import JupiterColorMap from '../../assets/jupiter/jupiter_map.webp';
import JupiterNormalMap from '../../assets/jupiter/jupiter_normal.webp';
import JupiterBumpMap from '../../assets/jupiter/jupiter_bump.webp';
import JupiterCloudsMap from '../../assets/jupiter/jupiter_clouds.webp';

const selector = ({ sun, target}) => ({ sun, target });

const Jupiter = () => {
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(THREE.TextureLoader, [JupiterColorMap, JupiterBumpMap, JupiterNormalMap, JupiterCloudsMap]);
    const { sun, target } = useStore(selector);
    const orbitRef = useOrbit({ radius: 180, speed: 0.05, enabled: target === '' });
    const jupiterRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (jupiterRef.current) {
            jupiterRef.current.rotation.y = elapsed / 10 * -1;
            cloudRef.current.rotation.y = elapsed / 10 * -1;
        }
    });

    return (
        <group ref={orbitRef} name="jupiter">
            {
                ['jupiter', ''].includes(target)  ? (
                    <>
                        <mesh ref={cloudRef} position={sun.position}>
                            <sphereGeometry args={[20.01, 100, 100]} />
                            <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
                        </mesh>
                        <mesh ref={jupiterRef} position={sun.position}>
                            <sphereGeometry args={[20, 100, 100]} />
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

export default Jupiter;
