import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import MarsNormalMap from '../../assets/mars/mars_normal.jpg';
import MarsColorlMap from '../../assets/mars/mars_map.jpg';
import MarsBumpMap from '../../assets/mars/mars_bump.jpg';
import MarsCloudsMap from '../../assets/mars/mars_clouds.jpg';

const Mars = () => {
    const [show, setShow] = useState(false);
    const [normalMap, colorlMap, bumpMap, cloudMap] = useLoader(TextureLoader, [MarsNormalMap, MarsColorlMap, MarsBumpMap, MarsCloudsMap]);
    const [, setState] = useRecoilState(planetState)
    const marsRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (marsRef.current) {
            marsRef.current.rotation.y = elapsed / 7 * -1;
        }
    });

    function handleGo() {
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'mars',
                position: [0, 0, 0],
            },
        }));
    }

    return (
        <>
            <mesh ref={cloudRef} position={[0, 0, 0]}>
                <sphereGeometry args={[0.77, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.5} />
            </mesh>
            <mesh ref={marsRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={[0, 0, 0]}>
                <sphereGeometry args={[0.75, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorlMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
                <Html distanceFactor={8}>
                    <Tooltip
                        title="المريخ"
                        description="المِرِّيخ أو الكوكب الأحمر هو الكوكب الرابع من حيث البعد عن الشمس في النظام الشمسي وهو الجار الخارجي للأرض ويصنف كوكبا صخريا، من مجموعة الكواكب الأرضية"
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
        </>
    )
}

export default Mars;
