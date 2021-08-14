import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import EarthNormalMap from '../../assets/earth/8k_earth_normal_map.jpg';
import EarthDayColorMap from '../../assets/earth/8k_earth_daymap.jpg';
import EarthBumpMap from '../../assets/earth/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/earth/8k_earth_clouds.jpg';
import MoonMap from '../../assets/earth/moon_map.jpg';
import MoonNormal from '../../assets/earth/moon_normal.jpg';
import MoonBump from '../../assets/earth/moon_bump.jpg';

function useOrbit() {
    const ref = useRef(null);
    const index = useRef(0);

    useFrame(() => {
        if (ref.current) {
            const radius = 2.8;
            const points = 400;
            const angle = (index.current / points) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);

            ref.current.position.x = x;
            ref.current.position.z = z;
            ref.current.position.y = 0;

            if (index.current > frames) {
                index.current = 0;
            } else {
                index.current += 1;
            }
        }
    });

    return ref;
}

const Earth = () => {
    const [show, setShow] = useState(false);
    const [normalMap, colorMap, bumpMap, cloudMap, moonMap, moonNormal, moonBump] = useLoader(TextureLoader, [EarthNormalMap, EarthDayColorMap, EarthBumpMap, EarthCloudsMap, MoonMap, MoonNormal, MoonBump]);
    const orbitRef = useOrbit();
    const [, setState] = useRecoilState(planetState);
    const earthRef = useRef();
    const cloudRef = useRef();
    const moonRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;

        if (earthRef.current && cloudRef.current) {
            earthRef.current.rotation.y = elapsed / 6;
            cloudRef.current.rotation.y = elapsed / 6;
        }
    });

    function handleGo() {
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'earth',
                position: [-8, 0, 0],
            },
        }));
    }

    return (
        <group>
            <mesh ref={cloudRef} position={[8, 0, 0]} castShadow>
                <sphereGeometry args={[1.51, 100, 100]} castShadow />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.5} />
            </mesh>
            <mesh
                ref={earthRef}
                position={[8, 0, 0]}
                rotation={[0, 0, 0.3]}
                onClick={handleGo}
                onDoubleClick={() => setShow(true)}
                castShadow
            >
                <sphereGeometry args={[1.5, 100, 100]} castShadow />
                <meshPhysicalMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
                <Html distanceFactor={10}>
                    <Tooltip
                        title="الأرض"
                        description="الأرض هي ثالث كواكب المجموعة الشمسية بعدًا عن الشمس بعد عطارد والزهرة، وتعتبر من أكبر الكواكب الأرضية وخامس أكبر الكواكب في النظام الشمسي"
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
            <group ref={orbitRef}>
                <mesh ref={moonRef} position={[8, 0, 0]} castShadow>
                    <sphereGeometry args={[0.2, 100, 100]} receiveShadow castShadow />
                    <meshPhysicalMaterial specular={moonBump} />
                    <meshStandardMaterial
                        map={moonMap}
                        normalMap={moonNormal}
                        bumpMap={moonBump}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>
        </group>
    )
};

export default Earth;
