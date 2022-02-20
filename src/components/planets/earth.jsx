import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useStore } from '../../store';
import Tooltip from '../tooltip';
import EarthNormalMap from '../../assets/earth/8k_earth_normal_map.webp';
import EarthDayColorMap from '../../assets/earth/8k_earth_daymap.webp';
import EarthBumpMap from '../../assets/earth/8k_earth_specular_map.webp';
import EarthCloudsMap from '../../assets/earth/8k_earth_clouds.webp';
import MoonMap from '../../assets/earth/moon_map.webp';
import MoonNormal from '../../assets/earth/moon_normal.webp';
import MoonBump from '../../assets/earth/moon_bump.webp';

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

const selector = ({ planets, setCamera }) => ({ earth: planets.earth, setCamera });

const Earth = () => {
    const [show, setShow] = useState(false);
    const [normalMap, colorMap, bumpMap, cloudMap, moonMap, moonNormal, moonBump] = useLoader(TextureLoader, [EarthNormalMap, EarthDayColorMap, EarthBumpMap, EarthCloudsMap, MoonMap, MoonNormal, MoonBump]);
    const orbitRef = useOrbit();
    const { earth, setCamera } = useStore(selector);
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
        setCamera('earth');
    }

    return (
        <group>
            <mesh ref={cloudRef} position={earth.position} castShadow>
                <sphereGeometry args={[1.51, 100, 100]} castShadow />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.5} />
            </mesh>
            <mesh
                ref={earthRef}
                position={earth.position}
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
                <Html distanceFactor={100}>
                    <Tooltip
                        title="الأرض"
                        description="الأرض هي ثالث كواكب المجموعة الشمسية بعدًا عن الشمس بعد عطارد والزهرة، وتعتبر من أكبر الكواكب الأرضية وخامس أكبر الكواكب في النظام الشمسي"
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
            <group ref={orbitRef}>
                <mesh ref={moonRef} position={earth.position} receiveShadow castShadow>
                    <sphereGeometry args={[0.2, 100, 100]} />
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
