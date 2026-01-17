import Phaser from "phaser";

export class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  create() {
    const { width, height } = this.scale;

    // Fondo negro absoluto
    this.cameras.main.setBackgroundColor("#000000");

    // =========================
    // TEXTO PRINCIPAL
    // =========================
    const textoInicio = this.add
      .text(width / 2, height / 2, "PULSA ENTER PARA EMPEZAR", {
        fontSize: "20px",
        color: "#aaaaaa",
        letterSpacing: 2,
      })
      .setOrigin(0.5);

    // Parpadeo suave
    this.tweens.add({
      targets: textoInicio,
      alpha: { from: 0.4, to: 1 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // =========================
    // AVISO PANTALLA COMPLETA
    // =========================
    this.add
  .text(
    width / 2,
    height * 0.72,
    "Se recomienda poner la pantalla completa para una mejor experiencia",
    {
      fontSize: "18px",
      color: "#888888",
    }
  )
  .setOrigin(0.5);

    // =========================
    // INPUT ENTER
    // =========================
    this.input.keyboard?.once("keydown-ENTER", () => {
      // Desbloqueo de audio (clave en web)
      this.sound.unlock();

      // Fade suave a negro
      this.cameras.main.fadeOut(600, 0, 0, 0);

      // Cuando termina el fade, entramos al menú
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        () => {
          this.scene.start("MenuScene");
        }
      );
    });
  }
}
