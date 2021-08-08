import React, { useRef } from 'react';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import { planetState } from '../recoil/state';
import Mars from './planets/mars';
import Earth from './planets/earth';

const Wrapper = () => {
    const [state] = useRecoilState(planetState);
    const cameraRef = useRef();

    return (
        <PerspectiveCamera ref={cameraRef} position={state.camera.position}>
            <Stars radius={333} depth={1} />
            <pointLight color="#f8f8f0" position={[4, 0, 2]} intensity={1} />
            <Mars />
            <Earth />
        </PerspectiveCamera>
    )
};

export default Wrapper;
