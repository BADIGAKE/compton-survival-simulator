namespace SpriteKind {
    export const objectives = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    add_berry(assets.tile`myTile0`, assets.tile`myTile`, assets.image`myImage4`, "Blackberry")
})
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Pressed, function (player2) {
    if (toolbar_enabled && toolbar_movement_enabled) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1)
        if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1 > toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
        }
    }
})
function create_starting_assets () {
    image_index = [
    assets.image`no_water`,
    assets.image`dirty_water`,
    assets.image`clean_water`,
    assets.image`myImage2`,
    assets.image`myImage3`,
    assets.image`myImage4`
    ]
    text_index = [
    "Empty Bottle",
    "Dirty Water",
    "Clean Water",
    "Kotukutuku",
    "Kareao",
    "Blackberry"
    ]
    edible_food = [assets.image`myImage2`, assets.image`myImage3`, assets.image`myImage4`]
    main_menu = 0
    movement = 1
    start = 1
    toolbar_movement_enabled = true
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
    sprites.destroy(compton_himself)
    objectives2 = textsprite.create("Objectives", 0, 15)
    objectives2.setOutline(1, 1)
    objectives2.setFlag(SpriteFlag.Invisible, true)
    objectives_shown = 0
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] && toolbar_enabled) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`clean_water`)) {
            compton_himself.sayText("hydrated", 500, false)
            toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] = Inventory.create_item("Empty Bottle", assets.image`no_water`)
            toolbar.update()
        } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`dirty_water`)) {
            compton_himself.sayText("I cant drink that", 500, false)
        } else {
            for (let index = 0; index <= edible_food.length - 1; index++) {
                if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(edible_food[index])) {
                    compton_himself.sayText("yummers", 500, false)
                    toolbar.get_items().removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex))
                    toolbar.update()
                    break;
                } else {
                    compton_himself.sayText("I cant eat that", 500, false)
                }
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] && toolbar_enabled) {
        compton_himself.sayText(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name), 1000, false)
        dropped_items = sprites.create(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image(), SpriteKind.Food)
        scaling.scaleToPercent(dropped_items, 60, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        dropped_items.setPosition(compton_himself.x, compton_himself.y)
        dropped_items.z = 98
        toolbar.get_items().removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex))
        toolbar.update()
    } else {
        if (main_menu == 1) {
            if (objectives_shown == 0) {
                objectives_shown = 1
                objectives2.setFlag(SpriteFlag.Invisible, false)
            } else {
                objectives_shown = 0
                objectives2.setFlag(SpriteFlag.Invisible, true)
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    toolbar_movement_enabled = false
    if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B) && toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`dirty_water`)) {
            compton_himself.sayText("Water Boiled!", 500, false)
            toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] = Inventory.create_item("Clean Water", assets.image`clean_water`)
            toolbar.update()
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`berry_1`, function (sprite, location) {
    add_berry(assets.tile`berry_1`, sprites.castle.saplingPine, assets.image`myImage3`, "Kotukutuku")
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`berry_2`, function (sprite, location) {
    add_berry(assets.tile`berry_2`, sprites.castle.saplingOak, assets.image`myImage2`, "Kotukutuku")
})
function start_game () {
    toolbar.setFlag(SpriteFlag.Invisible, false)
    toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, -1)
    main_menu = 1
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
    compton_himself.z = 99
    scene.setBackgroundImage(img`
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        `)
    tiles.setCurrentTilemap(tilemap`Level_3`)
    tiles.placeOnTile(compton_himself, tiles.getTileLocation(15, 36))
    myMenu.close()
}
function starting_menu () {
    scene.setBackgroundImage(assets.image`myImage0`)
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("New Game"),
    miniMenu.createMenuItem("Tutorial")
    )
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 6)
    myMenu.setPosition(35, 80)
    myMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            start_game()
        } else {
            scene.setBackgroundImage(assets.image`myImage`)
            tutorial_enabled = true
            myMenu.close()
        }
    })
}
function create_hotbar () {
    toolbar = Inventory.create_toolbar([Inventory.create_item("Empty Bottle", assets.image`no_water`)], 3)
    toolbar.left = 4
    toolbar.bottom = scene.screenHeight() - 4
    toolbar.z = 100
    toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
    toolbar.setFlag(SpriteFlag.Invisible, true)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    toolbar_movement_enabled = false
    if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B) && toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`no_water`)) {
            compton_himself.sayText("Water Collected!", 500, false)
            toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] = Inventory.create_item("Dirty Water", assets.image`dirty_water`)
            toolbar.update()
        }
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    toolbar_enabled = !(toolbar_enabled)
    toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, -1)
    if (toolbar_enabled) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
    }
})
function add_berry (initial_tile: Image, end_tile: Image, berry: Image, berry_name: string) {
    if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B)) {
        toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
        if (toolbar.get_items().length == toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
            compton_himself.sayText("My Hands are Full.", 500, false)
        } else {
            tileUtil.replaceAllTiles(initial_tile, end_tile)
            toolbar.get_items().push(Inventory.create_item(berry_name, berry))
            toolbar.update()
            pause(100)
            compton_himself.sayText("Berry Obtained!", 500, false)
        }
    } else {
        if (toolbar.get_items().length < toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
            compton_himself.sayText("Press f to harvest.", 500, false)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    for (let index = 0; index <= image_index.length - 1; index++) {
        if (otherSprite.image.equals(image_index[index])) {
            if (toolbar.get_items().length == toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
                if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B)) {
                    compton_himself.sayText("My hands are full", 500, false)
                }
            } else {
                if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B)) {
                    toolbar.get_items().push(Inventory.create_item(text_index[index], otherSprite.image))
                    toolbar.update()
                    sprites.destroy(otherSprite)
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite, location) {
    toolbar_movement_enabled = true
})
let textSprite: TextSprite = null
let tutorial_enabled = false
let myMenu: miniMenu.MenuSprite = null
let dropped_items: Sprite = null
let objectives_shown = 0
let objectives2: TextSprite = null
let compton_himself: Sprite = null
let start = 0
let movement = 0
let main_menu = 0
let edible_food: Image[] = []
let text_index: string[] = []
let image_index: Image[] = []
let toolbar: Inventory.Toolbar = null
let toolbar_movement_enabled = false
let toolbar_enabled = false
starting_menu()
create_starting_assets()
create_hotbar()
forever(function () {
    if (main_menu == 1) {
        if (compton_himself.vx == 0 && compton_himself.vy == 0) {
            animation.stopAnimation(animation.AnimationTypes.All, compton_himself)
        }
        objectives2.left = 4
        objectives2.top = 4
        objectives2.z = 100
        objectives2.setFlag(SpriteFlag.RelativeToCamera, true)
        scene.cameraFollowSprite(compton_himself)
    }
})
forever(function () {
    if (main_menu == 1) {
        if (movement == 1) {
            if (controller.down.isPressed()) {
                compton_himself.vy += 50
                animation.runImageAnimation(
                compton_himself,
                assets.animation`forward_compy`,
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
                assets.animation`left_compy`,
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
    }
})
forever(function () {
    if (tutorial_enabled) {
        textSprite = textsprite.create("WASD to move.", 0, 15)
        textSprite.top = 45
        textSprite.left = 10
        textSprite = textsprite.create(" Menu to on/off hotbar.", 0, 15)
        textSprite.top = 55
        textSprite.left = 4
        textSprite = textsprite.create(" F to move around hotbar,", 0, 15)
        textSprite.top = 65
        textSprite.left = 4
        textSprite = textsprite.create("and interact with tiles.", 0, 15)
        textSprite.top = 75
        textSprite.left = 10
        textSprite = textsprite.create("E to eat selected item.", 0, 15)
        textSprite.top = 85
        textSprite.left = 10
        if (controller.player2.isPressed(ControllerButton.B)) {
            start_game()
            tutorial_enabled = false
        }
    }
})
forever(function () {
    Keybinds.setSimulatorKeymap(
    Keybinds.PlayerNumber.ONE,
    Keybinds.CustomKey.W,
    Keybinds.CustomKey.S,
    Keybinds.CustomKey.A,
    Keybinds.CustomKey.D,
    Keybinds.CustomKey.Q,
    Keybinds.CustomKey.E
    )
    Keybinds.setSimulatorKeymap(
    Keybinds.PlayerNumber.TWO,
    Keybinds.CustomKey.UP,
    Keybinds.CustomKey.UP,
    Keybinds.CustomKey.UP,
    Keybinds.CustomKey.UP,
    Keybinds.CustomKey.UP,
    Keybinds.CustomKey.F
    )
})
