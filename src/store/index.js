import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const planets = {
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
};

export const useStore = create((set) => ({
    loading: true,
    planets,
    camera: {
        name: 'earth',
        position: [0, 0, 0],
    },
    setLoading: (loading) => set(() => ({ loading })),
    setCamera: (planet) => set((state) => ({ camera: {
        ...state.camera,
        name: planet,
        position: planets[planet].camera,
    } })),
}));

mountStoreDevtool('store', useStore);
