import Phaser from "phaser";
import { Nox } from "../entities/Nox";

export class GameScene extends Phaser.Scene {
  private nox!: Nox;
  private plataformas!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("nox", "assets/player/nox_idle.png");

    // Textura blanca 1x1 para plataformas greybox
    this.load.image("bloque", "assets/debug/bloque.png");
  }

  create() {
    // ─────────────────────────────
    // 1. Grupo de plataformas (TODO el nivel)
    // ─────────────────────────────
    this.plataformas = this.physics.add.staticGroup();

    // Suelo principal
    this.plataformas.create(1800, 600, "bloque").setScale(3600, 100).setTint(0x2e2e2e).refreshBody();

    // Plataformas elevadas
    this.plataformas.create(900, 480, "bloque").setScale(300, 40).setTint(0x3a3a3a).refreshBody();

    this.plataformas.create(1400, 420, "bloque").setScale(300, 40).setTint(0x3a3a3a).refreshBody();

    this.plataformas
      .create(1900, 500, "bloque")
      .setScale(300, 40)
      .setTint(0x3a3a3a)
      .refreshBody();

    // ─────────────────────────────
    // 2. Crear a Nox
    // ─────────────────────────────
    this.nox = new Nox(this, 200, 300);

    // Colisión Nox ↔ Plataformas
    this.physics.add.collider(this.nox, this.plataformas);

    // ─────────────────────────────
    // 3. Pozo final (solo visual)
    // ─────────────────────────────
    this.add
      .image(3600, 720, "bloque")
      .setScale(400, 300)
      .setTint(0x1a1a1a);

    // ─────────────────────────────
    // 4. Cámara
    // ─────────────────────────────
    this.cameras.main.startFollow(this.nox, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(100, 200);
    this.cameras.main.setBounds(0, 0, 4000, 800);
  }

  update() {
    this.nox.update();
  }
}
