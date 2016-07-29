GAME.Preloader = function (game) {};
GAME.Preloader.prototype = {
    preload: function () {
        this.game.stage.backgroundColor = '#d7ccc8';

        //Add a loading label on the screen
        this.add.image(0, 0, "bg1");
        var loadingLabel = game.add.text(game.world.centerX, 250, lang[reg.selectedLang].loading, {
            font: '42px chunqregular',
            fill: '#923ac8'
        });
        loadingLabel.anchor.setTo(0.5, 0.5);

        // Add the progress bar
        this.preloadBar = game.add.sprite(490, 36, 'loading');
        this.preloadBar.x = game.world.centerX - (490 / 2);
        this.preloadBar.y = game.world.centerY - (36 / 2);
        game.load.setPreloadSprite(this.preloadBar, 0);

        // FONTS
        this.game.load.bitmapFont('font', 'styles/fonts/font/font.png', 'styles/fonts/font/font.fnt');
        this.game.load.bitmapFont('fontOrange', 'styles/fonts/font/fontOrange.png', 'styles/fonts/font/fontOrange.fnt');
        //this.game.load.bitmapFont('fontBlue', 'styles/fonts/font/cartoonfont.png', 'styles/fonts/font/cartoonfont.fnt');
        this.game.load.bitmapFont('fontYellow', 'styles/fonts/font/fontYellow.png', 'styles/fonts/font/fontYellow.fnt');
        this.game.load.bitmapFont('fontPurpleBlue', 'styles/fonts/font/fontPurpleBlue.png', 'styles/fonts/font/fontPurpleBlue.fnt');
        this.game.load.bitmapFont('fontDisabled', 'styles/fonts/font/fontDisabled.png', 'styles/fonts/font/fontDisabled.fnt');

        // BG's
        //this.load.image('bg1', 'assets/bg1.jpg');
        this.load.image('bg2', 'assets/bg2.jpg');
        this.load.image('ground', 'assets/bg_bottom.png');

        this.load.atlasJSONHash('explosion_anim', 'assets/explode/explosion_new.png', 'src/atlas/explosion_new.json');
        /*this.load.spritesheet('fire_blast', 'assets/mage_spells/fire_blast_anim.png', 40, 40);*/
        this.load.image('fire_blast', 'assets/mage_spells/fire_blast.png');

        // PLAYER AND ENEMIES
        this.game.load.atlasJSONHash('mage', 'assets/mage_skill.png', 'src/atlas/mage_skill.json');
        this.game.load.atlasJSONHash('enemies', 'assets/enemies/monsters.png', 'src/atlas/monsters.json');


        // SPELLS
        /*this.load.image("speach_fire", "assets/mage_spells/speach_fire.png");
        this.load.image("speach_ice", "assets/mage_spells/speach_ice.png");
        this.load.image("speach_lightning", "assets/mage_spells/speach_lightning.png");
        this.load.image("speach_nature", "assets/mage_spells/speach_nature.png");*/


        // Add the progress bar


        // MENU BUTTONS
        this.load.image("menuPlay", "assets/menuPlay.png");
        this.load.image("menuBack", "assets/menuBack.png");
        this.load.image("menuPause", "assets/menuPause.png");
        this.load.image("menuSoundOn", "assets/menuSoundOn.png");
        this.load.image("menuSoundOff", "assets/menuSoundOff.png");
        this.load.image("sign", "assets/sign.png");
        this.load.image("sign_disabled", "assets/sign_disabled.png");
        this.load.image("sign_menu", "assets/sign_menu.png");
        this.load.image("menuScores", "assets/menuScoresLarge.png");
        this.load.image("menuScoresSmall", "assets/menuScores.png");
        this.load.image("twitter", "assets/twitter.png");
        this.load.image("facebook", "assets/facebook.png");
        this.load.image("arrowR", "assets/arrowR.png");
        this.load.image("arrowL", "assets/arrowL.png");
        //this.load.image("arrowLeft", "assets/arrowLeft.png");
        //this.load.image("arrowRight", "assets/arrowRight.png");
        this.load.image("title", "assets/logo.png");

        // LEVELS
        //this.load.image("playButton","assets/playButton.png");
        //this.load.image("playButtonPressed","assets/playButtonPressed.png");
        //this.load.image("playButtonDisabled","assets/playButtonDisabled.png");

        //this.load.image("replayButton","assets/replayButton.png");
        //this.load.image("replayButtonPressed","assets/replayButtonPressed.png");

        this.load.image("playButton", "assets/shareButton.png");
        this.load.image("shareButton", "assets/shareButton.png");
        this.load.image("shareButtonPressed", "assets/shareButtonPressed.png");
        this.load.image("shareButtonDisabled", "assets/shareButtonDisabled.png");
        this.load.image("levelPanel", "assets/levelPanel.png");
        //this.load.image("prevButton","assets/prevButton.png");
        //this.load.image("nextButton","assets/nextButton.png");
        this.load.image("button_easy", "assets/button_easy.png");
        this.load.image("button_moderate", "assets/button_moderate.png");
        this.load.image("button_hard", "assets/button_hard.png");
        this.load.image("word_scramble_button", "assets/sign_scramble.png");
        this.load.image("word_find_button", "assets/sign_find.png");
        this.load.image("word_scramble_button_disabled", "assets/sign_scramble_disabled.png");
        this.load.image("word_find_button_disabled", "assets/sign_find_disabled.png");
        this.load.image("simpleStar", "assets/simpleStar.png");
        this.load.image("simpleStarDisabled", "assets/simpleStarDisabled.png");
        this.load.image("simpleStars", "assets/simpleStars.png");
        this.load.image("simpleStarsDisabled", "assets/simpleStarsDisabled.png");
        this.load.image("levelTitle", "assets/levelTitle.png");
        this.load.image("wordBG", "assets/wordBG2.png");

        //HUD
        this.load.image("gameover", "assets/gameover.png");
        this.load.image("tryagain", "assets/replay.png");
        this.load.image("yes", "assets/yes.png");
        this.load.image("no", "assets/no.png");
        this.load.image("speach", "assets/mage_spells/speach2.png");

        // EXPLOSION
        this.load.spritesheet("explosion", "assets/cartoon_smoke_up_strip2.png", 256, 256);

        //scores
        this.game.load.image("starYellow", "assets/achievement/starYellow.png");
        this.game.load.image("starGreen", "assets/achievement/starGreen.png");
        this.game.load.image("starBlue", "assets/achievement/starBlue.png");
        this.game.load.image("starPurple", "assets/achievement/starPurple.png");
        this.game.load.image("starRed", "assets/achievement/starRed.png");

        this.game.load.image("coin", "assets/coin.png");
        this.game.load.image("info_find", "assets/info/info_find.jpg");
        this.game.load.image("info_scramble", "assets/info/info_scramble.jpg");

        //this.load.audio('track', ['assets/track.mp3']);

    },
    create: function () {
        getLocalSave();
        this.game.state.start('MainMenu');
    }
};

function getLocalSave() {

    var result = localStorage.getItem("magicwords");

    if (result === null || result === undefined) {
        localStorage.setItem("magicwords", JSON.stringify({
            "find": 0,
            "scramble": 0,
            "bestScore": {
                "find": 0,
                "scramble": 0
            }
        }));
    } else {
        reg.mainScore = JSON.parse(result);
    }
}