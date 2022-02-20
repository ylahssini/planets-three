import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html, OrbitControls } from '@react-three/drei';
import Wrapper from './components/wrapper';
import Header from './components/header';
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
            <Header />

            <Canvas shadows>
                <React.Suspense fallback={<CustomLoader />}>
                    <Wrapper />
                    <OrbitControls rotateSpeed={0.5} panSpeed={0.5} zoomSpeed={0.5} />
                </React.Suspense>
            </Canvas>

            <footer>
                <span>من تصميم</span> <a href="https://ylahssini.vercel.app" target="_blank">يوسف الحسيني</a>
            </footer>
        </main>
    );
}

export default App;
