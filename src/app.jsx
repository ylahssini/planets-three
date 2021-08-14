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
            <span className="loading">{Math.round(progress)}% تحميل... </span>
        </Html>
    )
}

const App = () => {
    return (
        <main>
            <Canvas shadowMap>
                <React.Suspense fallback={<CustomLoader />}>
                    <RecoilRoot>
                        <Wrapper />
                        <Html position={[0, 0, 0]} className="instruction">
                            <p>انقر فوق الكوكب للتركيز عليه أو انقر نقرًا مزدوجًا فوقه لإظهار المعلومات المتعلقة به.</p>
                        </Html>
                        <OrbitControls rotateSpeed={0.5} panSpeed={0.5} zoomSpeed={0.5} />
                    </RecoilRoot>
                </React.Suspense>
            </Canvas>
        </main>
    );
}

export default App;
