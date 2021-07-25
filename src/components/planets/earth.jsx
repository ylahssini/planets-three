import React, { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Tooltip from '../tooltip';
import EarthNormalMap from '../../assets/earth/8k_earth_normal_map.jpg';
import EarthDayColorMap from '../../assets/earth/8k_earth_daymap.jpg';
import EarthBumpMap from '../../assets/earth/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/earth/8k_earth_clouds.jpg';

const Earth = () => {
    const [show, setShow] = useState(false);
    const [normalMap, colorMap, bumpMap, cloudMap] = useLoader(TextureLoader, [EarthNormalMap, EarthDayColorMap, EarthBumpMap, EarthCloudsMap]);

    const earthRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;

        if (earthRef.current && cloudRef.current) {
            earthRef.current.rotation.y = elapsed / 6;
            cloudRef.current.rotation.y = elapsed / 6;
        }
    });

    return (
        <>
            <mesh ref={cloudRef} position={[8, 0, 0]}>
                <sphereGeometry args={[1.51, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.5} />
            </mesh>
            <mesh ref={earthRef} position={[8, 0, 0]} rotation={[0, 0, 0.1]} onDoubleClick={() => setShow(true)}>
                <sphereGeometry args={[1.5, 100, 100]} />
                <meshPhysicalMaterial bumpMap={bumpMap} />
                <meshStandardMaterial map={colorMap} normalMap={normalMap} bumpMap={bumpMap} />
                <Html distanceFactor={25}>
                    <Tooltip
                        title="الأرض"
                        description="الأرض هي ثالث كواكب المجموعة الشمسية بعدًا عن الشمس بعد عطارد والزهرة، وتعتبر من أكبر الكواكب الأرضية وخامس أكبر الكواكب في النظام الشمسي"
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
        </>
    )
};

export default Earth;
