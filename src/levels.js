GAME.Levels = function (game) {
    this.selectedWrapper = 0;
    this.wrapperWidth = 495;
};

GAME.Levels.prototype = {
    create: function () {

        this.add.image(0, 0, 'bg1');
        this.mainTitle = this.add.image((game.width / 2) - (190 / 2) + 10, 40, "levelTitle");
        var panel = this.add.image(game.width / 2 - (515 / 2), game.height / 2 - (299 / 2) + 40, "levelPanel");

        this.word_find = this.add.button(panel.x, 160, "word_find_button", this.wordFind, this);
        this.word_scramble = this.add.button(panel.x + panel.width - 200 * 0.8, 160, "word_scramble_button", this.wordScramble, this);

        this.word_find.scale.setTo(0.8, 0.8);
        this.word_scramble.scale.setTo(0.8, 0.8);

        this.menuButton = this.add.button((game.width / 2) - 53, game.height - 150, 'menuBack', this.startMenu, this);

        var easy = this.add.button(panel.x + (panel.width / 2 - 344 / 2), panel.y + 20, "button_easy", this.easyLevel, this);
        var moderate = this.add.button(easy.x, easy.y + easy.height + 20, "button_moderate", this.moderateLevel, this);
        var hard = this.add.button(moderate.x, moderate.y + moderate.height + 20, "button_hard", this.hardLevel, this);

        this.arrowR = this.add.image(game.width/2 - 50, 160, "arrowR");
        this.arrowR.alpha = 0;
        this.arrowL = this.add.image(game.width/2 - 50, 160, "arrowL");
        this.arrowL.alpha = 0;

        this.wordFind();
        // TODO: make these buttons
        /*this.prev = this.add.button(panel.x + 20, panel.y + panel.height - (82 / 2), "prevButton", this.prevButton, this);

        this.next = this.add.button(panel.width + panel.x - 100, panel.y + panel.height - (82 / 2), "nextButton", this.nextButton, this);

        this.menuButton = this.add.button((game.width / 2) - 41, game.height - 180, 'menuBack', this.startMenu, this);

        // buttons init
        this.prev.alpha = 0;

        this.container = this.add.sprite(panel.x + 20, panel.y + 20);
        this.container.anchor.setTo(0.5, 0.5);
        this.container.cropEnabled = true;
        //this.container.width = 515 - 20;
        this.container.x = panel.x + 20;
        this.container.y = panel.y + 20;


        var baseDifficulty = "bronze";
        this.options = reg.levelEditor[baseDifficulty];


        for (var i = 0; i < this.options.chapters.length; i++) {
            var _wrapper = this.add.sprite(0, 0);
            _wrapper.width = this.wrapperWidth;
            _wrapper.x = 0;
            _wrapper.scale.setTo(1, 1);
            _wrapper.id = "wrapper_" + i;
            this.container.addChild(_wrapper);
        }

        var title;
        var stars;
        var play;
        var replay;
        var share;
        var wrapper;

        for (var j = 0; j < this.options.chapters.length; j++) {
            wrapper = this.container.getChildAt(j);

            title = game.add.bitmapText(0, 0, 'fontYellow', "Chapter " + String(j + 1), 38);
            title.scale.setTo(1, 1);
            //TODO: ADD IF FOR DISABLED
            if (this.options.chapters[j].score > 0) {
                stars = game.add.image((this.wrapperWidth / 2) - (162 / 2), 60, 'simpleStars');
            } else {
                stars = game.add.image((this.wrapperWidth / 2) - (162 / 2), 60, 'simpleStarsDisabled');
            }
            play = game.add.button((this.wrapperWidth / 2) - 84, 279 - 135, 'playButton', this.startGame, this);
            share = game.add.button((this.wrapperWidth / 2) + 20, (279 - 135), 'shareButton', this.shareProgress, this);

            title.update();
            title.x = (this.wrapperWidth / 2) - (title.width / 2);
            title.y = 10;

            wrapper.addChild(title);
            wrapper.addChild(stars);
            wrapper.addChild(play);
            wrapper.addChild(share);

            if (j === 0) {
                wrapper.active = true;
            } else {
                wrapper.active = false;
                wrapper.alpha = 0;
            }
        }*/

    },
    wordScramble: function () {
        this.word_find.loadTexture("word_find_button_disabled");
        this.word_scramble.loadTexture("word_scramble_button");
        this.arrowR.alpha = 1;
        this.arrowL.alpha = 0;
        reg.currentMode = "scramble";
    },
    wordFind: function () {
        this.word_scramble.loadTexture("word_scramble_button_disabled");
        this.word_find.loadTexture("word_find_button");
        this.arrowL.alpha = 1;
        this.arrowR.alpha = 0;
        reg.currentMode = "find";
    },
    easyLevel: function () {
        reg.baseDifficulty = "bronze";
        game.state.start('Game');
    },
    moderateLevel: function () {
        reg.baseDifficulty = "silver";
        game.state.start('Game');
    },
    hardLevel: function () {
        reg.baseDifficulty = "gold";
        game.state.start('Game');
    },
    startMenu: function () {

        game.state.start('MainMenu');
    },
    prevButton: function () {

        if (this.selectedWrapper - 1 < 0) {
            this.prev.alpha = 0;
            return false;
        } else {
            this.next.alpha = 1;
            this.selectedWrapper -= 1;

            if (this.selectedWrapper === 0) {
                this.prev.alpha = 0;
            }

            var prevChild = this.container.getChildAt(this.selectedWrapper + 1);
            prevChild.active = false;
            prevChild.alpha = 0;
            var child = this.container.getChildAt(this.selectedWrapper);
            child.active = true;
            child.alpha = 1;
        }
    },
    nextButton: function () {
        //window.console.log("next button clicked");
        if ((this.selectedWrapper + 1) > (this.container.children.length - 1)) {
            this.next.alpha = 0;
            return false;
        } else {
            this.prev.alpha = 1;
            this.selectedWrapper += 1;

            if (this.selectedWrapper === this.options.chapters.length - 1) {
                this.next.alpha = 0;
            }

            //this.container.x = this.wrapperWidth * this.selectedWrapper;
            var prevChild = this.container.getChildAt(this.selectedWrapper - 1);
            prevChild.active = false;
            prevChild.alpha = 0;
            var child = this.container.getChildAt(this.selectedWrapper);
            child.active = true;
            child.alpha = 1;
        }

    },
    startMenu: function () {
        game.state.start('MainMenu');
    },
    startGame: function () {
        reg.currentChapter = this.selectedWrapper;
        game.state.start('Game');
    },
    update: function () {
        // this.container.updateCrop();
    }
};