import React, { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store';
import useOrbit from '../../hooks/useOrbit';
import EarthNormalMap from '../../assets/earth/8k_earth_normal_map.webp';
import EarthDayColorMap from '../../assets/earth/8k_earth_daymap.webp';
import EarthBumpMap from '../../assets/earth/8k_earth_specular_map.webp';
import EarthCloudsMap from '../../assets/earth/8k_earth_clouds.webp';
import MoonMap from '../../assets/earth/moon_map.webp';
import MoonNormal from '../../assets/earth/moon_normal.webp';
import MoonBump from '../../assets/earth/moon_bump.webp';

const selector = ({ sun, target }) => ({ sun, target });

const Earth = () => {
    const [normalMap, colorMap, bumpMap, cloudMap, moonMap, moonNormal, moonBump] = useLoader(THREE.TextureLoader, [EarthNormalMap, EarthDayColorMap, EarthBumpMap, EarthCloudsMap, MoonMap, MoonNormal, MoonBump]);
    const { sun, target } = useStore(selector);
    const orbitMoonRef = useOrbit({ radius: 2.8 });
    const orbitEarthRef = useOrbit({ radius: 125, speed: 0.15, enabled: target === '' });
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

    return (
        <group ref={orbitEarthRef} name="earth">
            {
                ['earth', ''].includes(target) ? (
                    <>
                        <mesh ref={cloudRef} position={sun.position} castShadow>
                            <sphereGeometry args={[1.51, 100, 100]} />
                            <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.5} />
                        </mesh>
                        <mesh ref={earthRef} position={sun.position} rotation={[0, 0, 0.3]} castShadow>
                            <sphereGeometry args={[1.5, 100, 100]} />
                            <meshPhysicalMaterial specular={bumpMap} />
                            <meshStandardMaterial
                                map={colorMap}
                                normalMap={normalMap}
                                bumpMap={bumpMap}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                        <group ref={orbitMoonRef}>
                            <mesh ref={moonRef} position={sun.position} receiveShadow castShadow>
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
                    </>
                ) : null
            }
        </group>
    )
};

export default Earth;
