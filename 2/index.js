let song;
let xoff = .1;
let fast = true;
let color = { r: 255, g: 255, b: 255 };
let beatDebounce = .1;
const beatLevel = .9;

function preload() {
    song = loadSound('../assets/missed-calls.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(1);
    fill(20);

    song.loop();
    song.play();

    amplitude = new p5.Amplitude();
    amplitude.setInput(song);
}

function draw() {
    beatDebounce++;
    background(25);
    translate(width / 2, height / 2);

    const level = amplitude.getLevel();
    if (beatDebounce > 15) {
        if (level > .4) {
            beatDebounce = 0;
            randomizeColor();
            xoff += xoff <= .1 || Math.random() >= .33 ? .015 : -0.015;
            level >= .1 && (fast = !fast);
        }
    }

    for (let i = 0; i <= width; i += 2) {
        ((i > width * level) && (fast || i > width / 2)) ? stroke(0) : setCurrentColor();
        line(x(i), y(i), x(i + i * xoff), y(i + i * xoff));
    }

    xoff += fast ? 0.000005 : -0.00000075;
}

x = (value) => Math.sin(value) * xoff * value;
y = (value) => Math.cos(value) * xoff * value;

function setCurrentColor(otherColor) {
    color = otherColor || color;
    stroke(color.r, color.g, color.b);
}

function randomizeColor() {
    color = { r: random(0, 255), g: random(0, 255), b: random(0, 255) };
    stroke(color.r, color.g, color.b);
}
