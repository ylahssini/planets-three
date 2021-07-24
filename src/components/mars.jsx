import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import MarsNormalMap from '../assets/mars_10k_normal.jpg';
import MarsColorlMap from '../assets/mars_10k_color.jpg';
import MarsBumpMap from '../assets/mars_10k_topo.jpg';

const Mars = () => {
    const [normalMap, colorlMap, bumpMap,] = useLoader(TextureLoader, [MarsNormalMap, MarsColorlMap, MarsBumpMap]);

    const marsRef = useRef();
    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (marsRef.current) {
            marsRef.current.rotation.y = elapsed / 7;
        }
    });

    return (
        <>
            <mesh ref={marsRef}>
                <sphereGeometry args={[1, 50, 50]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial map={colorlMap} normalMap={normalMap} bumpMap={bumpMap} />
            </mesh>
        </>
    )
}

export default Mars;
