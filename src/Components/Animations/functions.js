export const rotateEmerald = (emeraldMeshRefRotation) => {
    emeraldMeshRefRotation.y += 0.05
}

export const explosionIsDone = (axePosition) => {
    axePosition.x = 100
}

export const explosionNotDone = (
    frameCounter,
    introAnimationDone,
    isAxeClicked,
    axeRefRotation,
    axeToEmeraldAnimationDone,
    wiggleAxe,
    axeToEmeraldAnimation
) => {
    if (axeToEmeraldAnimationDone === false) {
        axeToEmeraldAnimation()
    }
}
