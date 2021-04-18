/* eslint-disable react/jsx-key */
/*
Emerald Params are below
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

import { useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { rotateEmerald, explosionIsDone, explosionNotDone } from './functions'
import * as THREE from 'three'
import { WebGLRenderer } from 'three'

const Animations = ({ showForeground, callbackFromParent }) => {
    const [hovered, setHovered] = useState(false)
    const model = useLoader(GLTFLoader, '/scene.gltf')
    const { viewport } = useThree()

    const readyToExplode = useRef(false)
    const explosionDone = useRef(false)
    let afterFirst = false
    const introAnimationDone = useRef(false)
    const isAxeClicked = useRef(false)
    const axeToEmeraldAnimationDone = useRef(false)

    const countAxeClicks = useRef(0)

    const emeraldMeshRef = useRef()
    const emeraldSurface = useRef()
    const sphereRef = useRef()
    const sphere2Ref = useRef()
    const axeRef = useRef()

    let tempCounter = -1
    let tempCounterSetBool = false
    const zTiltCounter = useRef(0)
    const frameCounter = useRef(0)

    const position = useMemo(() => {
        return [0, 0, 0]
    }, [])
    const clockwiseFlag = useRef(false)

    useEffect(() => {
        const renderer = new WebGLRenderer({ antialias: true })
        renderer.outputEncoding = THREE.sRGBEncoding
    }, [])

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const changeInSphereSize = 0.06
    let baseExplosionSphereSize = 2
    const changeInSphereSize2 = 0.1
    let baseExplosionSphereSize2 = 1
    useFrame(({ mouse }) => {
        if (!axeToEmeraldAnimationDone.current) rotateEmerald(emeraldMeshRef.current.rotation)

        if (explosionDone.current === false) {
            frameCounter.current = frameCounter.current + 1

            explosionNotDone(
                frameCounter,
                introAnimationDone,
                isAxeClicked.current,
                axeRef.current.rotation,
                axeToEmeraldAnimationDone.current,
                wiggleAxe,
                axeToEmeraldAnimation
            )

            smashTheEmerald(mouse)
        } else {
            explosionIsDone(axeRef.current.position)
        }

        if (readyToExplode.current === true && tempCounterSetBool === false) {
            tempCounterSetBool = true
            tempCounter = frameCounter.current + 5
        }

        if (readyToExplode.current === true) {
            baseExplosionSphereSize = changeInSphereSize + baseExplosionSphereSize
            sphereRef.current.scale.set(
                baseExplosionSphereSize,
                baseExplosionSphereSize,
                baseExplosionSphereSize
            )
            emeraldMeshRef.current.scale.set(0.5, 0.5, 0.5)
        }

        if (
            readyToExplode.current === true &&
            tempCounterSetBool === true &&
            frameCounter.current === tempCounter &&
            afterFirst === false
        ) {
            baseExplosionSphereSize2 = changeInSphereSize2 + baseExplosionSphereSize2

            afterFirst = true
            sphere2Ref.current.scale.set(
                baseExplosionSphereSize2,
                baseExplosionSphereSize2,
                baseExplosionSphereSize2
            )
        }

        if (afterFirst === true && explosionDone.current === false) {
            baseExplosionSphereSize2 = changeInSphereSize2 + baseExplosionSphereSize2
            sphere2Ref.current.scale.set(
                baseExplosionSphereSize2,
                baseExplosionSphereSize2,
                baseExplosionSphereSize2
            )

            setTimeout(function () {
                if (explosionDone.current === false) {
                    explosionDone.current = true
                    showForeground = true
                    axeRef.current.visible = false
                    emeraldMeshRef.current.visible = false
                    sphere2Ref.current.visible = false
                    sphereRef.current.visible = false
                    emeraldSurface.current.visible = false
                    callbackFromParent(showForeground)
                }
            }, 1500)
        }
    })

    const axeClicked = () => {
        if (introAnimationDone.current === true) {
            isAxeClicked.current = true
            frameCounter.current = 0
        }
    }

    const wiggleAxe = () => {
        const zTiltSpeed = 0.04
        const zlowTilt = 1.65
        const zhighTilt = 1.9
        const zlowTiltUpperBoundary = zlowTilt + zTiltSpeed * 1.5
        const zlowTiltBottomBoundary = zlowTilt - zTiltSpeed * 1.5
        const zhighTiltUpperBoundary = zhighTilt + zTiltSpeed * 1.5
        const zhighTiltBottomBoundary = zhighTilt - zTiltSpeed * 1.5
        frameCounter.current = frameCounter.current + 1

        floatAxeBackAndForth()

        if (
            axeRef.current.rotation.z > zlowTilt &&
            axeRef.current.rotation.z < zhighTilt &&
            clockwiseFlag.current === false
        ) {
            if (zTiltCounter.current < 4 && zTiltCounter.current > -1) {
                axeRef.current.rotation.z = axeRef.current.rotation.z + zTiltSpeed
                if (zTiltCounter.current < 2) {
                    axeRef.current.rotation.y = axeRef.current.rotation.y + zTiltSpeed / 10
                    axeRef.current.rotation.x = axeRef.current.rotation.x + zTiltSpeed / 10
                } else if (zTiltCounter.current < 4) {
                    axeRef.current.rotation.y = axeRef.current.rotation.y - zTiltSpeed / 10
                    axeRef.current.rotation.x = axeRef.current.rotation.x - zTiltSpeed / 10
                }
            }

            if (
                axeRef.current.rotation.z > zhighTiltBottomBoundary &&
                axeRef.current.rotation.z < zhighTiltUpperBoundary
            ) {
                clockwiseFlag.current = true
                zTiltCounter.current = zTiltCounter.current + 1
            }
        }

        if (
            axeRef.current.rotation.z < zhighTiltUpperBoundary &&
            axeRef.current.rotation.z > zlowTiltBottomBoundary &&
            clockwiseFlag.current === true
        ) {
            axeRef.current.rotation.z = axeRef.current.rotation.z - zTiltSpeed

            if (
                axeRef.current.rotation.z > zlowTiltBottomBoundary &&
                axeRef.current.rotation.z < zlowTiltUpperBoundary
            ) {
                clockwiseFlag.current = false
                zTiltCounter.current = zTiltCounter.current + 1
            }
        }
    }
    const floatAxeBackAndForth = () => {
        if (frameCounter.current < 76) {
            axeRef.current.rotation.x = axeRef.current.rotation.x - 0.0001
            axeRef.current.rotation.y = axeRef.current.rotation.y + 0.0001
        } else if (frameCounter.current < 150) {
            axeRef.current.rotation.x = axeRef.current.rotation.x + 0.0001
            axeRef.current.rotation.y = axeRef.current.rotation.y - 0.0001
        }
        if (frameCounter.current > 150) {
            frameCounter.current = 0
            zTiltCounter.current = 0
        }
    }

    const axeToEmeraldAnimation = () => {
        let toEmeraldFlag = false
        boomerangAxe()

        if (countAxeClicks.current === 2) {
            toEmeraldFlag = true
            boomerangAxe()
        }

        function boomerangAxe() {
            if (
                isAxeClicked.current === true &&
                introAnimationDone.current === true &&
                axeToEmeraldAnimationDone.current === false &&
                frameCounter.current < 50 &&
                countAxeClicks.current < 3
            ) {
                axeRef.current.position.x = axeRef.current.position.x + 0.2025
                axeRef.current.position.y = axeRef.current.position.y + 0.05
                if (toEmeraldFlag === false) {
                    axeRef.current.position.z = axeRef.current.position.z + 0.01
                } else if (toEmeraldFlag === true) {
                    axeRef.current.position.z = axeRef.current.position.z - 0.2
                    axeRef.current.rotation.z = axeRef.current.rotation.z - 1.25
                }
                frameCounter.current = frameCounter.current + 1
            } else if (
                isAxeClicked.current === true &&
                introAnimationDone.current === true &&
                axeToEmeraldAnimationDone.current === false &&
                frameCounter.current >= 50 &&
                frameCounter.current < 100 &&
                countAxeClicks.current < 3
            ) {
                if (toEmeraldFlag === false) {
                    axeRef.current.position.x = axeRef.current.position.x - 0.2
                    axeRef.current.position.y = axeRef.current.position.y - 0.05
                } else if (toEmeraldFlag === true) {
                    axeRef.current.position.x = axeRef.current.position.x - 0.2
                    axeRef.current.position.y = axeRef.current.position.y - 0.05
                    axeRef.current.rotation.z = axeRef.current.rotation.z + 1.25
                    if (axeRef.current.position.x < 1.05) {
                        axeToEmeraldAnimationDone.current = true

                        axeRef.current.position.z += 0.5
                        axeRef.current.rotation.z += 0.15

                        emeraldMeshRef.current.position.z += 0.5
                        isAxeClicked.current = false
                    }
                }
                frameCounter.current = frameCounter.current + 1
                if (frameCounter.current === 100) {
                    countAxeClicks.current = countAxeClicks.current + 1
                }
            }
        }
    }

    const smashTheEmerald = (mouse) => {
        if (
            mouse.x > 0.35 &&
            isAxeClicked.current === true &&
            axeToEmeraldAnimationDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = -0.2
            axeRef.current.rotation.x = -0.02
        } else if (
            mouse.x > 0.3 &&
            isAxeClicked.current === true &&
            axeToEmeraldAnimationDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = 0
            axeRef.current.rotation.x = 0
        } else if (
            mouse.x > 0.25 &&
            isAxeClicked.current === true &&
            axeToEmeraldAnimationDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = 0.2
            axeRef.current.rotation.x = 0.02
        } else if (
            mouse.x > 0.2 &&
            isAxeClicked.current === true &&
            axeToEmeraldAnimationDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = 0.6
            axeRef.current.rotation.x = 0.06
        } else if (
            mouse.x > -5 &&
            isAxeClicked.current === true &&
            axeToEmeraldAnimationDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = 0.6
            axeRef.current.rotation.x = 0.06
        }

        if (
            mouse.x > -0.2 &&
            mouse.x < 0.2 &&
            mouse.y > -0.2 &&
            mouse.y < 0.2 &&
            isAxeClicked.current === true &&
            axeToEmeraldAnimationDone.current === true &&
            frameCounter.current > 100
        ) {
            readyToExplode.current = true
        }
    }

    return (
        <group>
            <mesh>
                <primitive
                    ref={axeRef}
                    object={model.scene}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 1.75]}
                    scale={[10, 10, 10]}
                    onClick={axeClicked}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />
            </mesh>
            <mesh ref={sphereRef}>
                <sphereBufferGeometry
                    args={[0.5, 30, 30]}
                    attach="geometry"
                    roughness={0.5}
                    transparency={0.9}
                />
                <meshBasicMaterial color={0x61dafb} attach="material" />
            </mesh>
            <mesh ref={sphere2Ref}>
                <sphereBufferGeometry
                    args={[0.5, 30, 30]}
                    attach="geometry"
                    roughness={0.5}
                    transparency={0.9}
                />
                <meshBasicMaterial color={0x39ff14} attach="material" />
            </mesh>

            <mesh ref={emeraldMeshRef} position={position}>
                <sphereBufferGeometry attach="geometry" args={[1, 6.3, 6.3, 6, 6.3, 6.3, 6.3]} />

                <meshStandardMaterial
                    attach="material"
                    color={0x39ff14}
                    roughness={0.5}
                    metalness={0.5}
                    ref={emeraldSurface}
                />
            </mesh>
        </group>
    )
}
export default Animations
