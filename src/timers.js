/**
 * [initTimer description]
 * @return {[type]} [description]
 */
function initTimer(time) {
    reg.timer = {};
    var _time = time || 4000;

    reg.timer = game.time.events.repeat(_time, 50, function () {
        // update or create something based on timer
        initDrops();
    }, this, []);

    return reg.timer;
}

/**
 * [removeTimer description]
 * @return {[type]} [description]
 */
function removeTimer() {
    gameStop = true;
    // clear timer
    game.time.events.remove(reg.timer);

    // do something when all timers stop ex:
    // saveScore();
}

function countDown(fn, endFn) {
    endFn = endFn || function(){};
    var _timer = game.time.create(false);
    _timer.start();
    _timer.onComplete.add(endFn);
    _timer.repeat(Phaser.Timer.SECOND, 3, fn, this);
    //window.console.log("adding timer");
}