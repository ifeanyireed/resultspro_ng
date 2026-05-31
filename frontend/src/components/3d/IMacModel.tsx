'use client';

import * as THREE from 'three';
import React, { forwardRef, useLayoutEffect, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Screen_DarkBlue_0: THREE.Mesh
    Screen_LightBlue_0: THREE.Mesh
    Screen_Black_0: THREE.Mesh
    Screen_White_0: THREE.Mesh
    Screen_Screen_0: THREE.Mesh
    Screen_Chrome_0: THREE.Mesh
    Screen_CamBlack_0: THREE.Mesh
    Screen_Lens_0: THREE.Mesh
    Screen_Glass_0: THREE.Mesh
    Screen_Black001_0: THREE.Mesh
    Screen_Yellow_0: THREE.Mesh
    Rotate_Metal_0: THREE.Mesh
    Rotate_Metal2_0: THREE.Mesh
    Stand_LightBlue_0: THREE.Mesh
  }
  materials: {
    DarkBlue: THREE.MeshStandardMaterial
    LightBlue: THREE.MeshStandardMaterial
    Black: THREE.MeshStandardMaterial
    White: THREE.MeshStandardMaterial
    Screen: THREE.MeshStandardMaterial
    Chrome: THREE.MeshStandardMaterial
    ['Cam.Black']: THREE.MeshStandardMaterial
    Lens: THREE.MeshStandardMaterial
    Glass: THREE.MeshStandardMaterial
    ['Black.001']: THREE.MeshStandardMaterial
    Yellow: THREE.MeshStandardMaterial
    Metal: THREE.MeshStandardMaterial
    Metal2: THREE.MeshStandardMaterial
  }
}

interface IMacModelProps extends React.ComponentPropsWithoutRef<'group'> {
  screenImage?: string;
}

const IMacModel = forwardRef<THREE.Group, IMacModelProps>(({ screenImage, ...props }, ref) => {
  const { nodes, materials } = useGLTF('/models/imac.glb') as unknown as GLTFResult;
  const [meshAspect, setMeshAspect] = useState(16 / 9);

  // Measure actual screen mesh dimensions
  useLayoutEffect(() => {
    if (nodes.Screen_Screen_0) {
      nodes.Screen_Screen_0.geometry.computeBoundingBox();
      const box = nodes.Screen_Screen_0.geometry.boundingBox;
      if (box) {
        const width = Math.abs(box.max.x - box.min.x);
        const height = Math.abs(box.max.z - box.min.z);
        if (width > 0 && height > 0) setMeshAspect(width / height);
      }
    }
  }, [nodes]);

  // Boost saturation
  React.useMemo(() => {
    Object.values(materials).forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        const hsl = { h: 0, s: 0, l: 0 };
        material.color.getHSL(hsl);
        material.color.setHSL(hsl.h, Math.min(1, hsl.s * 1.5), hsl.l);
      }
    });
  }, [materials]);

  const texture = useTexture(screenImage || '/examspro-screenshot.png');

  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = true;
    texture.anisotropy = 16;
    
    // Restore previous high-fidelity filtering
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    
    // Logic to fill the mesh height (1.7) and slightly adjust width without too much stretch
    const baseZoom = 1.7;
    const xRepeat = baseZoom * 1.05; 
    const yRepeat = baseZoom;

    texture.repeat.set(xRepeat, yRepeat);
    texture.offset.set((1 - xRepeat) / 2, (1 - yRepeat) / 2);

    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
  }

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <group position={[0.032, 0, 0.387]}>
          <group position={[-0.03, 0, -0.387]}>
            <mesh geometry={nodes.Screen_DarkBlue_0.geometry} material={materials.DarkBlue} />
            <mesh geometry={nodes.Screen_LightBlue_0.geometry} material={materials.LightBlue} />
            <mesh geometry={nodes.Screen_Black_0.geometry} material={materials.Black} />
            <mesh geometry={nodes.Screen_White_0.geometry} material={materials.White} />
            <mesh geometry={nodes.Screen_Screen_0.geometry}>
              <meshStandardMaterial
                map={texture}
                emissiveMap={texture}
                emissive={new THREE.Color('#ffffff')}
                emissiveIntensity={0.8}
                roughness={0.1}
                metalness={0.2}
              />
            </mesh>
            <mesh geometry={nodes.Screen_Chrome_0.geometry} material={materials.Chrome} />
            <mesh geometry={nodes.Screen_CamBlack_0.geometry} material={materials['Cam.Black']} />
            <mesh geometry={nodes.Screen_Lens_0.geometry} material={materials.Lens} />
            <mesh geometry={nodes.Screen_Glass_0.geometry} material={materials.Glass} />
            <mesh geometry={nodes.Screen_Black001_0.geometry} material={materials['Black.001']} />
            <mesh geometry={nodes.Screen_Yellow_0.geometry} material={materials.Yellow} />
          </group>
          <mesh geometry={nodes.Rotate_Metal_0.geometry} material={materials.Metal} />
          <mesh geometry={nodes.Rotate_Metal2_0.geometry} material={materials.Metal2} />
        </group>
        <mesh geometry={nodes.Stand_LightBlue_0.geometry} material={materials.LightBlue} />
      </group>
    </group>
  );
});

IMacModel.displayName = 'IMacModel';
useGLTF.preload('/models/imac.glb');
export default IMacModel;
