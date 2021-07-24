import React from 'react';
import { Canvas } from '@react-three/fiber';
import Mars from './components/mars';

const App = () => {
    return (
        <main>
            <Canvas>
                <React.Suspense fallback={null}>
                    <Mars />
                </React.Suspense>
            </Canvas>
        </main>
    )
}

export default App;
