import Phaser from "phaser";
import { Nox } from "../entities/Nox";

export class GameScene extends Phaser.Scene {
  private nox!: Nox;
  private suelo!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("GameScene");
  }

  preload() {
    // Personaje
    this.load.image("nox", "assets/player/nox_idle.png");

    // Suelo provisional
    this.load.image("suelo", "assets/world/suelo_debug.png");
  }

  create() {
    // 1. Crear suelo
    this.suelo = this.physics.add.staticGroup();

    this.suelo.create(400, 580, "suelo")
      .setScale(2)
      .refreshBody();

    // 2. Crear a Nox
    this.nox = new Nox(this, 200, 300);

    // 3. Colisiones
    this.physics.add.collider(this.nox, this.suelo);

    // 4. Cámara
    this.cameras.main.startFollow(this.nox);
    this.cameras.main.setZoom(1.2);
    this.cameras.main.setBounds(0, 0, 1600, 600);
  }

 update() {
  this.nox.update();
}
}
