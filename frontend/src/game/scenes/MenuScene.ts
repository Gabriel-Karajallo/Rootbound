import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  private opcionSeleccionada = 0;
  private opcionesTexto: Phaser.GameObjects.Text[] = [];

  constructor() {
    super("MenuScene");
  }

  preload() {
    // Fondo del menú
    this.load.image("fondoMenu", "assets/menu/fondo_menu.png");

    // Logo principal
    this.load.image("menuPrincipal", "assets/menu/logo.png");

    // Sonido de selección
    this.load.audio("uiSeleccion", "assets/audio/ui/seleccion.ogg");
  }

  create() {
    const { width, height } = this.scale;

    // Fondo negro base
    this.cameras.main.setBackgroundColor("#000000");

    // =========================
    // FONDO DEL MENÚ
    // =========================
    const fondo = this.add
      .image(width / 2, height / 2, "fondoMenu")
      .setDepth(0);

    // Ajuste para cubrir pantalla manteniendo proporción
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
    // SONIDO
    // =========================
    const sonidoSeleccion = this.sound.add("uiSeleccion", {
      volume: 0.25,
      rate: 1,
    });

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

      // Shadow base apagado
      opcion.setShadow(0, 0, "#6ecbff", 0, false, false);

      this.opcionesTexto.push(opcion);
    });

    this.actualizarSeleccion();

    // =========================
    // INPUT TECLADO
    // =========================
    this.input.keyboard?.on("keydown-UP", () => {
      this.opcionSeleccionada =
        (this.opcionSeleccionada - 1 + opciones.length) % opciones.length;

      sonidoSeleccion.stop();
      sonidoSeleccion.play({ seek: 0 });

      this.actualizarSeleccion();
    });

    this.input.keyboard?.on("keydown-DOWN", () => {
      this.opcionSeleccionada =
        (this.opcionSeleccionada + 1) % opciones.length;

      sonidoSeleccion.stop();
      sonidoSeleccion.play();

      this.actualizarSeleccion();
    });

    this.input.keyboard?.on("keydown-ENTER", () => {
      this.seleccionarOpcion();
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
  private seleccionarOpcion() {
    switch (this.opcionSeleccionada) {
      case 0:
        this.scene.start("GameScene");
        break;

      case 1:
        console.log("Opciones (pendiente)");
        break;
    }
  }
}
