import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '../../store';
import useOrbit from '../../hooks/useOrbit';
import VenusColorMap from '../../assets/venus/venus_map.webp';
import VenusNormalMap from '../../assets/venus/venus_normal.webp';
import VenusBumpMap from '../../assets/venus/venus_bump.webp';
import VenusCloudsMap from '../../assets/venus/venus_clouds.webp';

const selector = ({ sun, target}) => ({ sun, target });

const Venus = () => {
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(THREE.TextureLoader, [VenusColorMap, VenusBumpMap, VenusNormalMap, VenusCloudsMap]);
    const { sun, target } = useStore(selector);
    const venusRef = useRef();
    const cloudRef = useRef();
    const orbitRef = useOrbit({ radius: 100, speed: 0.2, enabled: target === '' });

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (venusRef.current) {
            venusRef.current.rotation.y = elapsed / -30;
            cloudRef.current.rotation.y = elapsed / -30;
        }
    });

    return (
        <group ref={orbitRef} name="venus">
            {
                ['venus', ''].includes(target) ? (
                    <>
                        <mesh ref={cloudRef} position={sun.position}>
                            <sphereGeometry args={[1.402, 100, 100]} />
                            <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
                        </mesh>
                        <mesh ref={venusRef} position={sun.position}>
                            <sphereGeometry args={[1.4, 100, 100]} />
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

export default Venus;
