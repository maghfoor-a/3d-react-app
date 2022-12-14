import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Float, OrbitControls, Stage, Text3D } from '@react-three/drei'
import { useState } from 'react';
import { randFloat } from 'three/src/math/MathUtils';

function App() {
  const [shouldRotate, setShouldRotate] = useState<boolean>(false);

  const myColors = [
    "#cc0c39",
    "#e6781e",
    "#c8cf02",
    "#f8fcc1",
    "#1693a7"
  ]
  const handleToggleRotate = () => {
    setShouldRotate((prev) => !prev);
  }

  return (
    <>
      <div className="treeApp">
        <button onClick={handleToggleRotate}>Rotate</button>
      </div>
      <div id="canvas-container">
        <Canvas>
          <OrbitControls autoRotate={shouldRotate} autoRotateSpeed={20} />
          <Stage intensity={0.1} >
            <group position={[0, -3, 0]}>
              <group position={[-4, 0, -4]}>
                <Present color1={myColors[0]} color2={myColors[1]} size={1} />
              </group>
              <group position={[4, 0, 4]}>
                <Present color1={myColors[2]} color2={myColors[3]} size={0.5} />
              </group>
              <Tree />
              <group>
                {snowFlakes.map(snowflake => {
                  return <SnowFlake key={snowflake.id} position={snowflake.location} />
                })}
              </group>
            </group>

          </Stage>
          {/* <mesh position-y={-10}>
            <boxGeometry args={[1000, 0.01, 1000]} />
            <meshStandardMaterial color={myColors[3]} />
          </mesh> */}
          {/* <ambientLight intensity={0.2} />
          <directionalLight color="white" position={[-2, 0, 5]} />
          <directionalLight color="grey" position={[1, 0, 5]} /> */}
        </Canvas>
      </div>
    </>
  )
}

export default App

interface SnowFlakeProps {
  position: [number, number, number]
}

function SnowFlake(props: SnowFlakeProps): JSX.Element {
  return (
    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh position={props.position}>
        <sphereGeometry args={[0.1, 5, 5]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </Float>

  )
}
const snowFlakes = CreateSnowFlake()
console.log(snowFlakes)

interface SnowFlake {
  location: [number, number, number],
  id: number
}
function CreateSnowFlake() {
  const varstemp: SnowFlake[] = []
  for (let i = 0; i < 1500; i++) {
    varstemp.push({ id: i, location: randomPosition() })
  }

  function randomPosition(): [number, number, number] {
    return [
      randFloat(-25, 25),
      randFloat(-3, 25),
      randFloat(-25, 25)
    ]
  }
  return (
    varstemp
  )
}

interface PresentProps {
  color1: string,
  color2: string,
  size: number
}
function Present(props: PresentProps) {

  return (
    <group scale={props.size}>
      <Center top left position-y={3}>
        <Text3D font={"/Arimo_Bold.json"}>Presents</Text3D>
      </Center>
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[6, 0.5, 5]} />
        <meshStandardMaterial color={props.color1} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[5, 5, 4]} />
        <meshStandardMaterial color={props.color2} />
      </mesh>
    </group>
  )
}

function Tree() {
  const [size, setSize] = useState(1)
  return (
    <group onPointerEnter={() => setSize((prev) => prev*1.5)} onPointerLeave={() => setSize((prev) => prev/1.5)} scale={size}>
      <mesh position-y={10}>
        <coneGeometry args={[3, 7, 8]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
      <mesh position-y={5}>
        <coneGeometry args={[5, 10, 8]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
      <mesh position-y={0}>
        <cylinderGeometry args={[1, 1, 10, 8]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
    </group>
  )
}
