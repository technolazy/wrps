var utils = utils || {};


utils = {

    setWordDone: function () {
        var totalElem = reg.puzzleGroup.children.length;
        for (var i = 0; i < totalElem; i++) {
            var item = reg.puzzleGroup.getChildAt(i);

            //window.console.log(item.fontName);
            if (item.fontName === "fontPurpleBlue") {
                item.font = "fontDisabled";
                item.fontName = "fontDisabled";
                item.update();
                item.updateText();
                //item.events.onInputDown.remove(letterPressed, this);
                //item.events.destroy();
            } else {
                continue;
            }
        }
    },
    animateNumber: function (num, fn, step, speed, endFn) {
        var _step = step || 10;
        var _speed = speed || 10; // in seconds because this is total
        var repeats = Math.ceil(num / _step);
        var animSpeed = (_speed / repeats) * 1000; // in ms

        //window.console.log("repeats: " + repeats + " animSpeed: " + animSpeed);
        var _endFn = endFn || function () {
            game.time.events.remove(this);
        };
        var _timer = game.time.create(true);
        _timer.start();
        _timer.onComplete.add(_endFn);
        _timer.repeat(animSpeed, repeats, fn, this, [_step]);

    },
    resetWord: function () {
        var totalElem = reg.puzzleGroup.children.length;
        for (var i = 0; i < totalElem; i++) {
            var item = reg.puzzleGroup.getChildAt(i);

            if (item.fontName === "fontPurpleBlue") {
                item.font = "fontYellow";
                item.fontName = "fontYellow";
                item.update();
                item.updateText();
            } else {
                continue;
            }
        }
    },
    findHint: function (word) {
        var result = false;
        var finalResult = {};
        for(var i=0;i<reg.hintGroup.children.length;i++){
            var item = reg.hintGroup.children[i];
            if (result === false) {
                if (word === item.text) {
                    result = true;
                    finalResult = item;
                }
            }
        }

        return finalResult;
    },
    removeWord: function(word, arr) {
        var index = arr.indexOf(word);
        //window.console.log(arr);
        arr.splice(index,1);
        reg.currentPuzzle = arr;
    },
    getRandomSpell: function (limit) {
        var index;

        if (limit !== undefined) {
            index = limit;
        } else {
            index = game.rnd.integerInRange(0, reg.spells.length - 1);
        }

        return reg.spells[index];
    },
    enableSpell: function (spellSchool) {
        reg.enabledSchool = spellSchool;
        reg.currentTrajectory = reg.trajectoryColors[spellSchool];
    },
    calculateSpells: function () {

    },
    garbageCollect: function () {

        if (reg.scramblePuzzle) {
            reg.scramblePuzzle.destroy();
            reg.scramblePuzzle = null;
        }

        if (reg.gun) {
            reg.gun.destroy();
            reg.gun = null;
        }

        if (reg.monsterGroup) {
            reg.monsterGroup.destroy();
            reg.monsterGroup = null;
        }

        if (reg.hudGroup) {
            reg.hudGroup.destroy();
            reg.hudGroup = null;
        }

        if (reg.ground) {
            reg.ground.destroy();
            reg.ground = null;
        }

        if (reg.speach) {
            reg.speach.destroy();
            reg.speach = null;
        }
    }

};

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
};