import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { random } from 'lodash'
import { useFrame } from '@react-three/fiber'

export default () => {
    const mesh = useRef()
    const time = useRef(0)

    const [isActive, setIsActive] = useState(false)

    const isActiveRef = useRef(isActive)

    // position
    const position = useMemo(() => {
        return [random(-5, 5, true), random(-10, 10, true), random(-5, 5, true)]
    }, [])

    // random time mod factor
    const timeMod = useMemo(() => random(0.1, 4, true), [])

    // color
    let color = 0xf8f8ff

    //useEffect of the activeState
    useEffect(() => {
        isActiveRef.current = isActive
    }, [isActive])

    // raf loop
    useFrame(() => {
        mesh.current.rotation.y += 0.01 * timeMod
        if (isActiveRef.current) {
            time.current += 0.03
            mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4
        }
    })

    const onClick = useCallback(
        (e) => {
            e.stopPropagation()
            setIsActive((v) => !v)
        },
        [setIsActive]
    )

    return (
        <mesh ref={mesh} position={position} onClick={(e) => onClick(e)}>
            {/* Below in args, the first argument is the size of the spheres
the second argument is  */}
            <sphereBufferGeometry attach="geometry" args={[0.0047, 5, 0.29]} />

            <meshStandardMaterial attach="material" color={color} roughness={0.6} metalness={0.1} />
        </mesh>
    )
}
