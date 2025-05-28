class Node {
  constructor(x, y, charge) {
    this.x = x;
    this.y = y;
    this.charge = charge; // 0: past, 1: present, 2: future
    this.chargeTime = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.charge === 0 ? '#ff4d4d' : this.charge === 1 ? '#4d4dff' : '#4dff4d';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.chargeTime / 5, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.chargeTime -= 0.4;
    return this.chargeTime <= 0;
  }
}

module.exports = Node;
