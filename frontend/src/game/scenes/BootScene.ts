import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Más adelante cargaremos aquí assets
  }

  create() {
    console.log("BootScene iniciada");
    this.scene.start("MenuScene");
  }
}
