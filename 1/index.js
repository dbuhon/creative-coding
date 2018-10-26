let song;
let peaks = [];
let xoff = 0.0;
let fast = true;
let activeLines = true;
let color = { r: 255, g: 255, b: 255 };

function preload() {
    song = loadSound('sweetly.mp3', () =>
        song.processPeaks((result) => peaks = result));
}

function setup() {
    song.loop();
    song.play();
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(3);
    background(25);
    fill(20);
}

function draw() {
    translate(width / 2, height / 2);
    background(25);

    if (peaks.find(p => p.toFixed(1) === song.currentTime().toFixed(1))) {
        randomizeColor();
        fast = !fast;
        activeLines = random() >= 0.5;
        xoff += random() > 0.5 && xoff > 0.00075 ? -0.00025 : 0.0005;
        fast && strokeWeight(3);
    }

    if (fast) {
        changeColor();
    } else {
        if (activeLines) {
            strokeWeight(1.5);
            for (let i = 0; i <= width; i += 20)
                line(x(i / Math.PI), y(i / Math.PI), x(i + xoff * Math.PI), y(i + xoff * Math.PI));
        }
    }

    for (let i = 0; i <= width; i += 2.5)
        line(x(i), y(i), x(i), y(i + xoff * 2));

    xoff += fast ? 0.000015 : 0.0000015;
}

function x(value) {
    return Math.sin(value * xoff / 100) * value * Math.cos(xoff * value);
}

function y(value) {
    return Math.cos(value * xoff / 50) * value / 4;
}

function randomizeColor() {
    color = { r: random(127.5, 255), g: random(127.5, 255), b: random(127.5, 255) };
    stroke(color.r, color.g, color.b);
}

function changeColor() {
    const randColor = (currentColor) => {
        const newColor = currentColor + 10 * random(-1, 1);
        return newColor >= 75 && newColor <= 225 ? newColor : currentColor;
    }

    color = {
        r: randColor(color.r),
        g: randColor(color.g),
        b: randColor(color.b),
    };
    stroke(color.r, color.g, color.b);
}