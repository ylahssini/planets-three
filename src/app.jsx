import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import Wrapper from './components/wrapper';
import Header from './components/header';
import './app.scss';

function CustomLoader() {
    const { progress } = useProgress();
    const roundedProgress = Math.round(progress);

    console.log(roundedProgress);
    return (
        <Html center>
            <div className="loading">
                <p>المرجو إستعمال الحاسوب لتجربةٍ أفضل</p>
                <footer className="loading-progress">
                    <div className="loading-progress--percentage" style={{ width: `${roundedProgress}%` }}>{roundedProgress}%</div>
                </footer>
            </div>
        </Html>
    );
}

const App = () => {
    return (
        <main>
            <Header />

            <Canvas
                shadows
                gl={{ alpha: false }}
                dpr={[1, 1.5]}
                camera={{ fov: 40, position: [-80, 0, 0] }}
            >
                <React.Suspense fallback={<CustomLoader />}>
                    <Wrapper />
                </React.Suspense>
            </Canvas>

            <footer>
                <span>من تصميم</span> <a href="https://ylahssini.vercel.app" target="_blank" rel="noreferrer">يوسف الحسيني</a>
            </footer>
        </main>
    );
};

export default App;
