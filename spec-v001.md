# Project Spec
## Context
The project is a web app built as a Phaser game. The intended behavior is a full-viewport simulation where 64 circles bounce continuously around the page, including boundary and circle-circle collisions. The desired implementation uses a pinned Phaser 4.0 CDN script, starts automatically on load, and avoids UI overlays.

## Goals
- Deliver a browser-based Phaser game with exactly 64 circles.
- Enforce circle diameter at 50 pixels.
- Enforce uniform speed at 200 pixels/second for every circle.
- Support full-page responsive behavior across desktop and mobile viewport changes.
- Keep visuals minimal: solid random-color circles with no HUD or controls.

## Non-Goals
- Add score, HUD, buttons, menus, or text overlays.
- Add gravity, drag-based slowdown, or non-elastic physics behavior.
- Add multiplayer, backend services, persistence, or authentication.
- Add build tooling or framework scaffolding beyond static files.

## Actors
- End user viewing the web page in a modern browser.
- Developer maintaining static project files and Phaser configuration.

## Assumptions & Constraints
- The app SHALL run from static files (no mandatory build step).
- Phaser version SHALL be pinned to a specific 4.0 release loaded by CDN.
- Randomness SHALL be unseeded by default.
- On very small viewports, initial placement uses best-effort non-overlap with capped retries.
- Circles SHALL remain fully visible (center clamped to at least 25px from each edge).
- Must support browsers at or later than the following versions:
    - Chrome version 94
    - Edge version 94
    - Firefox version 93
    - Safari version 14

## Acceptance Criteria
1. WHEN the page loads, THEN the system SHALL automatically start the simulation with exactly 64 circles in motion.
2. WHERE a circle is rendered, THEN the system SHALL render that circle as a solid disc with a 50-pixel diameter.
3. WHEN circles are initialized, THEN the system SHALL assign each circle a random start position and a random movement angle.
4. WHILE the simulation is running, THEN the system SHALL maintain each circle at 200 pixels per second by normalizing post-collision and runtime velocity drift.
5. WHEN a circle reaches a viewport boundary, THEN the system SHALL perform an elastic bounce and keep the circle fully visible within bounds.
6. WHEN two circles collide, THEN the system SHALL resolve the interaction as an equal-mass elastic collision.
7. WHEN the viewport size changes, THEN the system SHALL resize the game canvas to fill the viewport and update physics bounds accordingly.
8. WHILE the simulation is displayed, THEN the system SHALL show no HUD, buttons, labels, or other UI overlays.
9. WHEN circles are created, THEN the system SHALL assign each circle a random color that remains fixed for that circle during the session.
10. IF the viewport cannot fit 64 circles at 50-pixel diameter without overlap, THEN the system SHALL apply capped-retry best-effort spawning and continue simulation startup.
11. WHERE external engine code is loaded, THEN the system SHALL load a pinned Phaser 4.0 CDN version rather than a floating latest tag.
12. WHEN initial implementation files are created, THEN the system SHALL place the app entrypoint at repository root as `index.html` with one companion JavaScript module file.

## Known Gaps
- No explicit automated test harness or performance threshold was requested.
- No seeded reproducibility mode was requested beyond unseeded default behavior.
- Accessibility expectations (contrast targets, reduced motion handling) are not defined.
- Error handling expectations for CDN failure/offline mode are not defined.
