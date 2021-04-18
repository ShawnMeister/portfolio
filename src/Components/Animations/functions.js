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
    if (
        frameCounter.current > 50 &&
        frameCounter.current <= 100 &&
        introAnimationDone.current === false &&
        isAxeClicked === false
    ) {
        axeRefRotation.y = axeRefRotation.y + 0.1255 * 2
        if (axeRefRotation.y > 12.5) {
            introAnimationDone.current = true
            frameCounter.current = 0
        }
    }

    if (
        isAxeClicked === false &&
        introAnimationDone.current === true &&
        axeToEmeraldAnimationDone === false
    ) {
        wiggleAxe()
    }
    if (axeToEmeraldAnimationDone === false) {
        axeToEmeraldAnimation()
    }
}
