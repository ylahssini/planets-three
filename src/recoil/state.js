import { atom } from 'recoil';

export const planetState = atom({
    key: 'planets',
    default: {
        planets: {
            earth: [-8, 0, 0],
            mars: [-4, 0, 0],
        },
        camera: {
            name: 'earth',
            position: [-8, 0, 0],
        },
    },
});
