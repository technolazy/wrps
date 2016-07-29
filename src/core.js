GAME.Main = function (game) {};

var blast = false;
var gameStop = false;

// Setup the example
GAME.Main.prototype = {
    create: function () {

        // Set stage background color
        game.stage.backgroundColor = 0x121212;
        game.add.image(0, game.height - 800, 'bg1');

        var SHOT_DELAY = reg.SHOT_DELAY = this.SHOT_DELAY = 300; // milliseconds (10 bullets/3 seconds)
        var BULLET_SPEED = reg.BULLET_SPEED = this.BULLET_SPEED = 1000; // pixels/second
        var NUMBER_OF_BULLETS = reg.NUMBER_OF_BULLETS = this.NUMBER_OF_BULLETS = 20;

        if (!this.game.device.desktop) {

        }

        // Simulate a pointer click/tap input at the center of the stage
        // when the example begins running.
        game.input.activePointer.x = this.game.width / 2;
        game.input.activePointer.y = this.game.height / 2;

        if (!this.game.device.desktop) {

        }

        // Show FPS
        game.time.advancedTiming = true;

        this.game.world.setBounds(-10, -10, this.game.width + 20, this.game.height + 20);

        /////////////////////
        reg.mainScore[reg.currentMode] = 0;
        gameStop = false;
        utils.garbageCollect();

        //createGround();
        createExplosion();
        createPlayer();
        createMonsters(reg.enemies.category1, 10);
        createBullets();
        // create HUD
        createHUD();
        reg.modal = new gameModal(game);
        reg.modal.createModal({
            type: "pause",
            includeBackground: true,
            backgroundColor: "0x000000",
            itemsArr: [
                {
                    type: "bitmapText",
                    content: "Game Paused",
                    fontFamily: "fontOrange",
                    fontSize: 52,
                    textAlign: "center",
                    offsetY: -200
                },
                {
                    type: "image",
                    content: "menuPlay",
                    contentScale: 0.6,
                    callback: function () {
                        unpause();
                    },
                    offsetX: 0
                }
                /*{
                    type: "image",
                    content: "menuBack",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Levels');
                    }
                },
                {
                    type: "image",
                    content: "menuScoresSmall",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Scores');
                    },
                    offsetX: 100
                }*/
            ]
        });
        reg.modal.createModal({
            type: "levelcomplete",
            includeBackground: true,
            backgroundColor: "0x000000",
            itemsArr: [
                {
                    type: "bitmapText",
                    content: "Level \n Complete!",
                    fontFamily: "fontYellow",
                    fontSize: 56,
                    textAlign: "center",
                    offsetY: -200
                },
                /*{
                    type: "bitmapText",
                    content: "Score: ",
                    fontFamily: "fontYellow",
                    fontSize: 48,
                    offsetY: -100,
                    offsetX: -50
                },
                {
                    type: "bitmapText",
                    content: "0",
                    fontFamily: "fontYellow",
                    fontSize: 48,
                    offsetY: -100,
                    offsetX: 50
                },*/
                /*{
                    type: "image",
                    content: "tryagain",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Game');
                    },
                    offsetX: -100
                },*/
                {
                    type: "image",
                    content: "menuBack",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Levels');
                    }
                },
                {
                    type: "image",
                    content: "menuScoresSmall",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Scores');
                    },
                    offsetX: 100
                }
            ]
        });
        reg.modal.createModal({
            type: "gameover",
            includeBackground: true,
            backgroundColor: "0x000000",
            itemsArr: [
                {
                    type: "image",
                    content: "gameover",
                    offsetY: -200,
                    contentScale: 0.5
                },
                {
                    type: "bitmapText",
                    content: "Score: ",
                    fontFamily: "fontYellow",
                    fontSize: 48,
                    offsetY: -100,
                    offsetX: -50
                },
                {
                    type: "bitmapText",
                    content: "0",
                    fontFamily: "fontYellow",
                    fontSize: 48,
                    offsetY: -100,
                    offsetX: 50
                },
                {
                    type: "image",
                    content: "tryagain",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Game');
                    },
                    offsetX: -100
                },
                {
                    type: "image",
                    content: "menuBack",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Levels');
                    }
                },
                {
                    type: "image",
                    content: "menuScoresSmall",
                    contentScale: 0.6,
                    callback: function () {
                        game.state.start('Scores');
                    },
                    offsetX: 100
                }
            ]
        });

        var currentDifficulty = reg.baseDifficulty; //reg.levelEditor[reg.currentLeague].difficulty;
        reg.currentSpeed = reg.enemies.category1.speed;

        if (reg.currentMode === "scramble") {
            createScramble(currentDifficulty, false);
            makeWave(reg.enemies.category1, 1);
        } else {
            createPuzzle(currentDifficulty, false);
            waveFactory(1, reg.enemies.category1, false);
        }
    },
    update: function () {
        if (this.game.time.fps !== 0) {
            //this.fpsText.setText(this.game.time.fps + ' FPS');
        }

        game.physics.arcade.collide(reg.bulletPool, reg.monsterGroup, handleEnemyHit, null, this);
        game.physics.arcade.collide(reg.monsterGroup, reg.gun, handlePlayerHit, null, this);

        //window.console.log(game.input.activePointer.isDown);
        if (game.input.activePointer.isDown) {

        } else {

        }

        // UPDATE SOMETHING EACH FRAME
    },
    sampleFunction: function (blast) {

        if (gameStop === true) {
            return false;
        }

    },
    render: function () {

    }
};

