import Phaser from "phaser";

export class IntroNarrativeScene extends Phaser.Scene {
  private textos: string[] = [
    "El mundo no colapsó.",
    "Se sostuvo… en la superficie.",
    "Debajo, algo respondió.",
    "Y para contenerlo… alguien debía descender.",
  ];

  private indiceTexto = 0;
  private textoActual!: Phaser.GameObjects.Text;

  constructor() {
    super("IntroNarrativeScene");
  }

  create() {
    console.log("INTRO NARRATIVE ACTIVA");

    const camera = this.cameras.main;

    camera.resetFX();
    camera.setAlpha(1);
    camera.setVisible(true);
    camera.setBackgroundColor("#000000");

    this.mostrarSiguienteTexto();
  }

  private mostrarSiguienteTexto() {
    if (this.indiceTexto >= this.textos.length) {
      this.time.delayedCall(800, () => {
        this.scene.start("GameScene");
      });
      return;
    }

    this.textoActual = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        this.textos[this.indiceTexto],
        {
          fontSize: "22px",
          color: "#dddddd",
          letterSpacing: 1.5,
        }
      )
      .setOrigin(0.5)
      .setDepth(100);

    this.tweens.add({
      targets: this.textoActual,
      alpha: { from: 0, to: 1 },
      duration: 1800,
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.time.delayedCall(1800, () => {
          this.ocultarTexto();
        });
      },
    });
  }

  private ocultarTexto() {
    this.tweens.add({
      targets: this.textoActual,
      alpha: 0,
      duration: 1800,
      ease: "Sine.easeInOut",
      onComplete: () => {
        this.textoActual.destroy();
        this.indiceTexto++;
        this.mostrarSiguienteTexto();
      },
    });
  }
}
