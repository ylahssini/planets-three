import React, { useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@src/store';
import useOrbit from '@src/hooks/useOrbit';
import EarthNormalMap from '@src/assets/earth/8k_earth_normal_map.webp';
import EarthDayColorMap from '@src/assets/earth/8k_earth_daymap.webp';
import EarthBumpMap from '@src/assets/earth/8k_earth_specular_map.webp';
import EarthCloudsMap from '@src/assets/earth/8k_earth_clouds.webp';
import MoonMap from '@src/assets/earth/moon_map.webp';
import MoonNormal from '@src/assets/earth/moon_normal.webp';
import MoonBump from '@src/assets/earth/moon_bump.webp';

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
            earthRef.current.rotation.y = elapsed / 11;
            cloudRef.current.rotation.y = elapsed / 11;
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
                        <mesh ref={earthRef} position={sun.position} rotation={[0, 0, -0.345]} castShadow>
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
    );
};

export default Earth;
