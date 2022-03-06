import React, { useRef, useEffect } from 'react';
import { Stars, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useFrame, useThree, } from '@react-three/fiber';
import { useStore } from '../store';
import Mercury from './planets/mercury';
import Venus from './planets/venus';
import Earth from './planets/earth';
import Mars from './planets/mars';
import Jupiter from './planets/jupiter';
import Saturn from './planets/saturn';
import Sun from './sun';

const selector = ({ planets, camera, setLoading, target }) => ({ planets, camera, setLoading, target });

const Wrapper = () => {
    const { planets, setLoading, target } = useStore(selector);
    const cameraRef = useRef();
    const oc = useRef();

    useEffect(() => {
        setLoading(false);
    }, [setLoading]);

    return (
        <>
            <OrbitControls enabled={true} ref={oc} rotateSpeed={0.5} panSpeed={0.5} zoomSpeed={0.5} />

            <PerspectiveCamera ref={cameraRef} position={[-80, 0, -95]} fov={25} castShadow>
                <Stars radius={333} depth={1} />
                <pointLight
                    color="#f8f8f0"
                    position={[80, 0, 0]}
                    sphereSize={40}
                    intensity={1}
                    castShadow
                />
                <Sun />
                <Mercury />
                <Venus />
                <Earth />
                <Mars />
                <Jupiter />
                <Saturn />
            </PerspectiveCamera>
        </>
        
    )
};

export default Wrapper;
