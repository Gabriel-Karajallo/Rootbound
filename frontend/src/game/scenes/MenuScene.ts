import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  private opcionSeleccionada = 0;
  private opcionesTexto: Phaser.GameObjects.Text[] = [];

  constructor() {
    super("MenuScene");
  }

  preload() {
    // Assets del menú (van en public/assets)
    this.load.image("menuPrincipal", "assets/menu/menu.png");
  }

  create() {
    const { width, height } = this.scale;

    // Fondo negro absoluto
    this.cameras.main.setBackgroundColor("#000000");

    // Imagen principal (Nox + Rootbound)
    this.add
      .image(width / 2, height * 0.28, "menuPrincipal")
      .setScale(0.45);

    // Opciones del menú inicial
    const opciones = ["JUGAR", "OPCIONES"];

    opciones.forEach((texto, index) => {
      const opcion = this.add
        .text(width / 2, height * 0.62 + index * 42, texto, {
          fontSize: "22px",
          color: "#666666",
        })
        .setOrigin(0.5);

      this.opcionesTexto.push(opcion);
    });

    this.actualizarSeleccion();

    // Input teclado
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

  private actualizarSeleccion() {
    this.opcionesTexto.forEach((opcion, index) => {
      opcion.setColor(
        index === this.opcionSeleccionada ? "#ffffff" : "#666666"
      );
    });
  }

  private seleccionarOpcion() {
    switch (this.opcionSeleccionada) {
      case 0:
        // JUGAR
        this.scene.start("GameScene");
        break;

      case 1:
        // OPCIONES (pendiente)
        console.log("Opciones (pendiente)");
        break;
    }
  }
}