///////////////////////////////////// PUBLIC FUNCTIONS //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * [createGround description]
 * @return {[type]} [description]
 */
function createGround() {
    // Create some ground
    reg.ground = game.add.group();
    //for (var x = 0; x < game.width; x += 32) {
    // Add the ground blocks, enable physics on each, make them immovable
    var groundBlock = game.add.sprite(0, this.game.height - 122);
    groundBlock.width = game.width;
    groundBlock.height = 122;

    game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
    groundBlock.body.immovable = true;
    groundBlock.body.allowGravity = false;
    groundBlock.alpha = 0;

    var groundRect = game.add.tileSprite(0, game.height - 122, game.width, 64, 'ground');
    groundRect.width = game.width;
    reg.ground.add(groundBlock);
    reg.ground.add(groundRect);
    // }
}

/**
 * [createPlayer description]
 * @return {[type]} [description]
 */
function createPlayer() {
    // Create an object representing our gun
    reg.gun = game.add.sprite(180, game.height - 145, 'mage', 'Mage-Idle__000');
    game.physics.enable(reg.gun, Phaser.Physics.ARCADE);

    reg.gunBase = game.add.sprite(230, game.height - 145);
    reg.gunBase.width = 200;
    reg.gunBase.height = 200;
    reg.gunBase.anchor.setTo(1, 0.5);

    // scale it down a bit
    reg.gun.scale.setTo(0.3, 0.3);

    reg.gun.animations.add('skill', Phaser.Animation.generateFrameNames('Mage-Idle__', 0, 23, '', 3), 24, true, false);
    reg.gun.animations.add('ability', Phaser.Animation.generateFrameNames('Mage-Skill__', 0, 31, '', 3), 40, false, false);

    reg.gun.animations.currentAnim.onComplete.add(function () {
        reg.gun.animations.play('skill', 24, true);
    }, this);

    reg.gun.animations.play("skill");
    // Set the pivot point to the center of the gun
    reg.gun.anchor.setTo(0.5, 0.7);

    game.world.bringToTop(reg.gun);

    reg.gun.events.onKilled.add(function (e) {
        var x = this.x;

        getExplosion(this.x, this.y, 0.45, "big_blast");

        gameOver();
    }, reg.gun);
}

/**
 * [createPuzzle description]
 * @param  {[type]} difficulty [description]
 * @return {[type]}            [description]
 */
