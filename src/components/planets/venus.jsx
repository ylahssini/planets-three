import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import VenusColorMap from '../../assets/venus/venus_map.webp';
import VenusNormalMap from '../../assets/venus/venus_normal.webp';
import VenusBumpMap from '../../assets/venus/venus_bump.webp';
import VenusCloudsMap from '../../assets/venus/venus_clouds.webp';

const Venus = () => {
    const [show, setShow] = useState(false);
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(TextureLoader, [VenusColorMap, VenusBumpMap, VenusNormalMap, VenusCloudsMap]);
    const [state, setState] = useRecoilState(planetState)
    const venusRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (venusRef.current) {
            venusRef.current.rotation.y = elapsed / 4 * -1;
            cloudRef.current.rotation.y = elapsed / 4 * -1;

        }
    });

    function handleGo() {
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'venus',
                position: state.planets.venus.camera,
            },
        }));
    }

    return (
        <>
            <mesh ref={cloudRef} position={state.planets.venus.position}>
                <sphereGeometry args={[0.602, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
            </mesh>
            <mesh ref={venusRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={state.planets.venus.position}>
                <sphereGeometry args={[0.6, 100, 100]} />
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

export default Venus;
