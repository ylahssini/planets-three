import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function useOrbit({ radius = 1, speed = 1 }) {
    const ref = useRef(null);
    const index = useRef(0);

    useFrame(() => {
        if (ref.current) {
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
                index.current += speed;
            }
        }
    });

    return ref;
}