function createPuzzle(difficulty, hidden) {

    var _dictionary = [];
    /*for (var k = 0; k < 10; k++) {
        var index = game.rnd.integerInRange(0, dictionary.length - 1);

        while (_dictionary.indexOf(dictionary[index]) !== -1) {
            window.console.log(dictionary[index], _dictionary.indexOf(dictionary[index]));
            index = game.rnd.integerInRange(0, dictionary.length - 1);
        }

        _dictionary.push(dictionary[index]);

    }*/

    _dictionary = words({
        exactly: 10,
        upperCase: true,
        difficulty: difficulty
    });

    var puzzle = wordfind.newPuzzle(
        _dictionary, {
            height: reg.rows[difficulty],
            width: reg.columns[difficulty],
            fillBlanks: true,
            orientations: reg.orientations[difficulty]
        }
    );

    reg.currentPuzzle = _dictionary;

    var rows = puzzle.length;
    var columns = puzzle[0].length;

    var puzzleGroup = game.add.group();
    //puzzleGroup.x = game.centerX;
    //puzzleGroup.y = 50;
    var text;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            text = game.add.bitmapText(0, 0, 'fontYellow', puzzle[i][j].toUpperCase(), 38);

            if (puzzle[i][j] === puzzle[i][j].toUpperCase()) {
                text.isValid = true;
            } else {
                text.isValid = false;
            }

            text.inputEnabled = true;
            text.events.onInputOver.add(letterPressed, this);
            text.events.onInputDown.add(letterPressed, this);

            text.updateText();
            text.hitArea = new Phaser.Rectangle(0, 0, text.textWidth + 1, text.textHeight + 1);
            text.x = Math.round((text.textWidth * j) + (15 * j));
            text.y = Math.round((text.textHeight * i) + (15 * i));

            puzzleGroup.add(text);
        }
    }

    reg.hints = {};
    var hintGroup = game.add.group();
    for (var f = 0; f < _dictionary.length; f++) {
        var hint = game.add.bitmapText(0, 0, 'font', _dictionary[f], 25);

        hint.id = _dictionary[f];
        hint.updateText();
        hint.x = 50;
        hint.y = 100 + (hint.textHeight * f) + (10 * f);

        hintGroup.add(hint);
        reg.hints[_dictionary[f]] = hint;
    }
    reg.hintGroup = hintGroup;
    puzzleGroup.x = game.width / 2 - (puzzleGroup.width / 2) + 50;
    puzzleGroup.y = 50;
    if (hidden === true) {
        puzzleGroup.alive = false;
        puzzleGroup.alpha = 0;
        hintGroup.alpha = 0;
        hintGroup.alive = false;
    }


    reg.puzzleGroup = puzzleGroup;

    game.input.moveCallback = function (pointer, x, y) {
        // pointer returns the active pointer, x and y return the position on the canvas
    };
}

function letterPressed(e, e2) {

    if (e2.isDown === false) {
        return false;
    }

    var puzzle = reg.currentPuzzle.toString();
    var result = true;
    var done = false;

    if (e.isValid) {
        e.font = "fontPurpleBlue";
        e.fontName = "fontPurpleBlue";

        reg.currentWord = reg.currentWord + e.text;

        if (puzzle.indexOf(reg.currentWord) === -1) {
            result = false;
        }

        if (reg.currentPuzzle.indexOf(reg.currentWord) !== -1) {
            done = true;
        }

        e.update();
        e.updateText();
    }

    // if not a word we reset
    if (result === false) {
        reg.currentWord = "";
        utils.resetWord();
    } else {
        // if a word we check if it is done
        if (done === true) {
            utils.setWordDone();
            fireBullet(); // needs debug
            var hint = utils.findHint(reg.currentWord);
            utils.removeWord(reg.currentWord, reg.currentPuzzle);
            reg.currentWord = "";
            hint.destroy();

            if (reg.hintGroup.children.length <= 0) {
                levelComplete();
            }
        }
    }
}

//////////////////////////////////

