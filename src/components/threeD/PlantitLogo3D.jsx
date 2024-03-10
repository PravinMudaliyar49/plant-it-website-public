/* eslint-disable react/no-unknown-property */

import { useGLTF } from '@react-three/drei';

function PlantitLogo3D(props) {
    const { nodes, materials } = useGLTF('/plantitLogo3D-transformed.glb');
    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.polySurface7.geometry} material={materials.Full_Logo} />
        </group>
    );
}

// useGLTF.preload('/plantitLogo3D-transformed.glb');

export default PlantitLogo3D;
