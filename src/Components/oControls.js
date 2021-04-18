import React, { useRef } from 'react'
import { extend, useThree, useRender } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

function oControls(props) {
    const ref = useRef()
    const { camera, gl, mouse, intersect } = useThree()

    useRender(() => ref.current.update())

    return <orbitControls ref={ref} args={[camera, gl.domElement, mouse, intersect]} {...props} />
}

export default oControls