function createScramble(difficulty, hidden) {

    if (reg.scramblePuzzle === undefined || reg.scramblePuzzle === null) {
        reg.scramblePuzzle = game.add.group();
    } else {
        reg.scramblePuzzle.forEachExists(function (item) {
            item.getChildAt(0).events.onInputDown.removeAll();
        });

        reg.scramblePuzzle.removeChildren();
        reg.scramblePuzzle.destroy();
        reg.scramblePuzzle = game.add.group();
    }

    if (reg.scramblePuzzle.children.length > 0) {
        reg.scramblePuzzle.removeChildren();
    }

    var _dictionary = [];
    var lineWrap = 0;
    _dictionary = words({
        exactly: 10,
        upperCase: true,
        difficulty: difficulty
    });
    for (var k = 0; k < 10; k++) {
        var index = k; //game.rnd.integerInRange(0, dictionary.length - 1);

        /*while (_dictionary.indexOf(dictionary[index]) !== -1) {
            //window.console.log(dictionary[index], _dictionary.indexOf(dictionary[index]));
            index = game.rnd.integerInRange(0, dictionary.length - 1);
        }*/

        var placeholder = game.add.tileSprite(0, 0, 0, 0, "wordBG");
        var text = game.add.bitmapText(0, 0, 'fontYellow', _dictionary[index], 34);

        text.correct = _dictionary[index];
        placeholder.correct = _dictionary[index];

        text.update();
        text.inputEnabled = true;
        text.events.onInputDown.removeAll();
        text.events.onInputDown.add(checkCorrect, text);
        placeholder.inputEnabled = true;
        placeholder.events.onInputDown.add(checkCorrect, this);

        var w = text.width + 20;
        var h = text.height + 25;
        placeholder.width = w;
        placeholder.height = 75;
        text.x = 10;
        text.y = 22;
        var finalPosX;
        var finalPosY = 0;

        if (k <= 0 || lineWrap === 4) {
            finalPosX = 0;
        } else {
            finalPosX = reg.scramblePuzzle.getChildAt(k - 1).width + reg.scramblePuzzle.getChildAt(k - 1).x + 20;
        }
        placeholder.x = finalPosX;

        if (lineWrap === 4) {
            finalPosY = 20;

            if (k === 0) {
                finalPosY = 0;
            } else {
                finalPosY = reg.scramblePuzzle.getChildAt(k - 1).height + reg.scramblePuzzle.getChildAt(k - 1).y + 20;
            }
            lineWrap = 0;
        } else {
            if (k === 0) {
                finalPosY = 0;
            } else {
                finalPosY = reg.scramblePuzzle.getChildAt(k - 1).y;
            }
        }
        placeholder.y = finalPosY;
        placeholder.addChild(text);
        reg.scramblePuzzle.add(placeholder);
        lineWrap += 1;
    }

    var selectedText = _dictionary[game.rnd.integerInRange(0, 9)];
    showSpell(String(selectedText).shuffle());
    reg.scrambledWord = selectedText;
    reg.scramblePuzzle.x = game.width / 2 - reg.scramblePuzzle.width / 2;
    reg.scramblePuzzle.y = 80;
    game.world.bringToTop(reg.scramblePuzzle);
}

/**
 * [checkCorrect description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
function checkCorrect(item) {

    if (item.correct === reg.scrambledWord) {
        fireBullet();
    } else {
        reg.currentSpeed += 6;
    }
}


/**
 * [shockAndAwe Shakes the camera and flashes the stage]
 * @return {[type]} [description]
 */
