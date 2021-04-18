import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
//import { random } from "lodash";
import { useFrame } from 'react-three-fiber'

/* 

magic button that goes to portfolio from landing Page



const radius 8
widthSegment goes from 31 to 3 while 
heightsegment goes from 32 to 4
const phistart 6

philength goes from 6.3 to 0 while 
thetastart goes from 6 to 0

philength goes back to 6.3 and goes to 0 while
thetalength drops from 6.3 to 0


radius 
widthSegments
heightSegments
phiStart
phiLength
thetaStart
thetaLength



*/

const Sphere = (props) => {
    const mesh = useRef()
    const time = useRef(0)
    let widSeg = 2
    let heiSeg = 4

    // const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false)

    const isActiveRef = useRef(isActive)

    // position
    /*   const position = useMemo(() => {
      return [random(-5, 5, true), random(-10, 10, true), random(-5, 5, true)];
    }, []); */

    const position = useMemo(() => {
        return [0, 0, 0]
    }, [])

    // random time mod factor
    /*  const timeMod = useMemo(() => random(0.1, 4, true), []); */

    //const timeMod = useMemo(() => 2, []);

    // color
    // let color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);

    //useEffect of the activeState
    useEffect(() => {
        isActiveRef.current = isActive
    }, [isActive])

    // raf loop
    //that means request animation frame
    useFrame(() => {
        /* mesh.current.rotation.y += 0.01 * timeMod; */
        mesh.current.rotation.y += 0.01
        if (isActiveRef.current) {
            time.current += 0.03
            /* mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4; */
            widSeg -= 10
            heiSeg -= 10

            mesh.current.position.y = position[1]
        }
    })

    // Hover Events
    /*   const onHover = useCallback(
    (e, value) => {
      e.stopPropagation();
      setIsHovered(value);
    },
    [setIsHovered]
  ); */

    const onClick = useCallback(
        (e) => {
            e.stopPropagation()
            setIsActive((v) => !v)
        },
        [setIsActive]
    )

    return (
        <group>
            <mesh
                ref={mesh}
                position={position}
                onClick={(e) => onClick(e)}

                //onPointerOver={e => onHover(e, true)}
                //onPointerOut={e => onHover(e, false)}
            >
                {/* Below in args, the first argument is the size of the spheres
the second argument is  */}
                <sphereBufferGeometry
                    attach="geometry"
                    args={[1, { widSeg }, { heiSeg }, 6, 6.3, 6.3, 6.3]}
                />
                {/* ,6,{philen},{thesta},{thelen} */}
                <meshStandardMaterial
                    attach="material"
                    color={0x39ff14}
                    roughness={0.5}
                    metalness={0.5}
                />
            </mesh>
        </group>
    )
}

export default Sphere
