import React, { useRef } from 'react'
import { map } from 'lodash'
import { useFrame } from 'react-three-fiber'

import Sphere from './Sphere'

export const BlueSpheres = () => {



	




	const group = useRef()

	useFrame(() => {
		group.current.rotation.y += 0.0003
	})

	const nodesSpheres = map(new Array(1000), (el, i) => {
		return <Sphere key={i} />
	})

	const nodesBackwardSpheres = map(new Array(1000), (el, i) => {
		return <Sphere key={i} />
	})

	return (
		<mesh>
			<group ref={group}>{nodesSpheres}</group>{' '}
			<group ref={group}>{nodesBackwardSpheres}</group>
		</mesh>
	)
}
