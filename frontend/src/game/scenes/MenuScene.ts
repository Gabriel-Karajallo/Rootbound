import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#220022");

    this.add.text(100, 100, "PHASER FUNCIONA", {
      fontSize: "32px",
      color: "#ffffff"
    });
  }
}
