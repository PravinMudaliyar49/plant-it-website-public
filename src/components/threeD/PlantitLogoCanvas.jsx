import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Preload, Stage, useProgress } from '@react-three/drei';

import PlantitLogo3D from './PlantitLogo3D';

export const CanvasLoader = () => {
    const { progress } = useProgress();
    return (
        <Html
            as="div"
            center
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <span className="canvas-loader"></span>
            <p
                style={{
                    fontSize: window.innerWidth < 750 ? 9 : 12,
                    color: '#F1F1F1',
                    fontWeight: 800,
                }}
            >
                {progress.toFixed(2)}%
            </p>
        </Html>
    );
};

const PlantitLogoCanvas = ({ canvascamera }) => {
    return (
        <Canvas camera={canvascamera}>
            <Suspense fallback={<CanvasLoader />}>
                <Stage environment="lobby" preset="rembrandt" intensity={0.01}>
                    <PlantitLogo3D />
                </Stage>
                <OrbitControls
                    autoRotate
                    // Default is 2.0
                    autoRotateSpeed={3.0}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Preload all />
            </Suspense>
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
};

export default PlantitLogoCanvas;
