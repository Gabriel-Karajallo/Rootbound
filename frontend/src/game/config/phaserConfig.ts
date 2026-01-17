import Phaser from "phaser";
import { BootScene } from "../scenes/BootScene";
import { MenuScene } from "../scenes/MenuScene";
import { GameScene } from "../scenes/GameScene";
import { IntroScene } from "../scenes/IntroScene";
import { IntroNarrativeScene } from "../scenes/IntroNarrativeScene";

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
    zoom: window.devicePixelRatio || 1
  },

  backgroundColor: "#000000",

  render: {
    pixelArt: false,
    antialias: true,
    antialiasGL: true,
    roundPixels: false
  },

  scene: [IntroScene, BootScene, MenuScene, IntroNarrativeScene, GameScene],

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
};
