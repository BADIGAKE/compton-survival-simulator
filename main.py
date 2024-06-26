@namespace
class SpriteKind:
    objectives = SpriteKind.create()

def on_overlap_tile(sprite, location):
    if controller.A.is_pressed():
        tiles.set_current_tilemap(tilemap("""
            level
        """))
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_grass3,
    on_overlap_tile)

def on_a_pressed():
    global movement, objectives2
    movement = 0
    objectives2 = sprites.create(assets.image("""
        myImage0
    """), SpriteKind.objectives)
    scaling.scale_by_percent(objectives2,
        110,
        ScaleDirection.UNIFORMLY,
        ScaleAnchor.MIDDLE)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile2(sprite2, location2):
    global kareao_obtained
    compton_himself.say_text("Press e to harvest.", 100, False)
    if controller.B.is_pressed():
        kareao_obtained += 1
        tileUtil.replace_all_tiles(assets.tile("""
                myTile9
            """),
            sprites.castle.sapling_pine)
        pause(100)
        compton_himself.say_text("Berry Obtained!", 1000, False)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile9
    """),
    on_overlap_tile2)

def on_a_released():
    global movement
    movement = 1
    sprites.destroy(objectives2)
controller.A.on_event(ControllerButtonEvent.RELEASED, on_a_released)

def on_overlap_tile3(sprite3, location3):
    global kotukutuku_obtained
    compton_himself.say_text("Press e to harvest.", 100, False)
    if controller.B.is_pressed():
        kotukutuku_obtained += 1
        tileUtil.replace_all_tiles(assets.tile("""
                myTile14
            """),
            sprites.castle.sapling_oak)
        pause(100)
        compton_himself.say_text("Berry Obtained!", 1000, False)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile14
    """),
    on_overlap_tile3)

kotukutuku_obtained = 0
kareao_obtained = 0
compton_himself: Sprite = None
objectives2: Sprite = None
movement = 0
movement = 1
objectives2 = sprites.create(assets.image("""
    myImage0
"""), SpriteKind.player)
sprites.destroy(objectives2)
compton_himself = sprites.create(img("""
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
    """),
    SpriteKind.player)
tiles.set_current_tilemap(tilemap("""
    level_1
"""))
tiles.place_on_tile(compton_himself, tiles.get_tile_location(15, 36))

def on_forever():
    if movement == 1:
        if controller.down.is_pressed():
            compton_himself.vy += 50
            animation.run_image_animation(compton_himself,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                100,
                True)
            pause(200)
            compton_himself.set_velocity(0, 0)
        if controller.up.is_pressed():
            compton_himself.vy += -50
            animation.run_image_animation(compton_himself,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                100,
                True)
            pause(200)
            compton_himself.set_velocity(0, 0)
        if controller.left.is_pressed():
            compton_himself.vx += -50
            animation.run_image_animation(compton_himself,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                100,
                True)
            pause(200)
            compton_himself.set_velocity(0, 0)
        if controller.right.is_pressed():
            compton_himself.vx += 50
            animation.run_image_animation(compton_himself,
                [img("""
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
                    """),
                    img("""
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
                    """),
                    img("""
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
                    """)],
                100,
                True)
            pause(200)
            compton_himself.set_velocity(0, 0)
forever(on_forever)

def on_forever2():
    if compton_himself.vx == 0 and compton_himself.vy == 0:
        animation.stop_animation(animation.AnimationTypes.ALL, compton_himself)
    objectives2.set_position(compton_himself.x, compton_himself.y)
    scene.camera_follow_sprite(compton_himself)
forever(on_forever2)
