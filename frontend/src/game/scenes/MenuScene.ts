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
  }

  create() {
    const { width, height } = this.scale;

    // =========================
    // FONDO DEL MENÚ
    // =========================
    const fondo = this.add
      .image(width / 2, height / 2, "fondoMenu")
      .setDepth(0);

    // Ajuste para cubrir pantalla manteniendo proporción
    const scaleX = width / fondo.width;
    const scaleY = height / fondo.height;
    const scale = Math.max(scaleX, scaleY);
    fondo.setScale(scale);

    // =========================
    // OVERLAY OSCURO (muy importante)
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
    // OPCIONES DE MENÚ
    // =========================
    const opciones = ["NUEVA PARTIDA", "OPCIONES"];

    opciones.forEach((texto, index) => {
      const opcion = this.add
        .text(width / 2, height * 0.62 + index * 42, texto, {
          fontSize: "22px",
          color: "#666666",
        })
        .setOrigin(0.5)
        .setDepth(3);

      this.opcionesTexto.push(opcion);
    });

    this.actualizarSeleccion();

    // =========================
    // INPUT TECLADO
    // =========================
    this.input.keyboard?.on("keydown-UP", () => {
      this.opcionSeleccionada =
        (this.opcionSeleccionada - 1 + opciones.length) % opciones.length;
      this.actualizarSeleccion();
    });

    this.input.keyboard?.on("keydown-DOWN", () => {
      this.opcionSeleccionada =
        (this.opcionSeleccionada + 1) % opciones.length;
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
      opcion.setColor(
        index === this.opcionSeleccionada ? "#ffffff" : "#555555"
      );
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
