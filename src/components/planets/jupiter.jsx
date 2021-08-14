import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';
import { useRecoilState } from 'recoil';
import Tooltip from '../tooltip';
import { planetState } from '../../recoil/state';
import JupiterColorMap from '../../assets/jupiter/jupiter_map.jpg';
import JupiterNormalMap from '../../assets/jupiter/jupiter_normal.jpg';
import JupiterBumpMap from '../../assets/jupiter/jupiter_bump.jpg';
import JupiterCloudsMap from '../../assets/jupiter/jupiter_clouds.jpg';

const Jupiter = () => {
    const [show, setShow] = useState(false);
    const [colorlMap, bumpMap, normalMap, cloudMap] = useLoader(TextureLoader, [JupiterColorMap, JupiterBumpMap, JupiterNormalMap, JupiterCloudsMap]);
    const [state, setState] = useRecoilState(planetState)
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
        setState((s) => ({
            ...s,
            camera: {
                ...s.camera,
                name: 'jupiter',
                position: state.planets.jupiter.camera,
            },
        }));
    }

    return (
        <>
            <mesh ref={cloudRef} position={state.planets.jupiter.position}>
                <sphereGeometry args={[5.01, 100, 100]} />
                <meshPhongMaterial map={cloudMap} transparent depthWrite opacity={0.3} />
            </mesh>
            <mesh ref={jupiterRef} onClick={handleGo} onDoubleClick={() => setShow(true)} position={state.planets.jupiter.position}>
                <sphereGeometry args={[5, 100, 100]} />
                <meshPhongMaterial specular={bumpMap} />
                <meshStandardMaterial
                    map={colorlMap}
                    normalMap={normalMap}
                    bumpMap={bumpMap}
                    side={THREE.DoubleSide}
                />
                <Html distanceFactor={15}>
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
