
GAME.Menu = function(game) {

};

GAME.Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = 0x69d7ff;
        this.add.image(0, game.height-800, 'bg1');

        this.add.image(game.width/2 - (287/2), 80, 'title');

        this.startButton = this.add.button((game.width/2) - (134/2), game.height/2 - 60, 'menuPlay', this.startGame, this);
        this.infoButton = this.add.button(this.startButton.x - 150, this.startButton.y + 180, 'menuScores', this.startScores, this);
        this.soundButton = this.add.button(this.startButton.x+this.startButton.width + 150-96, this.startButton.y + 180, 'menuSoundOn', this.toggleSound, this);

        this.scoresButton = this.add.button((game.width) - 120, game.height-550*0.4, 'sign_menu', this.startInfo, this);

        this.scoresButton.scale.setTo(0.4, 0.4);

        // sound manager
        /*reg.track = game.add.audio('track');
        reg.track.loop = true;

        if (reg.sound === true) {
            reg.track.play();
        }*/
    },
    startGame: function() {
        game.state.start('Levels');
    },
    startScores: function () {
        game.state.start('Scores');
    },
    toggleSound: function() {
        reg.sound = (reg.sound === true) ? false : true;

        if(reg.sound === false) {
            this.soundButton.loadTexture("menuSoundOff",0);
            reg.track.stop();
        }
        else {
            this.soundButton.loadTexture("menuSoundOn",0);
            reg.track.play();
        }
    },
    startInfo: function() {
        game.state.start('Info');
    }
};