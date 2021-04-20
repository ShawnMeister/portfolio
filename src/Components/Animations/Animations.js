/* eslint-disable react/jsx-key */

import { useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { rotateEmerald } from './functions'
import * as THREE from 'three'
import { WebGLRenderer } from 'three'

const Animations = ({ callbackFromParent, smashPromptUserClicked }) => {
    const [hovered, setHovered] = useState(false)
    const model = useLoader(GLTFLoader, '/scene.gltf')
    const { viewport } = useThree()

    const readyToExplode = useRef(false)
    const explosionDone = useRef(false)
    const interactiveAnimationHappening = useRef(false)
    let afterFirstExplosion = false
    const introAnimationDone = useRef(false)
    const axeToEmeraldAnimationDone = useRef(false)
    const lightFlashesDone = useRef(false)
    const promptSmashDialogPoppedUp = useRef(false)
    const smashPromptUserClickedRef = useRef(false)

    const countAxeClicks = useRef(0)

    const emeraldMeshRef = useRef()
    const emeraldSurface = useRef()
    const sphereRef = useRef()
    const sphere2Ref = useRef()
    const axeRef = useRef()
    const lightRef = useRef()

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
        lightRef.current.visible = false
    }, [])

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    const changeInSphereSize = 0.06
    let baseExplosionSphereSize = 2
    const changeInSphereSize2 = 0.1
    let baseExplosionSphereSize2 = 1
    let toEmeraldFlag = false
    useFrame(({ mouse }) => {
        frameCounter.current = frameCounter.current + 1
        // emerald spins until axeToEmerald animation is done.
        if (!axeToEmeraldAnimationDone.current === true)
            rotateEmerald(emeraldMeshRef.current.rotation)

        // move axe twice in circle x frames
        if (
            frameCounter.current > 50 &&
            frameCounter.current <= 100 &&
            introAnimationDone.current === false
        ) {
            // sets introAnimationDone to true and sets frameCounter to 0
            circulateAxe()
        }

        // wiggle axe until axe click
        // float axe until axe click
        if (
            introAnimationDone.current === true &&
            interactiveAnimationHappening.current === false &&
            countAxeClicks.current === 0
        ) {
            wiggleAxe()

            //sets frame to zero and zTiltCounter to zero, and interactiveAnimationHappening to true
            floatAxeBackAndForth()
        }

        /* USER EVENT AXE CLICK */
        // boomerang axe right and left for y frames
        // bring axe closer to user for y frames
        if (countAxeClicks.current === 1 && interactiveAnimationHappening.current === true) {
            boomerangAxe()
        }

        // continue spinning emerald until axe click
        // wiggle axe until axe click
        // float axe until axe click
        if (countAxeClicks.current === 1 && interactiveAnimationHappening.current === false) {
            wiggleAxe()
            floatAxeBackAndForth()
        }

        /* USER EVENT AXE CLICK */
        // boomerang axe right and left for y frames
        // bring axe closer to user for y frames
        if (interactiveAnimationHappening.current === true && countAxeClicks.current === 2) {
            boomerangAxe()
        }

        // continue spinning emerald until axe click
        // wiggle axe until axe click
        // float axe until axe click
        if (countAxeClicks.current === 2 && interactiveAnimationHappening.current === false) {
            wiggleAxe()
            floatAxeBackAndForth()
        }

        /* USER EVENT AXE CLICK */
        // boomerang axe right and left for z frames
        // bring axe closer to EMERALD for z frames
        if (interactiveAnimationHappening.current === true && countAxeClicks.current === 3) {
            axeToEmeraldAnimation()
        }

        // prompt user to smash emerald
        if (
            interactiveAnimationHappening.current === false &&
            axeToEmeraldAnimationDone.current === true &&
            promptSmashDialogPoppedUp.current === false
        ) {
            setTimeout(() => {
                promptUserToSmash()
            }, 500)
        }

        /* USER EVENT WAIT FOR SMASH PROMPT BUTTON CLICK */
        if (smashPromptUserClicked === true && smashPromptUserClickedRef.current === false) {
            smashPromptUserClickedRef.current = true
            frameCounter.current = 0
        }

        //Flash the axe with light
        if (lightFlashesDone.current === false && smashPromptUserClickedRef.current === true) {
            flashTheAxe()
        }

        /* USER EVENT AXE CLICK */
        // axe hits the emerald three times
        if (lightFlashesDone.current === true) {
            smashTheEmerald(mouse)
        }

        // EXPLODE Emerald
        if (lightFlashesDone.current === true) emeraldExplodes()
    })

    const emeraldExplodes = () => {
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
            emeraldMeshRef.current.scale.set(0.2, 0.2, 0.2)
            axeRef.current.position.x = 100
        }

        if (
            readyToExplode.current === true &&
            tempCounterSetBool === true &&
            frameCounter.current === tempCounter &&
            afterFirstExplosion === false
        ) {
            baseExplosionSphereSize2 = changeInSphereSize2 + baseExplosionSphereSize2

            afterFirstExplosion = true
            sphere2Ref.current.scale.set(
                baseExplosionSphereSize2,
                baseExplosionSphereSize2,
                baseExplosionSphereSize2
            )
        }

        if (afterFirstExplosion === true && explosionDone.current === false) {
            baseExplosionSphereSize2 = changeInSphereSize2 + baseExplosionSphereSize2
            sphere2Ref.current.scale.set(
                baseExplosionSphereSize2,
                baseExplosionSphereSize2,
                baseExplosionSphereSize2
            )

            setTimeout(function () {
                if (explosionDone.current === false) {
                    explosionDone.current = true
                    axeRef.current.visible = false
                    emeraldMeshRef.current.visible = false
                    sphere2Ref.current.visible = false
                    sphereRef.current.visible = false
                    emeraldSurface.current.visible = false
                    callbackFromParent('SHOWFOREGROUND')
                }
            }, 1500)
        }
    }

    const axeClicked = () => {
        if (
            introAnimationDone.current === true &&
            interactiveAnimationHappening.current === false &&
            introAnimationDone.current === true
        ) {
            interactiveAnimationHappening.current = true
            frameCounter.current = 0
            countAxeClicks.current = countAxeClicks.current + 1
        }
    }

    const circulateAxe = () => {
        axeRef.current.rotation.y = axeRef.current.rotation.y + 0.1255 * 2
        if (axeRef.current.rotation.y > 12.5) {
            introAnimationDone.current = true
            frameCounter.current = 0
        }
    }
    const flashTheAxe = () => {
        if (
            (frameCounter.current >= 20 && frameCounter.current <= 35) ||
            (frameCounter.current >= 50 && frameCounter.current <= 65) ||
            (frameCounter.current >= 80 && frameCounter.current <= 95)
        ) {
            lightRef.current.visible = true
        } else if (frameCounter.current > 95) {
            lightRef.current.visible = false
            lightFlashesDone.current = true
            frameCounter.current = 0
        } else {
            lightRef.current.visible = false
        }
    }

    const promptUserToSmash = () => {
        callbackFromParent('PROMPTSMASH')
        promptSmashDialogPoppedUp.current = true
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

        const wiggleClockwise = () => {
            axeRef.current.rotation.z = axeRef.current.rotation.z - zTiltSpeed

            if (
                axeRef.current.rotation.z > zlowTiltBottomBoundary &&
                axeRef.current.rotation.z < zlowTiltUpperBoundary
            ) {
                clockwiseFlag.current = false
                zTiltCounter.current = zTiltCounter.current + 1
            }
        }
        const wiggleCounterClockwise = () => {
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
            axeRef.current.rotation.z > zlowTilt &&
            axeRef.current.rotation.z < zhighTilt &&
            clockwiseFlag.current === false
        ) {
            wiggleCounterClockwise()
        }

        if (
            axeRef.current.rotation.z < zhighTiltUpperBoundary &&
            axeRef.current.rotation.z > zlowTiltBottomBoundary &&
            clockwiseFlag.current === true
        ) {
            wiggleClockwise()
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
        if (frameCounter.current >= 150) {
            frameCounter.current = 1
            zTiltCounter.current = 0
        }
    }

    const axeToEmeraldAnimation = () => {
        toEmeraldFlag = true
        boomerangAxe()
    }

    const boomerangAxe = () => {
        if (frameCounter.current < 50) {
            axeRef.current.position.x = axeRef.current.position.x + 0.2025
            axeRef.current.position.y = axeRef.current.position.y + 0.05
            if (toEmeraldFlag === false) {
                axeRef.current.position.z = axeRef.current.position.z + 0.01
            } else if (toEmeraldFlag === true) {
                axeRef.current.position.z = axeRef.current.position.z - 0.15
                axeRef.current.rotation.z = axeRef.current.rotation.z - 1.25
            }
            frameCounter.current = frameCounter.current + 1
        } else if (frameCounter.current >= 50 && frameCounter.current < 100) {
            if (toEmeraldFlag === false) {
                axeRef.current.position.x = axeRef.current.position.x - 0.2
                axeRef.current.position.y = axeRef.current.position.y - 0.05
            } else if (toEmeraldFlag === true) {
                axeRef.current.position.x = axeRef.current.position.x - 0.2
                axeRef.current.position.y = axeRef.current.position.y - 0.05
                axeRef.current.rotation.z = axeRef.current.rotation.z + 1.25
                if (axeRef.current.position.x < 1.2) {
                    interactiveAnimationHappening.current = false
                    frameCounter.current = 0
                    axeRef.current.position.z += 1.25
                    axeRef.current.rotation.z -= 1
                    axeRef.current.position.y += 0.25
                    emeraldMeshRef.current.scale.set(1.25, 1.25, 1.25)
                    emeraldMeshRef.current.position.z += 0.2
                    axeToEmeraldAnimationDone.current = true
                }
            }
            frameCounter.current = frameCounter.current + 1
        } else if (frameCounter.current === 101) {
            interactiveAnimationHappening.current = false
            frameCounter.current = 0
        }
    }

    const smashTheEmerald = (mouse) => {
        if (
            mouse.x > 0.35 &&
            interactiveAnimationHappening.current === true &&
            lightFlashesDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = -0.2
            axeRef.current.rotation.x = -0.02
        } else if (
            mouse.x > 0.3 &&
            interactiveAnimationHappening.current === true &&
            lightFlashesDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = 0
            axeRef.current.rotation.x = 0
        } else if (
            mouse.x > 0.25 &&
            interactiveAnimationHappening.current === true &&
            lightFlashesDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = 0.2
            axeRef.current.rotation.x = 0.02
        } else if (
            mouse.x > 0.2 &&
            interactiveAnimationHappening.current === true &&
            lightFlashesDone.current === true
        ) {
            axeRef.current.position.x = (mouse.x * viewport.width) / 2
            axeRef.current.position.y = (mouse.y * viewport.height) / 2
            axeRef.current.rotation.z = 0.6
            axeRef.current.rotation.x = 0.06
        } else if (
            mouse.x > -5 &&
            interactiveAnimationHappening.current === true &&
            lightFlashesDone.current === true
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
            interactiveAnimationHappening.current === true &&
            lightFlashesDone.current === true &&
            frameCounter.current > 100
        ) {
            frameCounter.current = 0
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
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerDown={axeClicked}
                />
            </mesh>
            <mesh ref={lightRef}>
                <directionalLight castShadow={true} intensity={1} position={[-1, -1, 1]} />
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
