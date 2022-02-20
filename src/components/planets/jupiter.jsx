import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useStore } from '../../store';
import Tooltip from '../tooltip';
import JupiterColorMap from '../../assets/jupiter/jupiter_map.webp';
import JupiterNormalMap from '../../assets/jupiter/jupiter_normal.webp';
import JupiterBumpMap from '../../assets/jupiter/jupiter_bump.webp';
import JupiterCloudsMap from '../../assets/jupiter/jupiter_clouds.webp';

const selector = ({ planets, setCamera }) => ({ jupiter: planets.jupiter, setCamera });

const Jupiter = () => {
    const [show, setShow] = useState(false);
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(TextureLoader, [JupiterColorMap, JupiterBumpMap, JupiterNormalMap, JupiterCloudsMap]);
    const { jupiter, setCamera } = useStore(selector);
    const jupiterRef = useRef();
    const cloudRef = useRef();

    useFrame(({ clock }) => {
        const elapsed = clock.elapsedTime;
        if (jupiterRef.current) {
            jupiterRef.current.rotation.y = elapsed / 10 * -1;
            cloudRef.current.rotation.y = elapsed / 10 * -1;
        }
    });

    function handleGo() {
        setCamera('jupiter');
    }

    return (
        <>
            <mesh ref={cloudRef} position={jupiter.position}>
                <sphereGeometry args={[20.01, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
            </mesh>
            <mesh ref={jupiterRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={jupiter.position}>
                <sphereGeometry args={[20, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorlMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
                <Html distanceFactor={100}>
                    <Tooltip
                        title="المشتري"
                        description="المُشْتَرِي هو أضخم كواكب المجموعة الشمسية. سمي بالمشتري لأنه يستشري في سيره أي يلـجُّ ويمضي ويَـجِدُّ فيه بلا فتور ولا انكسار"
                        show={show}
                        handleHide={() => setShow(false)}
                    />
                </Html>
            </mesh>
        </>
    )
}

export default Jupiter;
