import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import MercuryColorMap from '../../assets/mercury/mercury_map.webp';
import MercuryNormalMap from '../../assets/mercury/mercury_normal.webp';
import MercuryBumpMap from '../../assets/mercury/mercury_bump.webp';

const Mercury = () => {
    const [show, setShow] = useState(false);
    const [colorlMap, bumpMap, normalMap] = useLoader(TextureLoader, [MercuryColorMap, MercuryBumpMap, MercuryNormalMap]);
    const [state, setState] = useRecoilState(planetState)
    const mercuryRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (mercuryRef.current) {
            mercuryRef.current.rotation.y = elapsed / 4 * -1;
        }
    });

    function handleGo() {
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'mercury',
                position: state.planets.mercury.camera,
            },
        }));
    }

    return (
        <>
            <mesh ref={mercuryRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={state.planets.mercury.position}>
                <sphereGeometry args={[0.4, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorlMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
                <Html distanceFactor={8}>
                    <Tooltip
                        title="عطارد"
                        description=".عُطَارِد هو أصغر كواكب المجموعة الشمسية وأقربها إلى الشمس. سريع الجري ومن هنا اسم الكوكب عطارد الذي يرمز إلى السرعة الكبيرة لدوران الكوكب حول الشمس"
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
        </>
    )
}

export default Mercury;
