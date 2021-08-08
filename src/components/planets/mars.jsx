import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import MarsNormalMap from '../../assets/mars/mars_10k_normal.jpg';
import MarsColorlMap from '../../assets/mars/mars_10k_color.jpg';
import MarsBumpMap from '../../assets/mars/mars_10k_topo.jpg';

const Mars = () => {
    const [show, setShow] = useState(false);
    const [normalMap, colorlMap, bumpMap] = useLoader(TextureLoader, [MarsNormalMap, MarsColorlMap, MarsBumpMap]);
    const [, setState] = useRecoilState(planetState)
    const marsRef = useRef();

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
                position: [-4, 0, 0],
            },
        }));
    }

    return (
        <>
            <mesh ref={marsRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={[4, 0, 0]}>
                <sphereGeometry args={[1, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial map={colorlMap} normalMap={normalMap} bumpMap={bumpMap} />
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
