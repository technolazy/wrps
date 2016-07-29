GAME.Info = function (game) {};
GAME.Info.prototype = {

    create: function () {
        this.game.stage.backgroundColor = 0xf3e38b;
        this.add.image(0, 0, 'bg2');


        this.menuButton = this.add.button((game.width / 2) - 53, game.height - 150, 'menuBack', this.startMenu, this);

        this.findScreen = this.add.image(game.width/2 - (479*0.8+50), 80, 'info_find');
        this.findScreen.scale.setTo(0.8, 0.8);
        this.scrambleScreen = this.add.image(game.width/2 + 50, 80, 'info_scramble');
        this.scrambleScreen.scale.setTo(0.8, 0.8);

        this.infoFindText = this.add.bitmapText(this.findScreen.x, this.findScreen.y+this.findScreen.height+20, 'font', lang[reg.selectedLang].infoFind, 20);
        this.infoScrambleText = this.add.bitmapText(this.scrambleScreen.x, this.scrambleScreen.y+this.scrambleScreen.height+20, 'font', lang[reg.selectedLang].infoScramble, 20);



    },
    startMenu: function () {
        game.state.start('MainMenu');
    }
};