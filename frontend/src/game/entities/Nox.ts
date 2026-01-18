import Phaser from "phaser";

export class Nox extends Phaser.Physics.Arcade.Sprite {
  // Input
  private cursores!: Phaser.Types.Input.Keyboard.CursorKeys;
  private teclaA!: Phaser.Input.Keyboard.Key;
  private teclaD!: Phaser.Input.Keyboard.Key;
  private teclaSalto!: Phaser.Input.Keyboard.Key;

  // Movimiento
  private velocidadMovimiento = 260;

  // Salto
  private fuerzaSalto = 520;

  // Gravedad
  private gravedadNormal = 1400;
  private gravedadReducida = 800;

  // Salto variable
  private tiempoSaltoMaximo = 120; // ms
  private tiempoSaltoActual = 0;
  private estaSaltando = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "nox");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Escala visual
    this.setScale(0.4);

    // Física base
    this.setGravityY(this.gravedadNormal);
    this.setCollideWorldBounds(true);

    const body = this.body as Phaser.Physics.Arcade.Body;

    // 🔥 HITBOX AJUSTADA (clave)
    body.setSize(22, 34);      // más estrecha y baja
    body.setOffset(21, 30);    // pies bien apoyados

    // Input
    const teclado = scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin;
    this.cursores = teclado.createCursorKeys();
    this.teclaA = teclado.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.teclaD = teclado.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.teclaSalto = teclado.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    // ───────── MOVIMIENTO HORIZONTAL ─────────
    body.setVelocityX(0);

    if (this.teclaA.isDown || this.cursores.left?.isDown) {
      body.setVelocityX(-this.velocidadMovimiento);
      this.setFlipX(true);
    } else if (this.teclaD.isDown || this.cursores.right?.isDown) {
      body.setVelocityX(this.velocidadMovimiento);
      this.setFlipX(false);
    }

    // ───────── INICIO DE SALTO ─────────
    if (
      Phaser.Input.Keyboard.JustDown(this.teclaSalto) &&
      body.blocked.down
    ) {
      body.setVelocityY(-this.fuerzaSalto);
      body.setGravityY(this.gravedadReducida);

      this.estaSaltando = true;
      this.tiempoSaltoActual = 0;
    }

    // ───────── SALTO VARIABLE ─────────
    if (this.teclaSalto.isDown && this.estaSaltando) {
      this.tiempoSaltoActual += this.scene.game.loop.delta;

      if (this.tiempoSaltoActual > this.tiempoSaltoMaximo) {
        this.estaSaltando = false;
        body.setGravityY(this.gravedadNormal);
      }
    }

    // ───────── CORTE DE SALTO ─────────
    if (
      Phaser.Input.Keyboard.JustUp(this.teclaSalto) ||
      body.velocity.y > 0
    ) {
      this.estaSaltando = false;
      body.setGravityY(this.gravedadNormal);
    }

    // ───────── CAÍDA PESADA ─────────
    if (body.velocity.y > 0) {
      body.setGravityY(this.gravedadNormal * 1.25);
    }
  }
}
