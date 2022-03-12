import { useMemo } from 'react';
import random from 'lodash.random';

export default function useRings({ colors = [], sizes = [], opacities = [], randomize = true, start, end }) {
    return useMemo(() => {
        if (start) {
            let a = start;
            let b = sizes.length > 0 ? start + sizes.reduce((acc, curr) => acc + curr, 0) : end;

            return Array(start).fill(null).map((_, i) => {
                let indexColor = random(0, colors.length - 1);
                const color = colors[indexColor];

                a = i === 0 ? a : b;

                if (randomize) {
                    const difference = random(0.1, 0.8);
                    b = a + difference;
                } else {
                    const sizeIndex = sizes[i];
                    b = a + sizeIndex;
                }

                return {
                    args: [a, b, 100],
                    color: color,
                    opacity: opacities[i] || 1,
                };
            });
        }

        return [];
    }, []);
}