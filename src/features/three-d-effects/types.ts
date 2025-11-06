import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// Extend R3F's JSX IntrinsicElements
extend({
  Group: THREE.Group,
  Mesh: THREE.Mesh,
  BoxGeometry: THREE.BoxGeometry,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  AmbientLight: THREE.AmbientLight,
  DirectionalLight: THREE.DirectionalLight,
  PointLight: THREE.PointLight,
})

// Make the types available globally
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      mesh: any
      boxGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      directionalLight: any
      pointLight: any
    }
  }
}