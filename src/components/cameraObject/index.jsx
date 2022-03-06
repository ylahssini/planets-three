import React, { useRef, useState, useEffect } from 'react';
import { CameraHelper } from 'three';
import { useHelper, PerspectiveCamera, TransformControls } from '@react-three/drei';
import { useStore } from '../../store';

const selector = (state) => state.setTarget;

const cameraObject = (props) => {
    const camera = useRef();
    const group = useRef();

    useHelper(camera, CameraHelper);

    useEffect(() => {
        if (group.current) {
            const controls = group.current;
            controls.setMode('rotate');

            const callback = event => {
                console.log(event.target);
                console.log(controls.getRotationAngle());
            }

            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)
        }
    })

    return (
        <TransformControls ref={group} mode="rotate">
            <mesh {...props} rotation={[-80, 0, 0]}>
                <coneBufferGeometry args={[1, 3, 4]} />
                <meshBasicMaterial color="red" wireframe />
            </mesh>

            <PerspectiveCamera makeDefault={false} near={1} far={4} ref={camera}>
                <meshBasicMaterial />
            </PerspectiveCamera>
        </TransformControls>
    );
}

export default cameraObject;
