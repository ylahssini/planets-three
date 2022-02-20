import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useStore } from '../../store';
import Tooltip from '../tooltip';
import MercuryColorMap from '../../assets/mercury/mercury_map.webp';
import MercuryNormalMap from '../../assets/mercury/mercury_normal.webp';
import MercuryBumpMap from '../../assets/mercury/mercury_bump.webp';

const selector = ({ planets, setCamera }) => ({ mercury: planets.mercury, setCamera });

const Mercury = () => {
    const [show, setShow] = useState(false);
    const [colorlMap, bumpMap, normalMap] = useLoader(TextureLoader, [MercuryColorMap, MercuryBumpMap, MercuryNormalMap]);
    const { mercury, setCamera } = useStore(selector);
    const mercuryRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (mercuryRef.current) {
            mercuryRef.current.rotation.y = elapsed / 4 * -1;
        }
    });

    function handleGo() {
        setCamera('mercury');
    }

    return (
        <>
            <mesh ref={mercuryRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={mercury.position}>
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
