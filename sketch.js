import Game from "./game/game.js";

let game 

let fontHome;

function preload() {
    fontHome = loadFont("assets/fonts/magicprince.otf");
}

window.preload = preload;

function setup () {
createCanvas(windowWidth, windowHeight);

    game = new Game(fontHome);
}

window.setup = setup;

function draw() {
    game.draw();
}

window.draw = draw;