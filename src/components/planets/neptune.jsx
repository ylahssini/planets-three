import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useStore } from '../../store';
import useOrbit from '../../hooks/useOrbit';
import NeptuneColorMap from '../../assets/neptune/neptune_map.webp';
import NeptuneBumpMap from '../../assets/neptune/neptune_bump.webp';
import NeptuneNormalMap from '../../assets/neptune/neptune_normal.webp';

const selector = ({ sun, target}) => ({ sun, target });

const Neptune = () => {
    const [colorlMap, bumpMap, normalMap] = useLoader(THREE.TextureLoader, [NeptuneColorMap, NeptuneBumpMap, NeptuneNormalMap]);
    const { sun, target } = useStore(selector);
    const neptuneRef = useRef();
    const orbitRef = useOrbit({ radius: 280, speed: 0.01, enabled: target === '' });

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (neptuneRef.current) {
            neptuneRef.current.rotation.y = elapsed / 3 * -1;
        }
    });

    return (
        <group ref={orbitRef} name="neptune">
            {
                ['neptune', ''].includes(target) ? (
                    <mesh ref={neptuneRef} position={sun.position}>
                        <sphereBufferGeometry args={[7.65, 200, 200]} />
                        <meshPhongMaterial specular={bumpMap} />
                        <meshStandardMaterial
                            map={colorlMap}
                            bumpMap={bumpMap}
                            normalMap={normalMap}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ) : null
            }
        </group>
    )
}

export default Neptune;
