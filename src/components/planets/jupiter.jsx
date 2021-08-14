import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import JupiterColorMap from '../../assets/jupiter/jupiter_map.jpg';
import JupiterNormalMap from '../../assets/jupiter/jupiter_normal.jpg';
import JupiterBumpMap from '../../assets/jupiter/jupiter_bump.jpg';
import JupiterCloudsMap from '../../assets/jupiter/jupiter_clouds.jpg';

const Jupiter = () => {
    const [show, setShow] = useState(false);
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(TextureLoader, [JupiterColorMap, JupiterBumpMap, JupiterNormalMap, JupiterCloudsMap]);
    const [, setState] = useRecoilState(planetState)
    const jupiterRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (jupiterRef.current) {
            jupiterRef.current.rotation.y = elapsed / 7 * -1;
        }
    });

    function handleGo() {
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'jupiter',
                position: [16, 0, 0],
            },
        }));
    }

    return (
        <>
            <mesh ref={cloudRef} position={[-16, 0, 0]}>
                <sphereGeometry args={[5.01, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
            </mesh>
            <mesh ref={jupiterRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={[-16, 0, 0]}>
                <sphereGeometry args={[5, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorlMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
                <Html distanceFactor={8}>
                    <Tooltip
                        title="الزهرة"
                        description="الزُّهَرَة هو ثاني كواكب المجموعة الشمسية من حيث المسافة بينه وبين الشمس. يبعد الزهرة عن الشمس نحو 108 مليون كيلومتر، ومدارها حول الشمس ليس دائريًا تمامًا"
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
        </>
    )
}

export default Jupiter;
