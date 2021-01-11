// Define a slot machine with three reels that can individually spin(), and then display() the current contents of all the reels.
// The basic behavior of a single reel is defined in the reel object below. But the slot machine needs individual reels—objects that delegate to reel, and which each have a position property.
// A reel only knows how to display() its current slot symbol, but a slot machine typically shows three symbols per reel: the current slot (position), one slot above (position - 1), and one slot below (position + 1). So displaying the slot machine should end up displaying a 3 x 3 grid of slot symbols.
function randMax(max) {
  return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
  symbols: [
    "♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"
  ],
  spin() {
    if (this.position == null) {
      this.position = randMax(
        this.symbols.length - 1
      );
    }
    this.position = (
      this.position + 100 + randMax(100)
    ) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(
        this.symbols.length - 1
      );
    }

    // not display a whole reel, just the middle symbol of the reel
    return this.symbols[this.position]
  }
};

var slotMachine = {
  reels: [
    // this slot machine needs 3 separate reels
    // hint: Object.create(..)
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    var lines = [];

    // display all 3 lines on the slot machine
    for (
      let linePos = -1; linePos <= 1; linePos++
    ) {
      let line = this.reels.map(
        function getSlot(reel) {
          var slot = Object.create(reel);
          slot.position = calcPosition();
          return slot.display();

          function calcPosition() {
            return (
              reel.symbols.length + // the reason this line exist is to prevent slot.position to be a negative number
              reel.position +
              linePos
            ) % reel.symbols.length;
          }
        }
      );
      lines.push(line.join(" | "));
    }

    return lines.join("\n");
  }
};

slotMachine.spin();
console.log(slotMachine.display())
// A slot machine, has three reels
// ☾ | ☀ | ★ -> a horizontal reel, containing three sequential symbols
// ☀ | ♠ | ☾ -> a horizontal reel, containing three sequential symbols
// ♠ | ♥ | ☀ -> a horizontal reel, containing three sequential symbols

// slotMachine.spin();
// console.log(slotMachine.display())
// // ♦ | ♠ | ♣
// // ♣ | ♥ | ☺
// // ☺ | ♦ | ★