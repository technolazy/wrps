reg = {
    score: (localStorage.getItem('bestScore') === undefined) ? localStorage.getItem('bestScore') : 0,
    mainScore: {
        "find": 0,
        "scramble": 0,
        "bestScore": {
            "find": 0,
            "scramble": 0
        }
    },
    selectedLang: "en",
    letters_alphabet: 'abcdefghijklmnoprstuvwy',
    sound: true,
    animationSpeed: 5000,
    creationSpeed: 1600,
    pointsRate: {
        "bronze": 10,
        "silver": 15,
        "gold": 20
    },
    currentCorrectAnswers: [],
    currentWord: "",
    currentPuzzle: [],
    foundWords: [],
    modal: {

    },
    achievements: {

    },
    easings: [
    Phaser.Easing.Cubic.InOut,
    Phaser.Easing.Sinusoidal.In,
    Phaser.Easing.Quadratic.InOut,
    Phaser.Easing.Quartic.Out,
    Phaser.Easing.Linear,
    Phaser.Easing.Cubic.In,
    Phaser.Easing.Quintic.Out,
    Phaser.Easing.Quintic.InOut
    ],
    mainEasing: Phaser.Easing.Cubic.InOut,
    currentMode: "scramble",
    currentLevel: 1,
    currentWave: 0,
    currentSpeed: 0,
    currentSpell: {
        "school": "fire",
        "dmg": 1,
        "special": "normal",
        "objName": "speach_fire",
        "charges": -1
    },
    spells: [
        {
            "school": "fire",
            "dmg": 1,
            "special": "normal",
            "objName": "speach_fire",
            "charges": -1
        },
        {
            "school": "ice",
            "dmg": 1,
            "special": "slow",
            "objName": "speach_ice",
            "charges": 0,
            "effectColor": "0x00ddff"
        },
        {
            "school": "lightning",
            "dmg": 1,
            "special": "stun",
            "objName": "speach_lightning",
            "charges": 0
        },
        {
            "school": "nature",
            "dmg": 2,
            "special": "double",
            "objName": "speach_nature",
            "charges": 0
        }
    ],
    monsterTypes: [
    "monster A/walk/frame-1",
    "monster B/walk/frame-1",
    "monster C/walk/frame-1",
    "monster D/walk/frame-1",
    "monster E/walk/frame-1",
    "monster F/walk/frame-1",
    "monster G/walk/frame-1",
    "monster H/walk/frame-1",
    "monster I/walk/frame-1"
    ],
    enemies: {
        category1: {
            "asset": ["monster A/walk/frame-1", "monster B/walk/frame-1", "monster C/walk/frame-1", "monster D/walk/frame-1", "monster E/walk/frame-1", "monster F/walk/frame-1", "monster G/walk/frame-1", "monster H/walk/frame-1", "monster I/walk/frame-1"],
            "health": 3,
            "speed": 60
        },
        category2: {
            "asset": ["enemy3", "enemy4"],
            "health": 4,
            "speed": 20
        },
        category3: {
            "asset": ["enemy4", "enemy5"],
            "health": 6,
            "speed": 20
        },
        category4: {
            "asset": ["enemy6"],
            "health": 2,
            "speed": 20
        },
        category5: {
            "asset": ["enemy7"],
            "health": 10,
            "speed": 20
        }
    },
    currentLeague: "bronze",
    currentChapter: 0,
    backgrounds: {
        "level1": "bg1",
        "level2": "bg2",
        "level3": "bg3",
        "level4": "bg4",
        "level5": "bg5",
    },
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    orientationsAll: [
        "horizontal",
        "horizontalBack",
        "vertical",
        "verticalUp",
        "diagonal",
        "diagonalUp",
        "diagonalBack",
        "diagonalUpBack"
    ],
    rows: {
        bronze: 8,
        silver: 9,
        gold: 10
    },
    columns: {
        bronze: 14,
        silver: 16,
        gold: 18
    },
    orientations: {
        bronze: [
            "horizontal",
        ],
        silver: [
            "horizontal",
            "vertical"
        ],
        gold: [
            "horizontal",
            "horizontalBack",
            "vertical",
            "verticalUp"
        ]
    },
    wordLengthBase:2,
    levelEditor: {
        "bronze": {
            enemiesMovementPerLevel: 50,
            levelsPerLeague: 10,
            leagues: 1,
            leagueNames: ["BRONZE"],
            difficulty: "bronze",
            status: "unlocked",
            chapters: [
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                }
            ]
        },
        "silver": {
            enemiesMovementPerLevel: 60,
            levelsPerLeague: 10,
            leagues: 1,
            leagueNames: ["SILVER"],
            difficulty: "silver",
            status: "locked",
            chapters: [
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                }
            ]
        },
        "gold": {
            enemiesMovementPerLevel: 70,
            levelsPerLeague: 10,
            leagues: 4,
            leagueNames: ["BRONZE", "SILVER", "GOLD", "PLATINUM"],
            difficulty: "gold",
            status: "locked",
            chapters: [
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                },
                {
                    status: "unlocked",
                    score: 0,
                }
            ]
        }
    }
};