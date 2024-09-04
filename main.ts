namespace SpriteKind {
    export const objectives = SpriteKind.create()
    export const fire = SpriteKind.create()
    export const leaf = SpriteKind.create()
    export const stick = SpriteKind.create()
    export const transition = SpriteKind.create()
    export const lost_baggage = SpriteKind.create()
    export const salvation = SpriteKind.create()
    export const endscreen = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    add_berry(assets.tile`myTile0`, assets.tile`myTile`, assets.image`myImage4`, "Blackberry")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.lost_baggage, function (sprite, otherSprite) {
    let index2 = 0
    if (pickup_tutorial == false) {
        compton_himself.sayText("Press F to pickup Items.", 500, false)
        if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B)) {
            if (otherSprite.image.equals(assets.image`clean_water`)) {
                toolbar.get_items().push(Inventory.create_item(text_index[index2], otherSprite.image))
                toolbar.update()
                compton_himself.sayText("I should look around for anything else.", 1000, false)
            }
            dropped_baggage_gotten += 1
            update_objectives()
            sprites.destroy(otherSprite)
            compton_himself.sayText("I should look around for anything else.", 1000, false)
            pickup_tutorial = true
        }
    } else {
        if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B)) {
            if (otherSprite.image.equals(assets.image`clean_water`)) {
                toolbar.get_items().push(Inventory.create_item(text_index[index2], otherSprite.image))
                toolbar.update()
            }
            dropped_baggage_gotten += 1
            update_objectives()
            sprites.destroy(otherSprite)
            if (dropped_baggage_gotten == 3) {
                compton_himself.sayText("That should be everything here, time to move on.", 1000, false)
                objectives_complete = true
            } else {
                compton_himself.sayText("I should look around for anything else.", 1000, false)
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`shelter`, function (sprite, location) {
    if (shack_materials_collected) {
        if (shelter_built == false) {
            if (controller.B.isPressed()) {
                transition2("You finish building your", "campsite using materials", "that you collected.", true)
                tileUtil.coverAllTiles(assets.tile`shelter`, assets.tile`shelter0`)
                tileUtil.coverTile(tiles.getTileLocation(24, 16), assets.tile`camp_left`)
                tileUtil.coverTile(tiles.getTileLocation(25, 16), assets.tile`camp_right`)
                tiles.setTileAt(tiles.getTileLocation(24, 16), assets.tile`camp_left`)
                tiles.setTileAt(tiles.getTileLocation(25, 16), assets.tile`camp_right`)
                tiles.placeOnTile(campfire, tiles.getTileLocation(25, 18))
                shelter_built = true
                update_objectives()
                sprites.destroy(objectives_sticks)
                sprites.destroy(objectives_leaves)
            } else {
                compton_himself.sayText("Press E to build camp with materials.", 200, false)
            }
        }
    } else {
        if (shelter_not_found) {
            movement = 0
            everything_toggle(false)
            compton_himself.sayText("Tbis looks like a good place for a shelter.", 2000, false)
            timer.after(2000, function () {
                compton_himself.sayText("I should find some sticks and leaves to start building it.", 2000, false)
                shelter_not_found = false
                timer.after(2000, function () {
                    movement = 1
                    everything_toggle(true)
                    if (info_shelter == false) {
                        info_shelter = true
                        game.showLongText("In the wild to create a shelter you typically want to use tree branches and sticks to make an A-frame structure and leaves for the roofing to protect you from the elements.", DialogLayout.Center)
                    }
                })
            })
        }
        if (shelter_not_found == false) {
            compton_himself.sayText("I should find some sticks and leaves to start building it.", 500, false)
        }
        sprites.destroy(objectives_shelter)
    }
})
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Pressed, function (player2) {
    if (toolbar_enabled && toolbar_movement_enabled) {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1)
        if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1 > toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
        }
    }
})
function transition2 (text: string, text2: string, text3: string, movement_enabled: boolean) {
    movement = 0
    black_screen = sprites.create(assets.image`black_screen`, SpriteKind.transition)
    black_screen.setFlag(SpriteFlag.RelativeToCamera, true)
    black_screen.setPosition(80, 60)
    black_screen.z = 105
    transition_text = textsprite.create("", 0, 1)
    transition_text.setFlag(SpriteFlag.Invisible, false)
    transition_text.setText(text)
    transition_text.setFlag(SpriteFlag.RelativeToCamera, true)
    transition_text.setPosition(80, 50)
    transition_text.z = 105
    transition_text2 = textsprite.create("", 0, 1)
    transition_text2.setFlag(SpriteFlag.Invisible, false)
    transition_text2.setText(text2)
    transition_text2.setFlag(SpriteFlag.RelativeToCamera, true)
    transition_text2.setPosition(80, 60)
    transition_text2.z = 105
    transition_text3 = textsprite.create("", 0, 1)
    transition_text3.setFlag(SpriteFlag.Invisible, false)
    transition_text3.setText(text3)
    transition_text3.setFlag(SpriteFlag.RelativeToCamera, true)
    transition_text3.setPosition(80, 70)
    transition_text3.z = 105
    timer.after(2500, function () {
        sprites.destroy(black_screen)
        transition_text.setFlag(SpriteFlag.Invisible, true)
        transition_text2.setFlag(SpriteFlag.Invisible, true)
        transition_text3.setFlag(SpriteFlag.Invisible, true)
        screenTransitions.startTransition(screenTransitions.Circle, 1000, false, false)
        timer.after(700, function () {
            if (movement_enabled) {
                movement = 1
            }
        })
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.stick, function (sprite, otherSprite) {
    if (shelter_not_found == false) {
        sticks_brought += 1
        sprites.destroy(otherSprite)
        compton_himself.sayText("That's " + sticks_brought + " sticks out of 3", 500, false)
        update_objectives()
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
    levels = [
    tileUtil.createSmallMap(tilemap`Level_1`),
    tileUtil.createSmallMap(tilemap`Level_2`),
    tileUtil.createSmallMap(tilemap`Level_3`),
    tileUtil.createSmallMap(tilemap`Level_4`),
    tileUtil.createSmallMap(tilemap`Level_5`),
    tileUtil.createSmallMap(tilemap`Level_6`),
    tileUtil.createSmallMap(tilemap`Level_7`)
    ]
    level_starting_positions = [
    11,
    11,
    15,
    35,
    5,
    25,
    9,
    20,
    10,
    23,
    7,
    40
    ]
    edible_food = [assets.image`myImage2`, assets.image`myImage3`, assets.image`myImage4`]
    main_menu = 0
    movement = 0
    start = 1
    toolbar_movement_enabled = true
    compton_himself = sprites.create(assets.image`standing_compy`, SpriteKind.Player)
    campfire = sprites.create(assets.image`myImage1`, SpriteKind.fire)
    sprites.destroy(compton_himself)
    objectives2 = textsprite.create("Objectives", 0, 15)
    objectives2.setOutline(1, 1)
    objectives2.setFlag(SpriteFlag.Invisible, true)
    objectives_shown = 0
    current_level = 0
    level_position_index = 0
    objectives_complete = false
    shelter_not_found = true
    shelter_built = false
    shack_materials_collected = false
    pickup_tutorial = false
    tutorial_berry = false
    tutorial_log = false
    info_blackberry = false
    info_kareao = false
    info_kotukutuku = false
    info_shelter = false
    info_water = false
    sleeping_needed = false
    water_collection_needed = false
    travelling_back_needed = false
    travelling_away_needed = false
    sleeping_allowed = false
    obj_and_eating_toggle = true
    sticks_brought = 3
    leaves_brought = 4
    dropped_baggage_needed = 3
    nights_slept = 0
    well_rested = false
    water_boiled = true
    coming_back = false
    update_objectives()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (obj_and_eating_toggle) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] && toolbar_enabled) {
            if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`clean_water`)) {
                if (current_level == 3) {
                    compton_himself.sayText("I should save this for when I'm somewhere else.", 500, false)
                } else if (tutorial_log) {
                    compton_himself.sayText("Water Drunk", 500, false)
                    water_drunk += 1
                    if (current_level == 2) {
                        water_collection_needed = true
                    }
                    update_objectives()
                    toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] = Inventory.create_item("Empty Bottle", assets.image`no_water`)
                    toolbar.update()
                } else {
                    compton_himself.sayText("I should save this for later.", 500, false)
                }
            } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`dirty_water`)) {
                compton_himself.sayText("I need to boil this water first.", 500, false)
            } else {
                if (current_level == 3 && shelter_built == false) {
                    compton_himself.sayText("I should build the shelter first", 500, false)
                } else {
                    for (let index = 0; index <= edible_food.length - 1; index++) {
                        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(edible_food[index])) {
                            compton_himself.sayText("Berry Eaten.", 500, false)
                            yummers_eaten += 1
                            update_objectives()
                            toolbar.get_items().removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex))
                            toolbar.update()
                            if (current_level == 3 && yummers_eaten == 2) {
                                if (shelter_built) {
                                    everything_toggle(false)
                                    compton_himself.sayText("Im getting really tired now,", 2000, false)
                                    timer.after(2000, function () {
                                        compton_himself.sayText("Not much left to do today anyway,", 2000, false)
                                        timer.after(2000, function () {
                                            compton_himself.sayText("I should go sleep in my shelter.", 2000, false)
                                            sleeping_allowed = true
                                            everything_toggle(true)
                                            update_objectives()
                                        })
                                    })
                                }
                            }
                            break;
                        } else {
                            compton_himself.sayText("I cant eat that", 500, false)
                        }
                    }
                }
            }
        }
    }
})
sprites.onCreated(SpriteKind.fire, function (sprite) {
    animation.runImageAnimation(
    sprite,
    assets.animation`campsfire`,
    200,
    true
    )
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (obj_and_eating_toggle) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] && toolbar_enabled) {
            if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`no_water`)) {
                compton_himself.sayText("I'm going to need this for water.", 200, false)
            } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`dirty_water`)) {
                compton_himself.sayText("I'm going to need this for water.", 200, false)
            } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`clean_water`)) {
                compton_himself.sayText("I'm going to need this for water.", 200, false)
            } else {
                dropped_items = sprites.create(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image(), SpriteKind.Food)
                dropped_items.setPosition(compton_himself.x, compton_himself.y)
                dropped_items.z = 98
                toolbar.get_items().removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex))
                toolbar.update()
            }
        } else {
            if (main_menu == 1) {
                if (objectives_shown == 0) {
                    objectives_shown = 1
                    objectives2.setFlag(SpriteFlag.Invisible, false)
                    if (water_collection_needed) {
                        objectives_get_water.setFlag(SpriteFlag.Invisible, false)
                    }
                    if (water_boiled == false && coming_back == false) {
                        objectives_boiling.setFlag(SpriteFlag.Invisible, false)
                    }
                    if (travelling_away_needed) {
                        objectives_explore.setFlag(SpriteFlag.Invisible, false)
                    }
                    if (travelling_back_needed) {
                        objectives_leave.setFlag(SpriteFlag.Invisible, false)
                    }
                    if (sleeping_needed && sleeping_allowed) {
                        objectives_sleep.setFlag(SpriteFlag.Invisible, false)
                    }
                    if (dropped_baggage_gotten != dropped_baggage_needed) {
                        objectives_baggage.setFlag(SpriteFlag.Invisible, false)
                    }
                    if (shelter_built == false) {
                        objectives_food.setFlag(SpriteFlag.Invisible, false)
                        objectives_water.setFlag(SpriteFlag.Invisible, false)
                        if (shelter_not_found == false) {
                            objectives_sticks.setFlag(SpriteFlag.Invisible, false)
                            objectives_leaves.setFlag(SpriteFlag.Invisible, false)
                        }
                    } else {
                        objectives_food.setFlag(SpriteFlag.Invisible, false)
                        objectives_water.setFlag(SpriteFlag.Invisible, false)
                    }
                } else {
                    objectives_shown = 0
                    objectives2.setFlag(SpriteFlag.Invisible, true)
                    objectives_get_water.setFlag(SpriteFlag.Invisible, true)
                    objectives_sleep.setFlag(SpriteFlag.Invisible, true)
                    objectives_explore.setFlag(SpriteFlag.Invisible, true)
                    objectives_leave.setFlag(SpriteFlag.Invisible, true)
                    objectives_boiling.setFlag(SpriteFlag.Invisible, true)
                    if (dropped_baggage_gotten != dropped_baggage_needed) {
                        objectives_baggage.setFlag(SpriteFlag.Invisible, true)
                    }
                    if (shelter_built == false) {
                        objectives_food.setFlag(SpriteFlag.Invisible, true)
                        objectives_water.setFlag(SpriteFlag.Invisible, true)
                        if (shelter_not_found == false) {
                            objectives_sticks.setFlag(SpriteFlag.Invisible, true)
                            objectives_leaves.setFlag(SpriteFlag.Invisible, true)
                        }
                    } else {
                        objectives_food.setFlag(SpriteFlag.Invisible, true)
                        objectives_water.setFlag(SpriteFlag.Invisible, true)
                    }
                }
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.leaf, function (sprite, otherSprite) {
    if (shelter_not_found == false) {
        leaves_brought += 1
        sprites.destroy(otherSprite)
        compton_himself.sayText("That's " + leaves_brought + " leaves out of 5", 500, false)
        update_objectives()
    }
})
function everything_toggle (yn: boolean) {
    obj_and_eating_toggle = yn
    objectives_shown = 0
    objectives_shown = 0
    objectives2.setFlag(SpriteFlag.Invisible, true)
    objectives_get_water.setFlag(SpriteFlag.Invisible, true)
    objectives_sleep.setFlag(SpriteFlag.Invisible, true)
    objectives_explore.setFlag(SpriteFlag.Invisible, true)
    objectives_leave.setFlag(SpriteFlag.Invisible, true)
    objectives_boiling.setFlag(SpriteFlag.Invisible, true)
    objectives_baggage.setFlag(SpriteFlag.Invisible, true)
    objectives_food.setFlag(SpriteFlag.Invisible, true)
    objectives_water.setFlag(SpriteFlag.Invisible, true)
    objectives_sticks.setFlag(SpriteFlag.Invisible, true)
    objectives_leaves.setFlag(SpriteFlag.Invisible, true)
    objectives_food.setFlag(SpriteFlag.Invisible, true)
    objectives_water.setFlag(SpriteFlag.Invisible, true)
    toolbar_enabled = false
    toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, -1)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.fire, function (sprite, otherSprite) {
    if (sleeping_needed == false) {
        toolbar_movement_enabled = false
        if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B) && toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
            if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`dirty_water`)) {
                compton_himself.sayText("You use your pot to boil the water.", 1000, false)
                toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] = Inventory.create_item("Clean Water", assets.image`clean_water`)
                toolbar.update()
                water_boiled = true
                sprites.destroy(objectives_boiling)
                update_objectives()
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`berry_1`, function (sprite, location) {
    add_berry(assets.tile`berry_1`, sprites.castle.saplingPine, assets.image`myImage3`, "Kareao")
})
function ending_cutscene () {
    timer.after(1500, function () {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, -1)
        toolbar_enabled = false
        sprites.destroy(toolbar)
        tiles.placeOnTile(compton_himself, tiles.getTileLocation(24, 17))
        sprites.destroy(compton_himself)
        everything_toggle(false)
        movement = 0
        saviour = sprites.create(assets.image`saviour`, SpriteKind.salvation)
        tiles.placeOnTile(saviour, tiles.getTileLocation(23, 17))
        victim = sprites.create(assets.image`savied`, SpriteKind.Player)
        tiles.placeOnTile(victim, tiles.getTileLocation(25, 17))
        timer.after(2000, function () {
            saviour.sayText("We finally found you!", 2000, false)
            timer.after(2500, function () {
                victim.sayText("Thank goodness!", 2000, false)
                timer.after(2500, function () {
                    saviour.sayText("Lets get you home now.", 2000, false)
                    timer.after(2500, function () {
                        victim.sayText("Alright then.", 2000, false)
                        timer.after(2500, function () {
                            saviour.sayText("Well hurry up then!", 1000, false)
                            timer.after(500, function () {
                                saviour.vx += -80
                                animation.runImageAnimation(
                                saviour,
                                assets.animation`saviour_walk`,
                                80,
                                true
                                )
                                timer.after(1000, function () {
                                    victim.sayText("Yes sir.", 500, false)
                                    victim.vx += -80
                                    animation.runImageAnimation(
                                    victim,
                                    assets.animation`left_compy`,
                                    80,
                                    true
                                    )
                                    timer.after(2000, function () {
                                        transition2("", "", "", false)
                                        sprites.destroy(victim)
                                        sprites.destroy(saviour)
                                        sprites.destroy(campfire)
                                        tiles.setCurrentTilemap(tilemap`level6`)
                                        scene.setBackgroundImage(assets.image`myImage6`)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`berry_2`, function (sprite, location) {
    add_berry(assets.tile`berry_2`, sprites.castle.saplingOak, assets.image`myImage2`, "Kotukutuku")
})
function start_game () {
    everything_toggle(false)
    transition2("After getting lost on a", "hike, you end up finding", "yourself in a clearing...", false)
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
    scene.setBackgroundImage(assets.image`bg`)
    tiles.setCurrentTilemap(tilemap`Level_1`)
    tiles.placeOnTile(compton_himself, tiles.getTileLocation(5, 11))
    tileUtil.createSpritesOnTiles(assets.tile`bottle`, assets.image`clean_water`, SpriteKind.lost_baggage)
    tileUtil.createSpritesOnTiles(assets.tile`pot`, assets.image`pot`, SpriteKind.lost_baggage)
    tileUtil.createSpritesOnTiles(assets.tile`lighterr`, assets.image`lighter`, SpriteKind.lost_baggage)
    myMenu.close()
    timer.after(4000, function () {
        compton_himself.sayText("Ugh, what happened?", 2500, false)
        timer.after(2500, function () {
            compton_himself.sayText("I remember being on a hike a moment ago...", 2500, false)
            timer.after(2500, function () {
                compton_himself.sayText("Must've lost my footing and knocked myself out somehow.", 3000, false)
                timer.after(3000, function () {
                    compton_himself.sayText("And I've lost all my gear!", 2500, false)
                    timer.after(2500, function () {
                        compton_himself.sayText("I should look around incase there's any still here.", 2509, false)
                        timer.after(2500, function () {
                            compton_himself.sayText("And I'll have to make a shelter before night", 2500, false)
                            timer.after(2500, function () {
                                compton_himself.sayText("Best get going then!", 2000, false)
                                timer.after(1500, function () {
                                    movement = 1
                                    everything_toggle(true)
                                    timer.after(500, function () {
                                        compton_himself.sayText("(Press Q to open Objectives List.)", 2000, false)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
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
    toolbar = Inventory.create_toolbar([], 3)
    toolbar.left = 4
    toolbar.bottom = scene.screenHeight() - 4
    toolbar.z = 100
    toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
    toolbar.setFlag(SpriteFlag.Invisible, true)
}
function level_objectives () {
    if (current_level == 1) {
        yummers_needed = 1
        objectives_complete = false
        update_objectives()
    } else if (current_level == 2) {
        yummers_eaten = 0
        yummers_needed = 1
        objectives_complete = false
        update_objectives()
    } else if (current_level == 3) {
        water_drunk = 0
        water_needed = 0
        yummers_eaten = 0
        yummers_needed = 2
        sleeping_needed = true
        objectives_complete = false
        update_objectives()
    } else if (nights_slept == 1) {
        yummers_needed = 3
        water_needed = 1
        objectives_complete = false
        update_objectives()
    } else if (nights_slept == 2) {
        yummers_needed = 3
        water_needed = 0
        objectives_complete = false
        water_collection_needed = true
        update_objectives()
    } else if (nights_slept == 3) {
        yummers_needed = 3
        water_needed = 1
        objectives_complete = false
        update_objectives()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`previous_level`, function (sprite, location) {
    if (objectives_complete) {
        current_level = 3
        level_position_index = 6
        tiles.placeOnTile(compton_himself, tiles.getTileLocation(44, 21))
        tiles.setCurrentTilemap(levels[current_level])
        transition2("You walk backwards", "and end up back in", "your campsite.", true)
        yummers_eaten = 0
        yummers_needed = 0
        water_drunk = 0
        water_needed = 0
        objectives_complete = false
        travelling_back_needed = false
        sleeping_needed = true
        sleeping_allowed = true
        water_boiled = false
        coming_back = true
        sprites.destroy(objectives_leave)
        update_objectives()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    if (obj_and_eating_toggle) {
        toolbar_movement_enabled = false
        if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B) && toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
            if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_image().equals(assets.image`no_water`)) {
                compton_himself.sayText("Water Collected!", 500, false)
                water_collection_needed = false
                sprites.destroy(objectives_get_water)
                update_objectives()
                toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] = Inventory.create_item("Dirty Water", assets.image`dirty_water`)
                toolbar.update()
                if (info_water == false) {
                    info_water = true
                    game.showLongText("In the wild, drinking water straight from the source can be dangerous, ensure the water appears clear and to boil the water at the very least before drinking.", DialogLayout.Center)
                }
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`camp_right`, function (sprite, location) {
    if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B) && sleeping_needed) {
        if (sleeping_allowed) {
            transition2("You sleep inside", " your shelter till", " tomorrow morning", false)
            well_rested = true
            nights_slept += 1
            if (nights_slept == 2) {
                water_boiled = true
            } else if (nights_slept > 3) {
                water_boiled = true
            } else {
                for (let index = 0; index <= toolbar.get_items().length - 1; index++) {
                    if (toolbar.get_items()[index].get_image().equals(assets.image`dirty_water`)) {
                        water_boiled = false
                    }
                }
            }
            yummers_eaten = 0
            yummers_needed = 0
            water_drunk = 0
            water_needed = 0
            sleeping_needed = false
            sleeping_allowed = false
            coming_back = false
            if (nights_slept < 4) {
                travelling_away_needed = true
            }
            sprites.destroy(objectives_sleep)
            update_objectives()
            if (nights_slept == 1) {
                everything_toggle(false)
                timer.after(4000, function () {
                    compton_himself.sayText("Today I should go exploring to find more berries.", 3000, false)
                    timer.after(3000, function () {
                        compton_himself.sayText("But before that, I should boil some water at the fire.", 3000, false)
                        timer.after(3000, function () {
                            compton_himself.sayText("Best be off then!", 3000, false)
                            movement = 1
                            everything_toggle(true)
                        })
                    })
                })
            } else if (nights_slept == 2) {
                everything_toggle(false)
                timer.after(3000, function () {
                    compton_himself.sayText("Today I should go find a river for more water,", 3000, false)
                    timer.after(3000, function () {
                        compton_himself.sayText("Since I drank my supply yesterday.", 3000, false)
                        timer.after(3000, function () {
                            compton_himself.sayText("I should also find some berries along with that.", 3000, false)
                            timer.after(3000, function () {
                                compton_himself.sayText("Best be off then!", 3000, false)
                                movement = 1
                                everything_toggle(true)
                            })
                        })
                    })
                })
            } else if (nights_slept == 3) {
                everything_toggle(false)
                timer.after(3000, function () {
                    compton_himself.sayText("I should go exploring to find more berries again.", 3000, false)
                    timer.after(3000, function () {
                        compton_himself.sayText("Before that, I should boil the water I got yesterday at the fire.", 3000, false)
                        timer.after(3000, function () {
                            compton_himself.sayText("Best be off then!", 3000, false)
                            movement = 1
                            everything_toggle(true)
                        })
                    })
                })
            } else {
                ending_cutscene()
            }
        }
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (obj_and_eating_toggle) {
        toolbar_enabled = !(toolbar_enabled)
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, -1)
        if (toolbar_enabled) {
            toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`log discovery`, function (sprite, location) {
    tutorial_log = true
    tileUtil.replaceAllTiles(assets.tile`log discovery`, assets.tile`default_block`)
    movement = 0
    everything_toggle(false)
    compton_himself.sayText("Good thing this log is here,", 3000, false)
    timer.after(3000, function () {
        compton_himself.sayText("This river is flowing too fast for me to cross it normally.", 3000, false)
        timer.after(3000, function () {
            compton_himself.sayText("I can also collect water on the edge of this river.", 3000, false)
            timer.after(3000, function () {
                compton_himself.sayText("No need to save this water now I guess.", 3000, false)
                timer.after(3000, function () {
                    compton_himself.sayText("(Press F while selecting an empty bottle next to a river to collect water)", 3000, false)
                    movement = 1
                    water_needed = 1
                    update_objectives()
                    everything_toggle(true)
                })
            })
        })
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`shelter0`, function (sprite, location) {
    toolbar_movement_enabled = true
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
            if (tutorial_berry == false) {
                movement = 0
                everything_toggle(false)
                compton_himself.sayText("There should be more berry bushes in this forest just like this one,", 1500, false)
                timer.after(1500, function () {
                    compton_himself.sayText("If I find enough berries, they should last me for a couple of days.", 1500, false)
                    timer.after(1500, function () {
                        compton_himself.sayText("Hopefully the search parties find me before then.", 1500, false)
                        timer.after(1500, function () {
                            tutorial_berry = true
                            pause(100)
                            compton_himself.sayText("Berry Obtained!", 500, false)
                            everything_toggle(true)
                            timer.after(1000, function () {
                                movement = 1
                                if (info_blackberry == false) {
                                    game.showLongText("Blackberries are berries that are common throughout the entirety of New Zealand and can be found by looking for thorny bushy vines in places with enough light.", DialogLayout.Center)
                                    info_blackberry = true
                                }
                            })
                        })
                    })
                })
            } else {
                if (berry_name == "Kareao") {
                    if (info_kareao == false) {
                        game.showLongText("Kareao are native plants to New Zealand with small bright red nutritious berries. They are typically found as a vine growing on the sides of trees.", DialogLayout.Center)
                        info_kareao = true
                    }
                } else if (berry_name == "Kotukutuku") {
                    if (info_kotukutuku == false) {
                        game.showLongText("Kotukutuku is a native tree to New Zealand, which when ripe grow purple berries. They are found near stream margins and more shaded places.", DialogLayout.Center)
                        info_kotukutuku = true
                    }
                }
            }
        }
    } else {
        if (toolbar.get_items().length < toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
            compton_himself.sayText("Press f to harvest.", 500, false)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (obj_and_eating_toggle) {
        for (let index2 = 0; index2 <= image_index.length - 1; index2++) {
            if (otherSprite.image.equals(image_index[index2])) {
                if (toolbar.get_items().length == toolbar.get_number(ToolbarNumberAttribute.MaxItems)) {
                    if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B)) {
                        compton_himself.sayText("My hands are full", 500, false)
                    }
                } else {
                    if (mp.isButtonPressed(mp.playerSelector(mp.PlayerNumber.Two), mp.MultiplayerButton.B)) {
                        toolbar.get_items().push(Inventory.create_item(text_index[index2], otherSprite.image))
                        toolbar.update()
                        sprites.destroy(otherSprite)
                    }
                }
            }
        }
    }
})
function update_objectives () {
    if (objectives_shown == 0) {
        objectives_food = textsprite.create("Eat Edible Berries: " + yummers_eaten + "/" + yummers_needed, 0, 15)
        objectives_water = textsprite.create("Drink Clean Water: " + water_drunk + "/" + water_needed, 0, 15)
        objectives_shelter = textsprite.create("Find a Shelter Location", 0, 15)
        objectives_shelter.setFlag(SpriteFlag.Invisible, true)
        objectives_food.setFlag(SpriteFlag.Invisible, true)
        objectives_water.setFlag(SpriteFlag.Invisible, true)
        objectives_sticks = textsprite.create("Obtain " + sticks_brought + "/3" + " Sticks", 0, 15)
        objectives_leaves = textsprite.create("Obtain " + leaves_brought + "/5" + " Leaves", 0, 15)
        objectives_sticks.setFlag(SpriteFlag.Invisible, true)
        objectives_leaves.setFlag(SpriteFlag.Invisible, true)
        objectives_baggage = textsprite.create("Find Lost Items " + dropped_baggage_gotten + "/3", 0, 15)
        objectives_baggage.setFlag(SpriteFlag.Invisible, true)
        objectives_sleep = textsprite.create("Sleep in the shelter", 0, 15)
        objectives_sleep.setFlag(SpriteFlag.Invisible, true)
        objectives_get_water = textsprite.create("Fill up your bottle", 0, 15)
        objectives_get_water.setFlag(SpriteFlag.Invisible, true)
        objectives_explore = textsprite.create("Leave to explore", 0, 15)
        objectives_explore.setFlag(SpriteFlag.Invisible, true)
        objectives_leave = textsprite.create("Go back to camp", 0, 15)
        objectives_leave.setFlag(SpriteFlag.Invisible, true)
        objectives_boiling = textsprite.create("Boil your water", 0, 15)
        objectives_boiling.setFlag(SpriteFlag.Invisible, true)
    } else {
        sprites.destroy(objectives_shelter)
        sprites.destroy(objectives_food)
        sprites.destroy(objectives_water)
        objectives_food = textsprite.create("Eat Edible Berries: " + yummers_eaten + "/" + yummers_needed, 0, 15)
        objectives_water = textsprite.create("Drink Clean Water: " + water_drunk + "/" + water_needed, 0, 15)
        objectives_shelter = textsprite.create("Find a Shelter Location", 0, 15)
        objectives_food.setFlag(SpriteFlag.Invisible, false)
        objectives_water.setFlag(SpriteFlag.Invisible, false)
        objectives_shelter.setFlag(SpriteFlag.Invisible, false)
        if (dropped_baggage_gotten != dropped_baggage_needed) {
            sprites.destroy(objectives_baggage)
            objectives_baggage = textsprite.create("Find Lost Items " + dropped_baggage_gotten + "/3", 0, 15)
            objectives_baggage.setFlag(SpriteFlag.Invisible, false)
        }
        if (shelter_built == false && shelter_not_found == false) {
            sprites.destroy(objectives_sticks)
            sprites.destroy(objectives_leaves)
            objectives_sticks = textsprite.create("Obtain " + sticks_brought + "/3" + " Sticks", 0, 15)
            objectives_leaves = textsprite.create("Obtain " + leaves_brought + "/5" + " Leaves", 0, 15)
            objectives_sticks.setFlag(SpriteFlag.Invisible, false)
            objectives_leaves.setFlag(SpriteFlag.Invisible, false)
        }
        if (sleeping_needed && sleeping_allowed) {
            sprites.destroy(objectives_sleep)
            objectives_sleep = textsprite.create("Sleep in the shelter", 0, 15)
            objectives_sleep.setFlag(SpriteFlag.Invisible, false)
        }
        if (water_collection_needed) {
            sprites.destroy(objectives_get_water)
            objectives_get_water = textsprite.create("Fill up your bottle", 0, 15)
            objectives_get_water.setFlag(SpriteFlag.Invisible, false)
        }
        if (travelling_away_needed) {
            sprites.destroy(objectives_explore)
            objectives_explore = textsprite.create("Leave to explore", 0, 15)
            objectives_explore.setFlag(SpriteFlag.Invisible, false)
        }
        if (travelling_back_needed) {
            sprites.destroy(objectives_leave)
            objectives_leave = textsprite.create("Go back to camp", 0, 15)
            objectives_leave.setFlag(SpriteFlag.Invisible, false)
        }
        if (water_boiled == false && coming_back == false) {
            sprites.destroy(objectives_boiling)
            objectives_boiling = textsprite.create("Boil your water", 0, 15)
            objectives_boiling.setFlag(SpriteFlag.Invisible, false)
        }
    }
    objectives_food.setOutline(1, 1)
    objectives_water.setOutline(1, 1)
    objectives_leaves.setOutline(1, 1)
    objectives_sticks.setOutline(1, 1)
    objectives_shelter.setOutline(1, 1)
    objectives_baggage.setOutline(1, 1)
    objectives_sleep.setOutline(1, 1)
    objectives_get_water.setOutline(1, 1)
    objectives_explore.setOutline(1, 1)
    objectives_leave.setOutline(1, 1)
    objectives_boiling.setOutline(1, 1)
}
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite, location) {
    toolbar_movement_enabled = true
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`next_level`, function (sprite, location) {
    if (current_level == 3 && water_boiled) {
        current_level += 1
        if (nights_slept == 1) {
            tiles.placeOnTile(compton_himself, tiles.getTileLocation(level_starting_positions[6], level_starting_positions[7]))
            tiles.setCurrentTilemap(levels[4])
        } else if (nights_slept == 2) {
            tiles.placeOnTile(compton_himself, tiles.getTileLocation(level_starting_positions[8], level_starting_positions[9]))
            tiles.setCurrentTilemap(levels[5])
        } else if (nights_slept == 3) {
            tiles.placeOnTile(compton_himself, tiles.getTileLocation(level_starting_positions[10], level_starting_positions[11]))
            tiles.setCurrentTilemap(levels[6])
        }
        transition2("After walking for a", "while, you stumble upon", "another clearing...", true)
        tileUtil.createSpritesOnTiles(assets.tile`sticks`, assets.image`stick`, SpriteKind.stick)
        tileUtil.createSpritesOnTiles(assets.tile`leaves`, assets.image`fallen_leaves`, SpriteKind.leaf)
        level_position_index += 2
        yummers_eaten = 0
        water_drunk = 0
        level_objectives()
        objectives_complete = false
        travelling_away_needed = false
        sprites.destroy(objectives_explore)
        update_objectives()
    } else if ((objectives_complete || well_rested) && current_level != 3) {
        current_level += 1
        tiles.placeOnTile(compton_himself, tiles.getTileLocation(level_starting_positions[level_position_index], level_starting_positions[level_position_index + 1]))
        tiles.setCurrentTilemap(levels[current_level])
        level_position_index += 2
        transition2("After walking for a", "while, you stumble upon", "another clearing...", true)
        tileUtil.createSpritesOnTiles(assets.tile`sticks`, assets.image`stick`, SpriteKind.stick)
        tileUtil.createSpritesOnTiles(assets.tile`leaves`, assets.image`fallen_leaves`, SpriteKind.leaf)
        yummers_eaten = 0
        water_drunk = 0
        level_objectives()
        objectives_complete = false
        travelling_away_needed = false
        sprites.destroy(objectives_explore)
        update_objectives()
    }
})
let textSprite: TextSprite = null
let water_needed = 0
let yummers_needed = 0
let tutorial_enabled = false
let myMenu: miniMenu.MenuSprite = null
let victim: Sprite = null
let saviour: Sprite = null
let objectives_water: TextSprite = null
let objectives_food: TextSprite = null
let objectives_baggage: TextSprite = null
let objectives_sleep: TextSprite = null
let objectives_leave: TextSprite = null
let objectives_explore: TextSprite = null
let objectives_boiling: TextSprite = null
let objectives_get_water: TextSprite = null
let dropped_items: Sprite = null
let yummers_eaten = 0
let water_drunk = 0
let coming_back = false
let water_boiled = false
let well_rested = false
let nights_slept = 0
let dropped_baggage_needed = 0
let leaves_brought = 0
let obj_and_eating_toggle = false
let sleeping_allowed = false
let travelling_away_needed = false
let travelling_back_needed = false
let water_collection_needed = false
let sleeping_needed = false
let info_water = false
let info_kotukutuku = false
let info_kareao = false
let info_blackberry = false
let tutorial_log = false
let tutorial_berry = false
let level_position_index = 0
let current_level = 0
let objectives_shown = 0
let objectives2: TextSprite = null
let start = 0
let main_menu = 0
let edible_food: Image[] = []
let level_starting_positions: number[] = []
let levels: tiles.TileMapData[] = []
let image_index: Image[] = []
let sticks_brought = 0
let transition_text3: TextSprite = null
let transition_text2: TextSprite = null
let transition_text: TextSprite = null
let black_screen: Sprite = null
let toolbar_movement_enabled = false
let toolbar_enabled = false
let objectives_shelter: TextSprite = null
let info_shelter = false
let movement = 0
let shelter_not_found = false
let objectives_leaves: TextSprite = null
let objectives_sticks: TextSprite = null
let campfire: Sprite = null
let shelter_built = false
let shack_materials_collected = false
let objectives_complete = false
let dropped_baggage_gotten = 0
let text_index: string[] = []
let toolbar: Inventory.Toolbar = null
let compton_himself: Sprite = null
let pickup_tutorial = false
starting_menu()
create_starting_assets()
create_hotbar()
forever(function () {
    if (main_menu == 1) {
        if (compton_himself.vx == 0 && compton_himself.vy == 0) {
            animation.stopAnimation(animation.AnimationTypes.All, compton_himself)
        }
        scene.cameraFollowSprite(compton_himself)
    }
    objectives2.left = 4
    objectives_food.left = 4
    objectives_water.left = 4
    objectives2.top = 4
    if (current_level == 3) {
        objectives_food.top = 15
    } else {
        objectives_food.top = 26
    }
    if (current_level == 2) {
        objectives_water.top = 37
    } else {
        objectives_water.top = 15
    }
    objectives2.z = 100
    objectives_food.z = 100
    objectives_water.z = 100
    objectives2.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_food.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_water.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_shelter.left = 4
    objectives_shelter.top = 15
    objectives_shelter.z = 100
    objectives_shelter.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_sticks.left = 4
    objectives_sticks.top = 15
    objectives_sticks.z = 100
    objectives_sticks.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_leaves.left = 4
    objectives_leaves.top = 26
    objectives_leaves.z = 100
    objectives_leaves.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_baggage.left = 4
    objectives_baggage.top = 26
    objectives_baggage.z = 100
    objectives_baggage.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_sleep.left = 4
    objectives_sleep.top = 15
    objectives_sleep.z = 100
    objectives_sleep.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_get_water.left = 4
    if (current_level == 2) {
        objectives_get_water.top = 37
    } else {
        objectives_get_water.top = 15
    }
    objectives_get_water.z = 100
    objectives_get_water.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_leave.left = 4
    objectives_leave.top = 15
    objectives_leave.z = 100
    objectives_leave.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_explore.left = 4
    objectives_explore.top = 15
    objectives_explore.z = 100
    objectives_explore.setFlag(SpriteFlag.RelativeToCamera, true)
    objectives_boiling.left = 4
    objectives_boiling.top = 26
    objectives_boiling.z = 100
    objectives_boiling.setFlag(SpriteFlag.RelativeToCamera, true)
})
forever(function () {
    if (leaves_brought >= 5 && sticks_brought >= 3) {
        shack_materials_collected = true
    }
    if (yummers_needed == 0) {
        objectives_food.setFlag(SpriteFlag.Invisible, true)
    } else if (yummers_needed == yummers_eaten) {
        objectives_food.setFlag(SpriteFlag.Invisible, true)
        if (yummers_needed == yummers_eaten && water_needed == water_drunk) {
            if (water_collection_needed == false && sleeping_needed == false) {
                objectives_complete = true
            }
        }
    }
    if (water_needed == 0) {
        objectives_water.setFlag(SpriteFlag.Invisible, true)
    } else if (water_needed == water_drunk) {
        objectives_water.setFlag(SpriteFlag.Invisible, true)
        if (yummers_needed == yummers_eaten && water_needed == water_drunk) {
            if (water_collection_needed == false && sleeping_needed == false) {
                objectives_complete = true
            }
        }
    }
    if (shelter_not_found) {
        if (objectives_shown) {
            objectives_shelter.setFlag(SpriteFlag.Invisible, false)
        } else {
            objectives_shelter.setFlag(SpriteFlag.Invisible, true)
        }
    } else {
        objectives_shelter.setFlag(SpriteFlag.Invisible, true)
    }
    if (shack_materials_collected) {
        sprites.destroyAllSpritesOfKind(SpriteKind.stick, effects.disintegrate, 500)
        sprites.destroyAllSpritesOfKind(SpriteKind.leaf, effects.disintegrate, 500)
    }
    if (current_level == 3) {
        campfire.setFlag(SpriteFlag.Invisible, false)
    } else {
        campfire.setFlag(SpriteFlag.Invisible, true)
    }
    if (dropped_baggage_gotten == 3) {
        objectives_baggage.setFlag(SpriteFlag.Invisible, true)
    }
    if (current_level == 3 && shelter_built == false) {
        objectives_food.setFlag(SpriteFlag.Invisible, true)
        objectives_water.setFlag(SpriteFlag.Invisible, true)
    }
    if (current_level > 3 && objectives_complete) {
        travelling_back_needed = true
    }
})
forever(function () {
    if (main_menu == 1) {
        if (movement == 1) {
            if (controller.down.isPressed()) {
                compton_himself.vy += 80
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
                compton_himself.vy += -80
                animation.runImageAnimation(
                compton_himself,
                assets.animation`backwards_compy`,
                100,
                true
                )
                pause(200)
                compton_himself.setVelocity(0, 0)
            }
            if (controller.left.isPressed()) {
                compton_himself.vx += -80
                animation.runImageAnimation(
                compton_himself,
                assets.animation`left_compy`,
                80,
                true
                )
                pause(200)
                compton_himself.setVelocity(0, 0)
            }
            if (controller.right.isPressed()) {
                compton_himself.vx += 80
                animation.runImageAnimation(
                compton_himself,
                assets.animation`right_compy`,
                80,
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
        textSprite.top = 40
        textSprite.left = 10
        textSprite = textsprite.create(" Menu to on/off hotbar.", 0, 15)
        textSprite.top = 50
        textSprite.left = 4
        textSprite = textsprite.create(" F to move around hotbar,", 0, 15)
        textSprite.top = 60
        textSprite.left = 4
        textSprite = textsprite.create("and interact with tiles.", 0, 15)
        textSprite.top = 70
        textSprite.left = 10
        textSprite = textsprite.create("E to eat selected item.", 0, 15)
        textSprite.top = 80
        textSprite.left = 10
        textSprite = textsprite.create("Q to drop selected item.", 0, 15)
        textSprite.top = 90
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
