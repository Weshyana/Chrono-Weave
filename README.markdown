# Chrono Weave

Chrono Weave is an innovative JavaScript puzzle game where players stabilize a timeline by connecting temporal nodes with matching time charges. Built with Node.js and the `canvas` library, this game offers a unique time-travel-themed experience, perfect for developers looking to extend or integrate it into larger projects.

## Features
- **Temporal Gameplay**: Connect nodes with matching time charges (past, present, future) to stabilize the timeline.
- **Progressive Eras**: Advance through eras as you score, increasing node counts and charge times.
- **Modular JavaScript**: Clean, object-oriented code for easy extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, suitable for desktop or web integration.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chrono-weave.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chrono-weave
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Connect adjacent nodes with the same time charge (past, present, future) by cycling their charges.
- **Scoring**: Each connection earns 15 points multiplied by the current era.
- **Era Progression**: Reach 150 points per era to advance, increasing node count and charge times.
- **Interaction**: Use `game.handleClick(x, y)` to cycle node charges (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `node.js`: Node class for temporal entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Chrono Weave and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/Weshyana). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.
