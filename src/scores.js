GAME.Scores = function (game) {};

GAME.Scores.prototype = {
    create: function () {
        this.add.image(0, 0, 'bg1');

        checkTotalScore();
        checkTotalAchievements();

        this.add.image(game.width/2 - 162/2, 170, "simpleStars");
        var gameScoreLabel = this.add.bitmapText(0 , 0, "fontYellow", 'Best Scores!', 68);

        gameScoreLabel.update();
        gameScoreLabel.x = (game.width / 2) - (gameScoreLabel.width / 2);
        gameScoreLabel.y = 80;

        this.menuButton = this.add.button((game.width/2) - 53, game.height - 150, 'menuBack', this.startMenu, this);

        ///////////////////////////
        var findBestScore = String("Word Find Best - "+reg.mainScore.bestScore['find']);
        var scrambleBestScore = String("Word Scramble Best - "+String(reg.mainScore.bestScore['scramble']));
        this.word_find = this.add.bitmapText(0, 0, "fontOrange", findBestScore, 52);
        this.word_scramble = this.add.bitmapText(0, 0, "fontOrange", scrambleBestScore, 52);

        this.word_find.update();
        this.word_scramble.update();

        this.word_find.x = game.width/2 - (this.word_find.width/2);
        this.word_find.y = game.height/2 - (this.word_find.height/2);

        this.word_scramble.x = game.width/2 - (this.word_scramble.width/2);
        this.word_scramble.y = game.height/2 - (this.word_scramble.height/2) - 100;

         // add achievement stars
        var findScore = reg.mainScore.bestScore['find'];
        var scrambleScore = reg.mainScore.bestScore['scramble'];

        var findStar;
        var scrambleStar;
        if(findScore >= 0 && findScore < 100) {
            findStar = this.add.image(this.word_find.x - 115*0.6-10, this.word_find.y-10, "starYellow");
        }
        else if(findScore >= 100 && findScore < 500) {
            findStar = this.add.image(this.word_find.x - 115*0.6-10, this.word_find.y-10, "starGreen");
        }
        else if(findScore >= 500 && findScore < 1000) {
            findStar = this.add.image(this.word_find.x - 115*0.6-10, this.word_find.y-10, "starBlue");
        }
        else if(findScore >= 1000 && findScore < 2000) {
            findStar = this.add.image(this.word_find.x - 115*0.6-10, this.word_find.y-10, "starPurple");
        }
        else if(findScore >= 2000) {
            findStar = this.add.image(this.word_find.x - 115*0.6-10, this.word_find.y-10, "starRed");
        }

        findStar.scale.setTo(0.6, 0.6);

        if(scrambleScore >= 0 && scrambleScore < 100) {
            scrambleStar = this.add.image(this.word_scramble.x - 115*0.6-10, this.word_scramble.y-10, "starYellow");
        }
        else if(scrambleScore >= 100 && scrambleScore < 500) {
            scrambleStar = this.add.image(this.word_scramble.x - 115*0.6-10, this.word_scramble.y-10, "starGreen");
        }
        else if(scrambleScore >= 500 && scrambleScore < 1000) {
            scrambleStar = this.add.image(this.word_scramble.x - 115*0.6-10, this.word_scramble.y-10, "starBlue");
        }
        else if(scrambleScore >= 1000 && scrambleScore < 2000) {
            scrambleStar = this.add.image(this.word_scramble.x - 115*0.6-10, this.word_scramble.y-10, "starPurple");
        }
        else if(scrambleScore >= 2000) {
            scrambleStar = this.add.image(this.word_scramble.x - 115*0.6-10, this.word_scramble.y-10, "starRed");
        }

        scrambleStar.scale.setTo(0.6, 0.6);

        ///////////////////////////////////////////////////////////////

        var yellowStarScore = this.add.bitmapText(game.width - 150, game.height - 280,'fontOrange', "0 - 100", 20);
        yellowStarScore.update();
        yellowStarScore.updateText();

        var greenStarScore = this.add.bitmapText(game.width - 150, yellowStarScore.y+yellowStarScore.height+15,'fontOrange', "100 - 500", 20);
        greenStarScore.update();
        greenStarScore.updateText();


        var blueStarScore = this.add.bitmapText(game.width - 150, greenStarScore.y+greenStarScore.height+15,'fontOrange', "500 - 1000", 20);
        blueStarScore.update();
        blueStarScore.updateText();

        var purpleStarScore = this.add.bitmapText(game.width - 150, blueStarScore.y+blueStarScore.height+15,'fontOrange', "1000 - 2000", 20);
        purpleStarScore.update();
        purpleStarScore.updateText();

        var redStarScore = this.add.bitmapText(game.width - 150, purpleStarScore.y+purpleStarScore.height+15,'fontOrange', "2000 +", 20);
        redStarScore.update();

        this.add.image(game.width-200, yellowStarScore.y - 8, 'starYellow').scale.setTo(0.32);
        this.add.image(game.width-200, greenStarScore.y - 8, 'starGreen').scale.setTo(0.32);
        this.add.image(game.width-200, blueStarScore.y - 8, 'starBlue').scale.setTo(0.32);
        this.add.image(game.width-200, purpleStarScore.y - 8, 'starPurple').scale.setTo(0.32);
        this.add.image(game.width-200, redStarScore.y - 8, 'starRed').scale.setTo(0.32);

        },
        hide: function () {

        },
        startMenu: function () {
            game.state.start('MainMenu');
        }
    };

    function checkStatus(value) {
        if(value.status === "closed") {
            return '#a0a0a0';
        }
        else {
            return '#D70000';
        }
    }

    function checkTotalScore() {

    }

    function checkTotalAchievements() {


    }