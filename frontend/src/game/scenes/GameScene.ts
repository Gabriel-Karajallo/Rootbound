import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#111111");

    this.add
      .text(640, 360, "GAME START", {
        fontSize: "32px",
        color: "#ffffff"
      })
      .setOrigin(0.5);
  }
}
