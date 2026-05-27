# Vibe Gemini Bouncer

## Architecture
This project is a minimal Phaser game implementation based on ES2020 and Phaser 4.1.0. 
It follows a strict "no-build" approach, using browser-native ES modules.

### Components
- `index.html`: Entry point, loads Phaser via CDN and bootstraps the application.
- `main.js`: Single companion module containing all game logic, including:
    - `Boot`: Initial asset loading (placeholder).
    - `Preloader`: Texture generation and progress bar.
    - `MainGame`: Physics simulation, collision handling, and responsive resizing.
    - `Circle`: Game object class managing individual circle behavior and speed normalization.

## Conventions
- **Phaser Version**: Pinned to 4.1.0 via CDN.
- **Physics**: Uses Arcade Physics with custom velocity normalization to maintain a constant 200px/s speed.
- **Responsive Design**: Uses Phaser's `RESIZE` scale mode and a custom resize handler to ensure full-viewport coverage and bound synchronization.
- **Minimalism**: No HUD, UI, or external dependencies beyond Phaser.

## Workflows
- **Running**: Open `index.html` in a modern browser (Chrome 94+, Edge 94+, Firefox 93+, Safari 14+).
- **Testing**: Manual verification of bounce behavior and viewport resizing.
