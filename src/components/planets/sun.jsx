import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '../../store';
import SunMap from '../../assets/sun/sun.webp';

const selector = ({ target }) => ({ target });

const Sun = () => {
    const sunRef = useRef();
    const [sunMap] = useLoader(THREE.TextureLoader, [SunMap]);
    const { target } = useStore(selector);

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (sunRef.current) {
            sunRef.current.rotation.y = elapsed / 40 * -1;
            sunRef.current.rotation.y = elapsed / 40 * -1;
        }
    });

    if (target) {
        return null;
    }

    return (
        <mesh ref={sunRef} name="sun" position={[80, 0, 0]} receiveShadow={false}>
            <sphereGeometry args={[45, 300, 300]} />
            <meshBasicMaterial map={sunMap} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default Sun;
