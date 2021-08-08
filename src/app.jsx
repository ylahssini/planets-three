import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html, OrbitControls } from '@react-three/drei';
import { RecoilRoot } from 'recoil';
import Wrapper from './components/wrapper';
import './app.scss';

function CustomLoader() {
    const { progress } = useProgress()

    return (
        <Html center>
            <span style={{ color: 'white', textAlign: 'center' }}>{Math.round(progress)} % loaded</span>
        </Html>
    )
}

const App = () => {
    return (
        <main>
            <Canvas>
                <React.Suspense fallback={<CustomLoader />}>
                    <RecoilRoot>
                        <Wrapper />
                        <OrbitControls rotateSpeed={0.5} panSpeed={0.5} zoomSpeed={0.5} />
                    </RecoilRoot>
                </React.Suspense>
            </Canvas>
        </main>
    );
}

export default App;
