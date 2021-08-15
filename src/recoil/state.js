import { atom } from 'recoil';

export const planetState = atom({
    key: 'planets',
    default: {
        planets: {
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
            }
        },
        camera: {
            name: 'earth',
            position: [0, 0, 0],
        },
    },
});
