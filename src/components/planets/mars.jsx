import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import MarsNormalMap from '../../assets/mars/mars_normal.webp';
import MarsColorlMap from '../../assets/mars/mars_map.webp';
import MarsBumpMap from '../../assets/mars/mars_bump.webp';
import MarsCloudsMap from '../../assets/mars/mars_clouds.webp';

const Mars = () => {
    const [show, setShow] = useState(false);
    const [normalMap, colorlMap, bumpMap, cloudMap] = useLoader(TextureLoader, [MarsNormalMap, MarsColorlMap, MarsBumpMap, MarsCloudsMap]);
    const [state, setState] = useRecoilState(planetState)
    const marsRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (marsRef.current) {
            marsRef.current.rotation.y = elapsed / 7 * -1;
            cloudRef.current.rotation.y = elapsed / 7 * -1;
        }
    });

    function handleGo() {
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'mars',
                position: state.planets.mars.camera,
            },
        }));
    }

    return (
        <>
            <mesh ref={cloudRef} position={state.planets.mars.position}>
                <sphereGeometry args={[0.905, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.5} />
            </mesh>
            <mesh ref={marsRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={state.planets.mars.position}>
                <sphereGeometry args={[0.9, 100, 100]} />
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
