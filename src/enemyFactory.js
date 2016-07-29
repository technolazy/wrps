/**
 * [produceEnemies description]
 * @return {[type]} [description]
 */
function produceEnemies(type) {

    var assetIndex = game.rnd.integerInRange(0, reg.monsterTypes.length - 1);
    var monsterAsset = reg.monsterTypes[assetIndex];
    var properties = type[0];
    var monster = reg.monsterGroup.getFirstDead(); // Recycle a dead monster
    if (monster) {
        if (monster.tweenObj) {
            monster.tweenObj.stop();
        }
        monster.frameName = monsterAsset;
        var speed = Number(reg.currentSpeed); //game.rnd.integerInRange(Number(properties.speed), Number(properties.speed) * 2);
        monster.reset(game.width + 20, game.height - 150); // Position on ground
        monster.revive(); // Set "alive"
        monster.body.velocity.setTo(0, 0); // Stop moving
        monster.body.acceleration.setTo(0, 0); // Stop accelerating
        monster.body.velocity.x = (speed * -1); // Move left
        monster.body.velocity.y = 0;
        monster.body.allowGravity = false;
        monster.body.immovable = true;
        monster.alpha = 1;
        monster.rotation = 0; // Reset rotation
        //monster.frame = 0; // Set animation frame to 0
        monster.anchor.setTo(0.5, 0.5); // Center texture
        monster.health = 1;
        monster.speed = speed;
        monster.hasSheep = false;
        monster.hasSheepAlready = false;
        monster.scale.setTo(0.2, 0.2);

        var monsterType = String(monster.frameName).split("/");
        monsterType = monsterType[0];
        monsterType = String(monsterType).split(" ");
        monsterType = monsterType[1];
        monster.animations.add('move', ['monster ' + monsterType + '/walk/frame-1',
            'monster ' + monsterType + '/walk/frame-2',
            'monster ' + monsterType + '/walk/frame-3',
            'monster ' + monsterType + '/walk/frame-4'], 8, true, false);
        monster.manualUpdate = function () {

        };

        monster.events.onDamage = new Phaser.Signal();
        // window.console.log(monster.events);

        //monster.events.onDamage.
        monster.events.onKilled.add(function (e) {
            var x = this.x;

            getExplosion(this.x, this.y, 0.45, "big_blast");
        }, monster);

        monster.animations.play("move");

        if (reg.currentMode === "scramble") {
            reg.currentSpeed += 6;
        }
    }

    //reg.enemy = game.add.sprite(game.width, game.height - 150, 'enemy');

}

/**
 * [initProduction description]
 * @return {[type]} [description]
 */
function initProduction(type, initial, time) {

    var _time = time || 8; //game.rnd.integerInRange(8, 15);

    reg.timer = game.time.create(false);
    reg.timer.start();
    reg.timer.onComplete.add(function () {
        if (reg.levelEnded === true) {
            //window.console.log("ENEMY PRODUCTION ENDED!");
        }
    }, game);

    if (initial) {
        reg.timer.add(Phaser.Timer.SECOND * _time, function (type) {
            produceEnemies(type);
        }, this, [type]);
    } else {
        reg.timer.repeat(Phaser.Timer.SECOND * _time, 9, function (type) {
            produceEnemies(type);
        }, this, [type]);
    }

    //window.console.log("production started");
}

/**
 * [makeWave description]
 * @param  {[type]} type [description]
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
function makeWave(type, time) {
    initProduction(type, true, time);
}

/**
 * [waveFactory description]
 * @param  {[type]} waves [description]
 * @return {[type]}       [description]
 */
function waveFactory(waves, type, initial) {

    var _time = (waves * 1) + 1;
    reg.currentWave += 1;
    produceEnemies([type]);
    initProduction(type, initial);

    //updateHud("waves", reg.currentWave);

    /*reg.waveTimer = game.time.create(false);
    reg.waveTimer.start();

    reg.waveTimer.onComplete.add(function(){
        window.console.log("waves ended for level");
        reg.levelEnded = true;
    });*/

    /*reg.waveTimer.repeat(Phaser.Timer.SECOND * _time, waves, function (type) {
        reg.currentWave += 1;
        window.console.log("STARTED WAVE: ", reg.currentWave);
        initProduction(type[0], false);
        //updateHud("waves", reg.currentWave);
        //showWaveMessage(reg.currentWave);
    }, this, [type]);*/
}

/**
 * [stopProduction description]
 * @return {[type]} [description]
 */
function stopProduction() {
    game.time.events.remove(reg.timer);
    game.time.events.remove(reg.waveTimer);
}

/**
 * [createMosters description]
 * @return {[type]} [description]
 */
function createMonsters(type, amount) {

    type = type || reg.enemies.category1;
    amount = amount || 20;

    var MONSTERS = amount;
    var index = game.rnd.integerInRange(0, type.asset.length - 1);
    if (reg.monsterGroup === undefined || reg.monsterGroup === null) {
        reg.monsterGroup = game.add.group();
        reg.monsterGroup.enableBody = true;
        reg.monsterGroup.physicsBodyType = Phaser.Physics.ARCADE;
        reg.monsterGroup.createMultiple(MONSTERS, "enemies", type.asset[index]);
    } else {
        reg.monsterGroup.removeChildren();
        reg.monsterGroup.destroy();
        reg.monsterGroup = null;


        reg.monsterGroup = game.add.group();
        reg.monsterGroup.enableBody = true;
        reg.monsterGroup.physicsBodyType = Phaser.Physics.ARCADE;
        reg.monsterGroup.createMultiple(MONSTERS, "enemies", type.asset[index]);
    }
}

function showWaveMessage(wave) {
    var text = String("Incoming Wave!");
    var waveCount = game.add.bitmapText(game.world.centerX, game.world.centerY - 10, 'mageGreen', text, 42);

    waveCount.updateText();
    var projectedX = game.world.centerX - ((waveCount.textWidth * 2) * 0.5);
    var projectedY = game.world.centerY - ((waveCount.textHeight * 2) * 0.5) - 50;

    waveCount.x = game.world.centerX;
    waveCount.y = game.world.centerY - 50;

    waveCount.pivot.x = waveCount.width * 0.5;
    waveCount.pivot.y = waveCount.height * 0.5;

    var tween = tweenProperty(waveCount.scale, "size", {
        /*fontSize: 84*/
        x: 2,
        y: 2
    }, 800, 0, Phaser.Easing.Back.Out);
    tween.onComplete.add(function (obj, tween) {
        game.time.events.add(Phaser.Timer.SECOND * 3, function (args) {
            args[0].destroy();
        }, tween, [waveCount]);
    });
}