import Game from "./game/game.js";

let game 

function setup () {
createCanvas(windowWidth, windowHeight);

    game = new Game();
}


function draw() {
    game.draw();
}