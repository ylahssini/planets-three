import { atom } from 'recoil';

export const planetState = atom({
    key: 'planets',
    default: {
        planets: {
            mercury: {
                camera: [-12, 0, 0],
                position: [12, 0, 0],
            },
            venus: {
                camera: [-8, 0, 0],
                position: [8, 0, 0],
            },
            earth: {
                camera: [-1, 0, 0],
                position: [1, 0, 0]
            },
            mars: {
                camera: [8, 0, 0],
                position: [-8, 0, 0],
            },
            jupiter: {
                camera: [30, 0, 0],
                position: [-50, 0, 0]
            },
            saturn: {
                camera: [90, 0, 0],
                position: [-130, 0, 0]
            }
        },
        camera: {
            name: 'saturn',
            position: [90, 0, 0],
        },
    },
});
