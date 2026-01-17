import Phaser from "phaser";

export class Nox extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "nox");

    // Añadir a la escena
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configuración básica de físicas
    this.setCollideWorldBounds(true);
  }

  update() {
    // Vacío por ahora
  }
}
