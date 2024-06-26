namespace SpriteKind {
    export const objectives = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass3, function (sprite, location) {
    if (controller.A.isPressed()) {
        tiles.setCurrentTilemap(tilemap`level`)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    movement = 0
    objectives2 = sprites.create(assets.image`myImage0`, SpriteKind.objectives)
    scaling.scaleByPercent(objectives2, 110, ScaleDirection.Uniformly, ScaleAnchor.Middle)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    compton_himself.sayText("Press e to harvest.", 100, false)
    if (controller.B.isPressed()) {
        kareao_obtained += 1
        tileUtil.replaceAllTiles(assets.tile`myTile9`, sprites.castle.saplingPine)
        pause(100)
        compton_himself.sayText("Berry Obtained!", 1000, false)
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    movement = 1
    sprites.destroy(objectives2)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    compton_himself.sayText("Press e to harvest.", 100, false)
    if (controller.B.isPressed()) {
        kotukutuku_obtained += 1
        tileUtil.replaceAllTiles(assets.tile`myTile14`, sprites.castle.saplingOak)
        pause(100)
        compton_himself.sayText("Berry Obtained!", 1000, false)
    }
})
let kotukutuku_obtained = 0
let kareao_obtained = 0
let compton_himself: Sprite = null
let objectives2: Sprite = null
let movement = 0
movement = 1
objectives2 = sprites.create(assets.image`myImage0`, SpriteKind.Player)
sprites.destroy(objectives2)
compton_himself = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level_1`)
tiles.placeOnTile(compton_himself, tiles.getTileLocation(15, 36))
forever(function () {
    if (movement == 1) {
        if (controller.down.isPressed()) {
            compton_himself.vy += 50
            animation.runImageAnimation(
            compton_himself,
            [img`
                . . . . f f f f . . . . . 
                . . f f f f f f f f . . . 
                . f f f f f f c f f f . . 
                f f f f f f c c f f f c . 
                f f f c f f f f f f f c . 
                c c c f f f e e f f c c . 
                f f f f f e e f f c c f . 
                f f f b f e e f b f f f . 
                . f 4 1 f 4 4 f 1 4 f . . 
                . f e 4 4 4 4 4 4 e f . . 
                . f f f e e e e f f f . . 
                f e f b 7 7 7 7 b f e f . 
                e 4 f 7 7 7 7 7 7 f 4 e . 
                e e f 6 6 6 6 6 6 f e e . 
                . . . f f f f f f . . . . 
                . . . f f . . f f . . . . 
                `,img`
                . . . . . . . . . . . . . 
                . . . . . f f f f . . . . 
                . . . f f f f f f f f . . 
                . . f f f f f f c f f f . 
                f f f f f f f c c f f f c 
                f f f f c f f f f f f f c 
                . c c c f f f e e f f c c 
                . f f f f f e e f f c c f 
                . f f f b f e e f b f f f 
                . f f 4 1 f 4 4 f 1 4 f f 
                . . f e 4 4 4 4 4 e e f e 
                . f e f b 7 7 7 e 4 4 4 e 
                . e 4 f 7 7 7 7 e 4 4 e . 
                . . . f 6 6 6 6 6 e e . . 
                . . . f f f f f f f . . . 
                . . . f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . 
                . . . . f f f f . . . . . 
                . . f f f f f f f f . . . 
                . f f f c f f f f f f . . 
                c f f f c c f f f f f f f 
                c f f f f f f f c f f f f 
                c c f f e e f f f c c c . 
                f c c f f e e f f f f f . 
                f f f b f e e f b f f f . 
                f f 4 1 f 4 4 f 1 4 f f . 
                e f e e 4 4 4 4 4 e f . . 
                e 4 4 4 e 7 7 7 b f e f . 
                . e 4 4 e 7 7 7 7 f 4 e . 
                . . e e 6 6 6 6 6 f . . . 
                . . . f f f f f f f . . . 
                . . . . . . . f f f . . . 
                `],
            100,
            true
            )
            pause(200)
            compton_himself.setVelocity(0, 0)
        }
        if (controller.up.isPressed()) {
            compton_himself.vy += -50
            animation.runImageAnimation(
            compton_himself,
            [img`
                . . . . f f f f . . . . . 
                . . f f c c c c f f . . . 
                . f f c c c c c c f f . . 
                f f c c c c c c c c f f . 
                f f c c f c c c c c c f . 
                f f f f f c c c f c c f . 
                f f f f c c c f c c f f . 
                f f f f f f f f f f f f . 
                f f f f f f f f f f f f . 
                . f f f f f f f f f f . . 
                . f f f f f f f f f f . . 
                f e f f f f f f f f e f . 
                e 4 f 7 7 7 7 7 7 c 4 e . 
                e e f 6 6 6 6 6 6 f e e . 
                . . . f f f f f f . . . . 
                . . . f f . . f f . . . . 
                `,img`
                . . . . . . . . . . . . . 
                . . . . . f f f f . . . . 
                . . . f f c c c c f f . . 
                . f f f c c c c c c f f . 
                f f c c c c c c c c c f f 
                f c c c c f c c c c c c f 
                . f f f f c c c c f c c f 
                . f f f f c c f c c c f f 
                . f f f f f f f f f f f f 
                . f f f f f f f f f f f f 
                . . f f f f f f f f f f . 
                . . e f f f f f f f f f . 
                . . e f f f f f f f f e f 
                . . 4 c 7 7 7 7 7 e 4 4 e 
                . . e f f f f f f f e e . 
                . . . f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . 
                . . . . . f f f f . . . . 
                . . . f f c c c c f f . . 
                . . f f c c c c c c f f . 
                . f f f c c c c c c c f f 
                f f f c c c c c c c c c f 
                f f c c c f c c c c c c f 
                . f f f f f c c c f c f f 
                . f f f f c c f f c f f f 
                . . f f f f f f f f f f f 
                . . f f f f f f f f f f . 
                . . f f f f f f f f f e . 
                . f e f f f f f f f f e . 
                . e 4 4 e 7 7 7 7 7 c 4 . 
                . . e e f f f f f f f e . 
                . . . . . . . . f f f . . 
                `],
            100,
            true
            )
            pause(200)
            compton_himself.setVelocity(0, 0)
        }
        if (controller.left.isPressed()) {
            compton_himself.vx += -50
            animation.runImageAnimation(
            compton_himself,
            [img`
                . . . . . f f f f f . . . 
                . . . f f f f f f f f f . 
                . . f f f c f f f f f f . 
                . . f f c f f f c f f f f 
                f f c c f f f c c f f c f 
                f f f f f e f f f f c c f 
                . f f f e e f f f f f f f 
                . . f f e e f b f e e f f 
                . . . f 4 4 f 1 e 4 e f . 
                . . . f 4 4 4 4 e f f f . 
                . . . f f e e e e e f . . 
                . . . f 7 7 7 e 4 4 e . . 
                . . . f 7 7 7 e 4 4 e . . 
                . . . f 6 6 6 f e e f . . 
                . . . . f f f f f f . . . 
                . . . . . . f f f . . . . 
                `,img`
                . . . . . . . . . . . . . 
                . . . . f f f f f f . . . 
                . . . f f f f f f f f f . 
                . . f f f c f f f f f f . 
                . f f f c f f f c f f f f 
                f f c c f f f c c f f c f 
                f f f f f e f f f f c c f 
                . f f f e e f f f f f f f 
                . . f f e e f b f e e f f 
                . . f f 4 4 f 1 e 4 e f . 
                . . . f 4 4 4 e e f f f . 
                . . . f f e e 4 4 e f . . 
                . . . f 7 7 e 4 4 e f . . 
                . . f f 6 6 f e e f f f . 
                . . f f f f f f f f f f . 
                . . . f f f . . . f f . . 
                `,img`
                . . . . . . . . . . . . . 
                . . . . f f f f f f . . . 
                . . . f f f f f f f f f . 
                . . f f f c f f f f f f . 
                . f f f c f f f c f f f f 
                f f c c f f f c c f f c f 
                f f f f f e f f f f c c f 
                . f f f e e f f f f f f f 
                . f f f e e f b f e e f f 
                . . f f 4 4 f 1 e 4 e f f 
                . . . f 4 4 4 4 e f f f . 
                . . . f f e e e e 4 4 4 . 
                . . . f 7 7 7 7 e 4 4 e . 
                . . f f 6 6 6 6 f e e f . 
                . . f f f f f f f f f f . 
                . . . f f f . . . f f . . 
                `],
            100,
            true
            )
            pause(200)
            compton_himself.setVelocity(0, 0)
        }
        if (controller.right.isPressed()) {
            compton_himself.vx += 50
            animation.runImageAnimation(
            compton_himself,
            [img`
                . . . . . . . . . . . . . 
                . . . f f f f f f . . . . 
                . f f f f f f f f f . . . 
                . f f f f f f c f f f . . 
                f f f f c f f f c f f f . 
                f c f f c c f f f c c f f 
                f c c f f f f e f f f f f 
                f f f f f f f e e f f f . 
                f f e e f b f e e f f f . 
                f f e 4 e 1 f 4 4 f f . . 
                . f f f e 4 4 4 4 f . . . 
                . 4 4 4 e e e e f f . . . 
                . e 4 4 e 7 7 7 7 f . . . 
                . f e e f 6 6 6 6 f f . . 
                . f f f f f f f f f f . . 
                . . f f . . . f f f . . . 
                `,img`
                . . . . . . . . . . . . . 
                . . . f f f f f f . . . . 
                . f f f f f f f f f . . . 
                . f f f f f f c f f f . . 
                f f f f c f f f c f f f . 
                f c f f c c f f f c c f f 
                f c c f f f f e f f f f f 
                f f f f f f f e e f f f . 
                f f e e f b f e e f f . . 
                . f e 4 e 1 f 4 4 f f . . 
                . f f f e e 4 4 4 f . . . 
                . . f e 4 4 e e f f . . . 
                . . f e 4 4 e 7 7 f . . . 
                . f f f e e f 6 6 f f . . 
                . f f f f f f f f f f . . 
                . . f f . . . f f f . . . 
                `,img`
                . . . f f f f f . . . . . 
                . f f f f f f f f f . . . 
                . f f f f f f c f f f . . 
                f f f f c f f f c f f . . 
                f c f f c c f f f c c f f 
                f c c f f f f e f f f f f 
                f f f f f f f e e f f f . 
                f f e e f b f e e f f . . 
                . f e 4 e 1 f 4 4 f . . . 
                . f f f e 4 4 4 4 f . . . 
                . . f e e e e e f f . . . 
                . . e 4 4 e 7 7 7 f . . . 
                . . e 4 4 e 7 7 7 f . . . 
                . . f e e f 6 6 6 f . . . 
                . . . f f f f f f . . . . 
                . . . . f f f . . . . . . 
                `],
            100,
            true
            )
            pause(200)
            compton_himself.setVelocity(0, 0)
        }
    }
})
forever(function () {
    if (compton_himself.vx == 0 && compton_himself.vy == 0) {
        animation.stopAnimation(animation.AnimationTypes.All, compton_himself)
    }
    objectives2.setPosition(compton_himself.x, compton_himself.y)
    scene.cameraFollowSprite(compton_himself)
})
