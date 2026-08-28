import * as Screens from "../screens/index.js";
import GameState from "./gamestate.js";

class Game {

    constructor(fontHome) {

        this.state = GameState.HOME;

        this.homeScreen = new Screens.HomeScreen(fontHome);

    }

    draw() {

        if (this.state === GameState.HOME) {

            this.homeScreen.draw();

        }

    }

}

export default Game;
