import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model3Dscene = () => {
    const { scene } = useGLTF('/models3D/scene.gltf');
    return <primitive object={scene} scale={1} />;
};

const Model3D = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={1.15} penumbra={1} />
            <Model3Dscene />
            <OrbitControls />
        </Canvas>
    );
};

export default Model3D;