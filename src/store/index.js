import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const useStore = create((set) => ({
    loading: true,
    sun: { position: [80, 0, 0] },
    planets: {
        mercury: {
            radiusX: 60,
            fov: 1,
            title: { ar: 'عطارد', en: 'Mercury' },
        },
        venus: {
            radiusX: 100,
            fov: 4,
            title: { ar: 'الزهرة', en: 'Venus' },
        },
        earth: {
            radiusX: 125,
            fov: 4,
            title: { ar: 'الأرض', en: 'Earth' },
        },
        mars: {
            radiusX: 140,
            fov: 2,
            title: { ar: 'المريخ', en: 'Mars' },
        },
        jupiter: {
            radiusX: 180,
            fov: 35,
            title: { ar: 'المشتري', en: 'Jupiter' },
        },
        saturn: {
            radiusX: 220,
            fov: 35,
            title: { ar: 'زحل', en: 'Saturn' },
        },
        uranus: {
            radiusX: 250,
            fov: 20,
            title: { ar: 'أورانوس', en: 'Uranus' },
        },
        neptune: {
            radiusX: 280,
            fov: 20,
            title: { ar: 'نبتون', en: 'Neptune' },
        },
    },
    target: '',
    setTarget: (target) => set({ target }),
    setLoading: (loading) => set(() => ({ loading })),
}));

mountStoreDevtool('store', useStore);
