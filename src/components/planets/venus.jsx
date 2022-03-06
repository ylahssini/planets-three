import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '../../store';
import useOrbit from '../../hooks/useOrbit';
import VenusColorMap from '../../assets/venus/venus_map.webp';
import VenusNormalMap from '../../assets/venus/venus_normal.webp';
import VenusBumpMap from '../../assets/venus/venus_bump.webp';
import VenusCloudsMap from '../../assets/venus/venus_clouds.webp';

const selector = ({ planets, setCamera }) => ({ sun: planets.sun, setCamera });

const Venus = () => {
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(THREE.TextureLoader, [VenusColorMap, VenusBumpMap, VenusNormalMap, VenusCloudsMap]);
    const { sun, setCamera } = useStore(selector);
    const venusRef = useRef();
    const cloudRef = useRef();
    const orbitRef = useOrbit({ radius: 60, speed: 0.45 })

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (venusRef.current) {
            venusRef.current.rotation.y = elapsed / 4 * -1;
            cloudRef.current.rotation.y = elapsed / 4 * -1;
        }
    });

    function handleGo() {
        setCamera('venus')
    }

    return (
        <group ref={orbitRef} name="venus">
            <mesh ref={cloudRef} position={sun.position}>
                <sphereGeometry args={[0.602, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
            </mesh>
            <mesh ref={venusRef} onClick={handleGo} position={sun.position}>
                <sphereGeometry args={[0.6, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorlMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}

export default Venus;
