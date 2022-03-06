import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '../../store';
import useOrbit from '../../hooks/useOrbit';
import MercuryColorMap from '../../assets/mercury/mercury_map.webp';
import MercuryNormalMap from '../../assets/mercury/mercury_normal.webp';
import MercuryBumpMap from '../../assets/mercury/mercury_bump.webp';

const selector = ({ planets, setCamera }) => ({ sun: planets.sun, setCamera });

const Mercury = () => {
    const [colorlMap, bumpMap, normalMap] = useLoader(THREE.TextureLoader, [MercuryColorMap, MercuryBumpMap, MercuryNormalMap]);
    const { sun, setCamera } = useStore(selector);
    const orbitRef = useOrbit({ radius: 52, speed: 0.75 });
    const mercuryRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (mercuryRef.current) {
            mercuryRef.current.rotation.y = elapsed / 4 * -1;
        }
    });

    function handleGo() {
        setCamera('mercury');
    }

    return (
        <group ref={orbitRef}>
            <mesh ref={mercuryRef} onClick={handleGo} position={sun.position}>
                <sphereGeometry args={[0.4, 100, 100]} />
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

export default Mercury;
