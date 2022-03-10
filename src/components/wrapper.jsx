import React, { useRef, useEffect } from 'react';
import { Stars, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store';
import Sun from './planets/sun';
import Mercury from './planets/mercury';
import Venus from './planets/venus';
import Earth from './planets/earth';
import Mars from './planets/mars';
import Jupiter from './planets/jupiter';
import Saturn from './planets/saturn';
import Uranus from './planets/uranus';
import Neptune from './planets/neptune';

const selector = ({ setLoading, target, planets, free_mode }) => ({ setLoading, target, planets, free_mode });

const Wrapper = ({ v = new THREE.Vector3() }) => {
    const { setLoading, target, planets, free_mode } = useStore(selector);
    const solarSystem = useRef();
    const planet = useRef();

    useEffect(() => {
        setLoading(false);
    }, [setLoading]);

    useEffect(() => {
        planet.current = target ? solarSystem.current?.getObjectByName(target) : null;
    });

    useFrame(({ camera }) => {
        if (planet.current && target !== '') {
            camera.fov = THREE.MathUtils.lerp(camera.fov, planets[target].fov, 0.05);

            const selectedPosition = planet.current.position;
            camera.position.lerp(v.set(selectedPosition.x, selectedPosition.y, selectedPosition.z), 0.05);
            camera.lookAt(planets[target].radiusX, selectedPosition.y, selectedPosition.z);
        } else if (!free_mode) {
            camera.fov = THREE.MathUtils.lerp(camera.fov, 40, 0.05);
            camera.position.lerp(v.set(-80, 0, 0), 0.05);
            camera.lookAt(0, 0, 0);
        }

        camera.updateProjectionMatrix();
    });

    return (
        <>
            <OrbitControls rotateSpeed={0.5} panSpeed={0.5} zoomSpeed={0.5} />

            <Stars radius={200} factor={6} count={8000} />
            <pointLight
                color="#f8f8f0"
                position={[80, 0.05, 0]}
                sphereSize={40}
                intensity={1}
                castShadow
            />
            <group ref={solarSystem}>
                <Sun />
                <Mercury />
                <Venus />
                <Earth />
                <Mars />
                <Jupiter />
                <Saturn />
                <Uranus />
                <Neptune />
            </group>
        </>
    );
};

export default Wrapper;
