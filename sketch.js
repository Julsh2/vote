import Game from "./game/game.js";

let game 

function setup () {
createCanvas(windowWidth, windowHeight);

    game = new Game();
}

window.setup = setup;

function draw() {
    game.draw();
}

window.draw = draw;