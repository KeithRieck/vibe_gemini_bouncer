# Vibe Gemini Bouncer

## Architecture
This project is a modular Phaser game implementation based on ES2020 and Phaser 4.1.0. 
It follows a strict "no-build" approach, using browser-native ES modules.

### Directory Structure
- `index.html`: Entry point, loads Phaser via CDN and bootstraps the application.
- `src/main.js`: Main entry point, configures the Phaser game and scenes.
- `src/scenes/`:
    - `BootScene.js`: Initial asset loading (placeholder).
    - `PreloaderScene.js`: Asset loading progress and transition.
    - `MainGameScene.js`: Physics simulation, collision handling, and responsive resizing.
- `src/game/`:
    - `Circle.js`: Game object class managing individual circle behavior and speed normalization.

## Conventions
- **Phaser Version**: Pinned to 4.1.0 via CDN.
- **Physics**: Uses Arcade Physics with custom velocity normalization to maintain a constant 200px/s speed.
- **Responsive Design**: Uses Phaser's `RESIZE` scale mode and a custom resize handler to ensure full-viewport coverage and bound synchronization.
- **Minimalism**: No HUD, UI, or external dependencies beyond Phaser.

## Workflows
- **Running**: Open `index.html` in a modern browser (Chrome 94+, Edge 94+, Firefox 93+, Safari 14+).
- **Testing**: Manual verification of bounce behavior and viewport resizing.