function shockAndAwe() {
    // Create the flash
    reg.flash.alpha = 1;
    game.add.tween(reg.flash)
        .to({
            alpha: 0
        }, 180, Phaser.Easing.Cubic.In)
        .start();

    // Shake the camera by moving it up and down 5 times really fast
    game.camera.y = 0;
    game.add.tween(game.camera)
        .to({
            y: -10
        }, 80, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
        .start();
}

function createHUD() {

    if (reg.hudGroup) {
        reg.hudGroup.removeChildren();
        reg.hudGroup.destroy();
    }

    var hudGroup = game.add.group();
    var text = game.add.bitmapText(0, 0, "fontYellow", "Score - " + reg.mainScore[reg.currentMode], 36);
    text.update();
    hudGroup.x = game.width - text.width - 20;
    hudGroup.y = 5;

    var pause = game.add.button(10, 5, 'menuPause', function () {
        game.input.onDown.add(unpause, this);
        game.paused = true;
        reg.modal.showModal("pause");

    }, this);

    var menuBack = game.add.button(90, 5, 'menuBack', function() {
        game.state.start('Levels');
    });

    var menuScores = game.add.button(150, 5, 'menuScoresSmall', function() {
        game.state.start('Scores');
    });

    pause.scale.setTo(0.6);
    menuBack.scale.setTo(0.6);
    menuScores.scale.setTo(0.6);

    hudGroup.add(text);
    //hudGroup.add(pause);
    reg.hudGroup = hudGroup;
}

/**
 * [updateHUD description]
 * @return {[type]} [description]
 */
function updateHUD() {
    var item = reg.hudGroup.getChildAt(0);
    item.text = "Score - " + reg.mainScore[reg.currentMode];
    item.update();
    item.updateText();
    reg.hudGroup.x = game.width - item.width - 20;
    reg.hudGroup.y = 5;
}

/**
 * [unpause description]
 * @return {[type]} [description]
 */
function unpause() {
    if (game.paused) {
        reg.modal.hideModal("pause");
        // Unpause the game
        game.paused = false;
    }
}

/**
 * [createExplosion description]
 * @return {[type]} [description]
 */
function createExplosion() {
    reg.explosionGroup = game.add.group();
    reg.bigExplosionGroup = game.add.group();
}

/**
 * [createBullets description]
 * @return {[type]} [description]
 */
function createBullets(blastObj) {

    blastObj = blastObj || reg.spells[0];

    var type = blastObj.school || "fire";
    var damage = blastObj.dmg;

    if (reg.bulletPool) {
        reg.bulletPool.destroy();
    }

    // Create an object pool of bullets
    reg.bulletPool = game.add.group();
    for (var i = 0; i < reg.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        var bullet = game.add.sprite(0, -5, type + "_blast");
        bullet.damage = damage;

        if (type === "fire") {
            //bullet.animations.add("fly", [0, 1, 2, 3], 18, true);
            //bullet.animations.play("fly");
        } else if (type === "lightning") {
            bullet.scale.setTo(0.25, 0.25);
            bullet.animations.add("fly", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 30, true);
            bullet.animations.play("fly");
        } else if (type === "ice") {
            bullet.animations.add("fly", [0, 1, 2], 10, true);
            bullet.animations.play("fly");
        } else if (type === "nature") {
            bullet.scale.setTo(0.7, 0.7);
        }

        reg.bulletPool.add(bullet);

        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);

        // Enable physics on the bullet
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.body.collideWorldBounds = false;
        bullet.body.allowGravity = false;

        // Set its initial state to "dead".
        bullet.kill();
    }
}

function fireBullet() {
    reg.gun.animations.play("ability");
    game.time.events.add(Phaser.Timer.SECOND * 0.4, shootBullet, this);
}

/**
 * [shootBullet description]
 * @return {[type]} [description]
 */
function shootBullet() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.

    if (reg.lastBulletShotAt === undefined) reg.lastBulletShotAt = 0;
    if (game.time.now - reg.lastBulletShotAt < reg.SHOT_DELAY) return;
    reg.lastBulletShotAt = game.time.now;

    // Get a dead bullet from the pool
    var bullet = reg.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(reg.gunBase.x, reg.gunBase.y);
    //bullet.rotation = reg.gunBase.rotation;

    // Shoot it in the right direction
    bullet.body.velocity.x = reg.BULLET_SPEED;
    bullet.body.velocity.y = 0; //Math.sin(bullet.rotation) * reg.BULLET_SPEED;
}

/**
 * [showSpell description]
 * @param  {[type]} spellObj [description]
 * @return {[type]}          [description]
 */
function showSpell(text) {

    if (reg.speach) {
        reg.speach.destroy();
        reg.speach = null;
    }

    var title = text;
    //title = "NIGHTMARE";
    var item = game.add.sprite(0, 0, "speach");
    var text = game.add.bitmapText(0, 0, "font", title, 28);

    text.update();
    item.x = 180;
    item.y = reg.gunBase.y - (item.height * 0.8) - 30;
    item.scale.setTo(0.82, 0.82);
    text.update();
    text.x = (item.width / 2 - text.width / 2) + 15;
    text.y = 50; //item.y + 40;

    item.addChild(text);

    reg.speach = item;
    /*var tween = tweenProperty(item, "alpha", {
        alpha: 0
    }, 600, 2500);

    tween.onComplete.add(function (e) {
        tween.stop();
        item.kill();
    }, item);*/
}

