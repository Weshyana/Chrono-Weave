const { createCanvas } = require('canvas');
const Node = require('./node.js');

class ChronoWeave {
  constructor() {
    this.canvas = createCanvas(400, 600);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 10;
    this.rows = 15;
    this.nodes = [];
    this.score = 0;
    this.era = 1;
    this.maxNodes = 5;
    this.spawnNode();
  }

  spawnNode() {
    if (this.nodes.length >= this.maxNodes) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const charge = Math.floor(Math.random() * 3); // 0: past, 1: present, 2: future
    this.nodes.push(new Node(col * this.gridSize, row * this.gridSize, charge));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#4a4a4a';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#0a0a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.nodes.length - 1; i >= 0; i--) {
      this.nodes[i].draw(this.ctx);
      if (this.nodes[i].update()) {
        this.nodes.splice(i, 1);
        this.spawnNode();
      }
    }

    this.checkLinks();
    this.drawUI();
  }

  checkLinks() {
    const toRemove = [];
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        if (
          n1.charge === n2.charge &&
          Math.abs(n1.x - n2.x) <= this.gridSize &&
          Math.abs(n1.y - n2.y) <= this.gridSize
        ) {
          this.ctx.strokeStyle = n1.charge === 0 ? '#ff4d4d' : n1.charge === 1 ? '#4d4dff' : '#4dff4d';
          this.ctx.lineWidth = 3;
          this.ctx.beginPath();
          this.ctx.moveTo(n1.x + this.gridSize / 2, n1.y + this.gridSize / 2);
          this.ctx.lineTo(n2.x + this.gridSize / 2, n2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 15 * this.era;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.nodes.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnNode();
      if (this.score >= this.era * 150) this.advanceEra();
    }
  }

  advanceEra() {
    this.era++;
    this.maxNodes = Math.min(this.maxNodes + 1, 10);
    this.nodes.forEach(n => (n.chargeTime = Math.min(n.chargeTime + 10, 100)));
    this.spawnNode();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ccff';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Era: ${this.era}`, 10, 40);
  }

  handleClick(x, y) {
    for (const node of this.nodes) {
      const d = Math.sqrt(
        Math.pow(x - (node.x + this.gridSize / 2), 2) +
        Math.pow(y - (node.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        node.charge = (node.charge + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.nodes = [];
    this.score = 0;
    this.era = 1;
    this.maxNodes = 5;
    this.spawnNode();
  }
}

// Example usage (for testing in Node.js)
const game = new ChronoWeave();
game.update();
console.log('Chrono Weave game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
