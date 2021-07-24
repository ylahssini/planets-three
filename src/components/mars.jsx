import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import MarsNormalMap from '../assets/mars_10k_normal.jpg';
import MarsColorlMap from '../assets/mars_10k_color.jpg';
import MarsBumpMap from '../assets/mars_10k_topo.jpg';

const Mars = () => {
    const [open, setOpen] = useState(false);
    const [normalMap, colorlMap, bumpMap] = useLoader(TextureLoader, [MarsNormalMap, MarsColorlMap, MarsBumpMap]);

    const marsRef = useRef();
    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (marsRef.current) {
            marsRef.current.rotation.y = elapsed / 7;
        }
    });

    return (
        <>
            <mesh ref={marsRef} onDoubleClick={() => setOpen(true)}>
                <sphereGeometry args={[1, 50, 50]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial map={colorlMap} normalMap={normalMap} bumpMap={bumpMap} />
                <Html distanceFactor={25}>
                    <article className="tooltip" hidden={!open}>
                        <h4 className="tooltip-title">المريخ</h4>
                        <p className="tooltip-description">المِرِّيخ أو الكوكب الأحمر هو الكوكب الرابع من حيث البعد عن الشمس في النظام الشمسي وهو الجار الخارجي للأرض ويصنف كوكبا صخريا، من مجموعة الكواكب الأرضية</p>
                        <button className="tooltip-button" type="button" onClick={() => setOpen(false)}>إغلاق</button>
                    </article>
                </Html>
            </mesh>
        </>
    )
}

export default Mars;
