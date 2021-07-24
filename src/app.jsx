import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import Mars from './components/mars';

const App = () => {
    return (
        <main>
            <Canvas>
                <React.Suspense fallback={null}>
                    <Stars radius={333} depth={1} />
                    <pointLight color="#f8f8f0" position={[2,0,2]} intensity={0.85} />
                    <OrbitControls
                        enableZoom
                        enableRotate
                        enableRotate
                        panSpeed={0.5}
                        zoomSpeed={0.6}
                        rotateSpeed={0.6}
                    />
                    <Mars />
                </React.Suspense>
            </Canvas>
        </main>
    )
}

export default App;
