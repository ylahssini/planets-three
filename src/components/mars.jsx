import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import MarsNormalMap from '../assets/mars_10k_normal.jpg';
import MarsColorlMap from '../assets/mars_10k_color.jpg';
import MarsBumpMap from '../assets/mars_10k_topo.jpg';

const Mars = () => {
    const [normalMap, colorlMap, bumpMap,] = useLoader(TextureLoader, [MarsNormalMap, MarsColorlMap, MarsBumpMap]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <mesh>
                <sphereGeometry args={[1, 50, 50]} />
                <meshPhongMaterial color="crimson" wireframe />
                <meshStandardMaterial map={colorlMap} normalMap={normalMap} bumpMap={bumpMap} />
                <OrbitControls
                    enableZoom
                    enableRotate
                    enableRotate
                    panSpeed={0.5}
                    zoomSpeed={0.6}
                    rotateSpeed={0.6}
                />
            </mesh>
        </>
    )
}

export default Mars;
