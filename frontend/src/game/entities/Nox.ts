import Phaser from "phaser";

export class Nox extends Phaser.Physics.Arcade.Sprite {
  // Input
  private cursores!: Phaser.Types.Input.Keyboard.CursorKeys;
  private teclaA!: Phaser.Input.Keyboard.Key;
  private teclaD!: Phaser.Input.Keyboard.Key;

  // Configuración
  private velocidadMovimiento = 200;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "nox");

    // Añadir a escena y físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Tamaño visual
    this.setScale(0.4);

    // Física básica
    this.setGravityY(800);
    this.setCollideWorldBounds(true);

    // Ajuste del cuerpo físico
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(32, 48);
    body.setOffset(16, 16);

    // ─────────────────────────────
    // Input (type assertion)
    // ─────────────────────────────
    const teclado = scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin;

    this.cursores = teclado.createCursorKeys();
    this.teclaA = teclado.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.teclaD = teclado.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    // Parar por defecto
    body.setVelocityX(0);

    // Izquierda (A o ←)
    if (this.teclaA.isDown || this.cursores.left?.isDown) {
      body.setVelocityX(-this.velocidadMovimiento);
      this.setFlipX(true);
    }

    // Derecha (D o →)
    else if (this.teclaD.isDown || this.cursores.right?.isDown) {
      body.setVelocityX(this.velocidadMovimiento);
      this.setFlipX(false);
    }
  }
}