/**
 * [handleEnemyHit description]
 * @param  {[type]} bullet [description]
 * @param  {[type]} enemy  [description]
 * @return {[type]}        [description]
 */
function handleEnemyHit(bullet, enemy) {

    var effect;
    var damage = bullet.damage;
    if (reg.enabledSchool === "normal") {

    } else if (reg.enabledSchool === "ice") {
        if (enemy.body.velocity.x < 0) {
            enemy.body.velocity.x = ((Math.abs(enemy.body.velocity.x) - 20) * -1);
        } else {
            enemy.body.velocity.x = (Math.abs(enemy.body.velocity.x) - 20);
        }
        //enemy.tint = reg.spells[1].effectColor; // not sure
    } else if (reg.enabledSchool === "lightning") {
        enemy.speed = enemy.body.velocity.x;
        enemy.body.velocity.x = 0;
        game.time.events.add(Phaser.Timer.SECOND * 2, function () {
            enemy.body.velocity.x = enemy.speed;
            enemy.speed = Math.abs(enemy.speed);
        }, enemy);
    } else if (reg.enabledSchool === "nature") {
        damage = damage * 2;
    }

    enemy.kill();
    //enemy.damage(damage);
    if (enemy.tweenObj) {
        enemy.tweenObj.stop();
        enemy.alpha = 1;
    }

    var tween = game.add.tween(enemy)
        .to({
            alpha: 0.4
        }, 120, Phaser.Easing.Cubic.In, true, 0, 2, true);
    //getExplosion(bullet.x + 5, bullet.y + 5, 0.15, "small_blast");
    enemy.tweenObj = tween;
    // Kill the bullet
    bullet.kill();

    var currentDifficulty = reg.baseDifficulty; //reg.levelEditor[reg.currentLeague].difficulty;
    increaseScore();

    if (reg.currentMode === "scramble") {
        // reset the scramble
        createScramble(currentDifficulty, false);
        makeWave(reg.enemies.category1, 1);
    } else {

    }

}

/**
 * [handlePlayerHit description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function handlePlayerHit(e) {
    reg.gun.kill();

    if (reg.currentMode === "scramble") {
        reg.speach.destroy();
    }
}


/**
 * [getExplosion Create explosion]
 * @param  {[type]} x     [description]
 * @param  {[type]} y     [description]
 * @param  {[type]} scale [description]
 * @return {[type]}       [description]
 *
 * Search Tag: #explosion, #explode
 */
function getExplosion(x, y, scale, type) {
    // Try to get a used explosion from the explosionGroup.
    // If an explosion isn't available, create a new one and add it to the group.
    // Setup new explosions so that they animate and kill themselves when the
    // animation is complete.
    // Get the first dead explosion from the explosionGroup
    var explosion;
    if (type === "small_blast") {
        explosion = reg.explosionGroup.getFirstDead();
    } else if ('big_blast') {
        explosion = reg.bigExplosionGroup.getFirstDead();
    }
    // If there aren't any available, create a new one
    if (explosion === null) {

        var animation;
        if (type === "big_blast") {
            explosion = game.add.sprite(0, 0, 'explosion_anim', 'Explo__000');
            explosion.anchor.setTo(0.5, 0.5);

            // Add an animation for the explosion that kills the sprite when the
            // animation is complete
            animation = explosion.animations.add('boom', Phaser.Animation.generateFrameNames('Explo__', 0, 10, '', 3), 20, false);
        } else if (type === "small_blast") {
            explosion = game.add.sprite(0, 0, 'explosion_anim', 'Explo__000');
            explosion.anchor.setTo(0.5, 0.5);

            // Add an animation for the explosion that kills the sprite when the
            // animation is complete
            animation = explosion.animations.add('boom', Phaser.Animation.generateFrameNames('Explo__', 0, 10, '', 3), 20, false);
        }

        animation.killOnComplete = true;

        // Add the explosion sprite to the group
        reg.explosionGroup.add(explosion);
    }

    // Revive the explosion (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    explosion.revive();

    scale = scale || 1;

    // Move the explosion to the given coordinates
    explosion.x = x;
    explosion.y = y;
    explosion.scale.x = scale;
    explosion.scale.y = scale;

    // Set rotation of the explosion at random for a little variety
    explosion.angle = game.rnd.integerInRange(0, 360);

    // Play the animation
    explosion.animations.play('boom');

    // Return the explosion itself in case we want to do anything else with it
    return explosion;
}

