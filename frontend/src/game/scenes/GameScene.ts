import Phaser from "phaser";
import { Nox } from "../entities/Nox";

export class GameScene extends Phaser.Scene {
  private nox!: Nox;
  private suelo!: Phaser.GameObjects.Rectangle;

  constructor() {
    super("GameScene");
  }

  preload() {
    // Assets
    this.load.image("nox", "assets/player/nox_idle.png");
  }

  create() {
    // ─────────────────────────────
    // 1. Suelo visible + físico (UNO SOLO)
    // ─────────────────────────────
    this.suelo = this.add.rectangle(2000, 600, 4000, 80, 0x2e2e2e);
    this.physics.add.existing(this.suelo, true);

    // ─────────────────────────────
    // 2. Crear a Nox
    // ─────────────────────────────
    this.nox = new Nox(this, 200, 300);

    // ─────────────────────────────
    // 3. Colisión Nox ↔ Suelo
    // ─────────────────────────────
    this.physics.add.collider(this.nox, this.suelo);

    // ─────────────────────────────
    // 4. Cámara lateral
    // ─────────────────────────────
    this.cameras.main.startFollow(this.nox, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(100, 200);
    this.cameras.main.setBounds(0, 0, 4000, 800);
  }

  update() {
    this.nox.update();
  }
}
