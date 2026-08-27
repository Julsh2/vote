import * as Screens from "../screens/index.js";


class Game {

   constructor() {
    this.homeScreen = new HomeScreen();
   }

   draw() {
        this.homeScreen.draw();
    }


}

