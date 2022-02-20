import React, { useRef, useEffect } from 'react';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store';
import Mercury from './planets/mercury';
import Venus from './planets/venus';
import Earth from './planets/earth';
import Mars from './planets/mars';
import Jupiter from './planets/jupiter';
import Saturn from './planets/saturn';

const selector = ({ planets, camera, setLoading }) => ({ planets, camera, setLoading });

const Wrapper = () => {
    const { planets, camera, setLoading } = useStore(selector);
    const cameraRef = useRef();

    useEffect(() => {
        setLoading(false);
    }, [setLoading]);

    useFrame(() => {
        if (cameraRef.current) {
            const [, oy, oz] = planets[camera.name].camera;
            const [cx, cy, cz] = camera.position;
            const [rx, ry, rz] = Object.values(cameraRef.current.position);
            let speed = 1;

            if (cx < Math.round(rx)) {
                cameraRef.current.position.x = rx - speed;
            } else if (cx > Math.round(rx)) {
                cameraRef.current.position.x = rx + speed;
            } else {
                cameraRef.current.position.x = cx;
            }

            if (oy < 0) {
                cameraRef.current.position.y = cy < ry ? ry - speed : cy;
            } else {
                cameraRef.current.position.y = cy > ry ? ry + speed : cy;
            }

            if (oz < 0) {
                cameraRef.current.position.z = cz < rz ? rz - speed : cz;
            } else {
                cameraRef.current.position.z = cz > rz ? rz + speed : cz;
            }
        }
    });

    return (
        <PerspectiveCamera ref={cameraRef} castShadow>
            <Stars radius={333} depth={1} />
            <directionalLight
                color="#f8f8f0"
                position={[30, 0, 0]}
                intensity={1}
                castShadow
            />
            <Mercury />
            <Venus />
            <Earth />
            <Mars />
            <Jupiter />
            <Saturn />
        </PerspectiveCamera>
    )
};

export default Wrapper;
