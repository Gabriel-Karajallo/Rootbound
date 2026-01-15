import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Aquí irán cargas de assets más adelante
  }

  create() {
    console.log("BootScene iniciada");
    this.scene.start("MenuScene");
  }

  
}