/**
 * [gameOver description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function gameOver(args) {
    reg.modal.showModal('gameover');
    utils.animateNumber(reg.mainScore[reg.currentMode], updateScore, 10, 5);
    saveScore();
}

/**
 * [levelComplete description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function levelComplete(args) {
    reg.modal.showModal("levelcomplete");
    utils.animateNumber(reg.mainScore[reg.currentMode], updateScore, 10, 5);
    saveScore();
}

/**
 * [updateScore description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function updateScore(args) {
    var value = reg.modal.getModalItem("gameover", 3).text;
    reg.modal.getModalItem("gameover", 3).text = String(Number(value) + args[0]);
    reg.modal.getModalItem("gameover", 3).update();
}

/**
 * [increaseScore description]
 * @return {[type]} [description]
 */
function increaseScore() {
    reg.mainScore[reg.currentMode] += reg.pointsRate[reg.baseDifficulty];
    updateHUD();
}

/**
 * [saveScore description]
 * @return {[type]} [description]
 */
function saveScore() {

    reg.score = Number(reg.mainScore[reg.currentMode]);
    var savedScore = JSON.parse(localStorage.getItem("magicwords"));

    if (Number(savedScore[reg.currentMode]) < Number(reg.score)) {
        reg.mainScore.bestScore[reg.currentMode] = reg.score;
    }


    localStorage.setItem("magicwords", JSON.stringify(reg.mainScore));
}



//////////////

/**
 * [tweenProperty description]
 * @param  {[type]} item     [description]
 * @param  {[type]} property [description]
 * @param  {[type]} obj      [description]
 * @param  {[type]} duration [description]
 * @return {[type]}          [description]
 */
function tweenProperty(item, property, obj, duration, delay, easing) {

    delay = delay || {};
    easing = easing || Phaser.Easing.Linear.None;

    var tween = game.add.tween(item).to(obj, duration, easing, true, delay, 0, false);

    return tween;
}


/**
 * [resetAchievements description]
 * @return {[type]} [description]
 */
function resetAchievements() {
    reg.levelEditor = JSON.parse('{"level1":{"levelName":"Level - 1","status":"open","bestScore":"0","enemies":"25","minInterval":1000,"maxInterval":3600,"fearPerFrame":0.06},"level2":{"levelName":"Level - 2","status":"closed","bestScore":"0","enemies":"38","minInterval":1100,"maxInterval":3200,"fearPerFrame":0.08},"level3":{"levelName":"Level - 3","status":"closed","bestScore":"0","enemies":"45","minInterval":1000,"maxInterval":3000,"fearPerFrame":0.09},"level4":{"levelName":"Level - 4","status":"closed","bestScore":"0","enemies":"55","minInterval":1200,"maxInterval":3000,"fearPerFrame":0.1},"level5":{"levelName":"Level - 5","status":"closed","bestScore":"0","enemies":"80","minInterval":800,"maxInterval":3000,"fearPerFrame":0.15}}');
}

// Setup game
var game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'game');
game.state.add('Boot', GAME.Boot);
game.state.add('Preloader', GAME.Preloader);
game.state.add('Scores', GAME.Scores);
game.state.add('Info', GAME.Info);
game.state.add('MainMenu', GAME.Menu);
game.state.add("Levels", GAME.Levels);
game.state.add('Game', GAME.Main);

game.state.start('Boot');