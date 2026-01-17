import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  private opcionSeleccionada = 0;
  private opcionesTexto: Phaser.GameObjects.Text[] = [];
  private musicaMenu!: Phaser.Sound.BaseSound;
  private inputBloqueado = false;

  constructor() {
    super("MenuScene");
  }

  preload() {
    // Fondo del menú
    this.load.image("fondoMenu", "assets/menu/fondo_menu2.png");

    // Logo principal
    this.load.image("menuPrincipal", "assets/menu/logo.png");

    // Sonidos UI
    this.load.audio("uiSeleccion", "assets/audio/ui/seleccion.ogg");
    this.load.audio("uiConfirmar", "assets/audio/ui/confirmar.ogg");

    // Música del menú
    this.load.audio("musicaMenu", "assets/audio/music/menu.ogg");

  }

  create() {
    const { width, height } = this.scale;

    // Fondo negro base
    this.cameras.main.setBackgroundColor("#000000");

    this.cameras.main.fadeIn(800, 0, 0, 0);

    // =========================
    // FONDO DEL MENÚ
    // =========================
    const fondo = this.add
      .image(width / 2, height / 2, "fondoMenu")
      .setDepth(0);

    // Blur suave del fondo
    fondo.preFX?.addBlur(2, 2, 1, 0.5);

    const scaleX = width / fondo.width;
    const scaleY = height / fondo.height;
    fondo.setScale(Math.max(scaleX, scaleY));

    // =========================
    // OVERLAY OSCURO
    // =========================
    this.add
      .rectangle(0, 0, width * 2, height * 2, 0x000000, 0.55)
      .setOrigin(0)
      .setDepth(1);

      

    // =========================
    // LOGO
    // =========================
    this.add
      .image(width / 2, height * 0.28, "menuPrincipal")
      .setScale(0.45)
      .setDepth(2);

    // =========================
    // SONIDOS
    // =========================
    const sonidoSeleccion = this.sound.add("uiSeleccion", { volume: 0.25 });
    const sonidoConfirmar = this.sound.add("uiConfirmar", { volume: 0.35 });

    // Música del menú (audio ya desbloqueado en IntroScene)
    this.musicaMenu = this.sound.add("musicaMenu", {
      loop: true,
      volume: 0.2,
    });
    this.musicaMenu.play();

    // =========================
    // OPCIONES DE MENÚ
    // =========================
    const opciones = ["NUEVA PARTIDA", "OPCIONES"];

    opciones.forEach((texto, index) => {
      const opcion = this.add
        .text(width / 2, height * 0.62 + index * 42, texto, {
          fontSize: "22px",
          color: "#555555",
        })
        .setOrigin(0.5)
        .setDepth(3);

      opcion.setShadow(0, 0, "#6ecbff", 0, false, false);
      this.opcionesTexto.push(opcion);
    });

    this.actualizarSeleccion();

    // =========================
    // INPUT TECLADO
    // =========================
    this.input.keyboard?.on("keydown-UP", () => {
      if (this.inputBloqueado) return;
      this.opcionSeleccionada =
        (this.opcionSeleccionada - 1 + opciones.length) % opciones.length;

      sonidoSeleccion.play({ seek: 0 });
      this.actualizarSeleccion();
    });

    this.input.keyboard?.on("keydown-DOWN", () => {
      if (this.inputBloqueado) return;
      this.opcionSeleccionada =
        (this.opcionSeleccionada + 1) % opciones.length;

      sonidoSeleccion.play({ seek: 0 });
      this.actualizarSeleccion();
    });

    this.input.keyboard?.on("keydown-ENTER", () => {
      if (this.inputBloqueado) return;
      sonidoConfirmar.play({ seek: 0 });
      this.ejecutarOpcionSeleccionada();
    });
  }

  // =========================
  // FEEDBACK VISUAL
  // =========================
  private actualizarSeleccion() {
    this.opcionesTexto.forEach((opcion, index) => {
      if (index === this.opcionSeleccionada) {
        opcion.setColor("#ffffff");
        opcion.setShadow(0, 0, "#6ecbff", 8, false, true);
      } else {
        opcion.setColor("#555555");
        opcion.setShadow(0, 0, "#6ecbff", 0, false, false);
      }
    });
  }

  // =========================
  // ACCIONES
  // =========================
  private ejecutarOpcionSeleccionada() {
    switch (this.opcionSeleccionada) {
      case 0:
  this.inputBloqueado = true;

  // Fade out visual
  this.cameras.main.fadeOut(800, 0, 0, 0);

  // Fade out de música
  this.tweens.add({
    targets: this.musicaMenu,
    volume: 0,
    duration: 800,
    ease: "Sine.easeInOut",
  });

  // Cuando termina el fade visual, cambiamos de escena
 this.cameras.main.once(
  Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
  () => {
    this.musicaMenu.stop();

    // Entrar a la narrativa
    this.scene.start("IntroNarrativeScene");
  }
);
    break;

        case 1:
          console.log("Opciones (pendiente)");
          break;
      }
  }
}
