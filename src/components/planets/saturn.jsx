import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import random from 'lodash.random';
import darken from 'polished/lib/color/darken';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import SaturnColorMap from '../../assets/saturn/saturn_map.webp';
import SaturnNormalMap from '../../assets/saturn/saturn_normal.webp';
import SaturnBumpMap from '../../assets/saturn/saturn_bump.webp';
import SaturnCloudsMap from '../../assets/saturn/saturn_clouds.webp';

const generatedRings = () => {
    const rings = [];

    let start = 20;
    let end = 21;

    const mapColors = ['#655f45', '#d8ae6d', '#ffe1ab', '#dbb57c', '#b89c72'];

    for (let i = 0; i < 20; i += 1) {
        let indexColor = random(0, mapColors.length - 1);
        const color = mapColors[indexColor];

        const difference = random(0.1, 0.8);
        start = i === 0 ? start : end;
        end = start + difference;

        rings.push({
            args: [start, end, 100],
            color: color,
        });
    }

    return rings;
};

const rings = generatedRings();

const Saturn = () => {
    const [show, setShow] = useState(false);
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(THREE.TextureLoader, [SaturnColorMap, SaturnBumpMap, SaturnNormalMap, SaturnCloudsMap]);
    const [state, setState] = useRecoilState(planetState)
    const saturnRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (saturnRef.current) {
            saturnRef.current.rotation.y = elapsed / 10 * -1;
            cloudRef.current.rotation.y = elapsed / 10 * -1;
        }
    });

    function handleGo() {
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'saturn',
                position: state.planets.saturn.camera,
            },
        }));
    }

    return (
        <>
            <mesh ref={cloudRef} position={state.planets.saturn.position}>
                <sphereGeometry args={[16.01, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
            </mesh>
            <mesh ref={saturnRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={state.planets.saturn.position}>
                <sphereGeometry args={[16, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorlMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
                <Html distanceFactor={100}>
                    <Tooltip
                        title="زحل"
                        description="زحل هو الكوكب السادس من حيث البُعد عن الشمس وهو ثاني أكبر كوكب في النظام الشمسي بعد المشتري، ويُصنف زحل ضمن الكواكب الغازية مثل المشتري وأورانوس ونبتون."
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
            {
                rings.map((ring, i) => (
                    <mesh key={ring.color + i} position={state.planets.saturn.position} rotation={[-180, 0, 0]} receiveShadow>
                        <ringGeometry args={ring.args} />
                        <meshBasicMaterial color={ring.color} side={THREE.DoubleSide} transparent opacity={0.75} />
                    </mesh>
                ))
            }
        </>
    )
}

export default Saturn;
