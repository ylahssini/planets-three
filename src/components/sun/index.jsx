import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import SunMap from '../../assets/sun/sun.png';

const Sun = () => {
    const sunRef = useRef();
    const [sunMap] = useLoader(THREE.TextureLoader, [SunMap]);

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (sunRef.current) {
            sunRef.current.rotation.y = elapsed / 40 * -1;
            sunRef.current.rotation.y = elapsed / 40 * -1;
        }
    });

    return (
        <mesh ref={sunRef} name="sun" position={[80, 0, 0]} receiveShadow={false}>
            <sphereGeometry args={[40, 300, 300]} />
            <meshBasicMaterial map={sunMap} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default Sun;
