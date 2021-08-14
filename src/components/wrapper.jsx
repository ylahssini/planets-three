import React, { useRef } from 'react';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import { planetState } from '../recoil/state';
import Mars from './planets/mars';
import Earth from './planets/earth';
import Venus from './planets/venus';
import Jupiter from './planets/jupiter';

const Wrapper = () => {
    const [state] = useRecoilState(planetState);
    const cameraRef = useRef();

    useFrame(() => {
        if (cameraRef.current) {
            const [ox, oy, oz] = state.planets[state.camera.name].camera;
            const [cx, cy, cz] = state.camera.position;
            const [rx, ry, rz] = Object.values(cameraRef.current.position);
            let speed = 0.1;

            if (ox < 0) {
                if (cx < Math.round(rx)) {
                    cameraRef.current.position.x = rx - speed;
                } else if (cx > Math.round(rx)) {
                    cameraRef.current.position.x = rx + speed;
                } else {
                    cameraRef.current.position.x = cx;
                }
            } else {
                cameraRef.current.position.x = cx > rx ? rx + speed : cx;
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
        <PerspectiveCamera ref={cameraRef}>
            <Stars radius={333} depth={1} />
            <directionalLight
                color="#f8f8f0"
                position={[30, 0, 0]}
                intensity={1}
                castShadow
                shadow-mapSize-height={1024}
                shadow-mapSize-width={1024}
            />
            <Mars />
            <Earth />
            <Venus />
            <Jupiter />
        </PerspectiveCamera>
    )
};

export default Wrapper;
