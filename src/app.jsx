import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Mars from './components/planets/mars';
import Earth from './components/planets/earth';
import './app.scss'

const App = () => {
    return (
        <main>
            <Canvas>
                <React.Suspense fallback={null}>
                    <PerspectiveCamera position={[-8, 0, 0]}>
                        <Stars radius={333} depth={1} />
                        <pointLight color="#f8f8f0" position={[4, 0, 2]} intensity={1} />
                        <Mars />
                        <Earth />
                    </PerspectiveCamera>

                    <OrbitControls
                        enableZoom
                        enableRotate
                        enablePan
                        panSpeed={0.5}
                        zoomSpeed={0.6}
                        rotateSpeed={0.6}
                    />
                </React.Suspense>
            </Canvas>
        </main>
    )
}

export default App;
