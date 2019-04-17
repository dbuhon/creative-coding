let song;
let peaks = [];
let xoff = 0;
let fast = true;
let activeLines = true;
let color = { r: 255, g: 255, b: 255 };
let rotation = false;

function preload() {
    song = loadSound('../assets/sweetly.mp3', () => song.processPeaks((result) => peaks = result));
}

function setup() {
    song.loop();
    song.play();
    amplitude = new p5.Amplitude();
    amplitude.setInput(song);

    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(5);
    background(25);
    fill(20);
}

function draw() {
    background(25);
    translate(width / 2, height / 2);

    rotation ? rotate(PI / 2) : rotate(PI + PI / 2);
    rotation = !rotation;

    ellipse(0, 0, 180, 180);

    const level = amplitude.getLevel();
    ellipse(0, 0, 100 * level, 100 * level);

    if (peaks.find(p => p.toFixed(1) === song.currentTime().toFixed(1))) {
        randomizeColor();
        fast = !fast;
        activeLines = random() >= .5;
        xoff += random() > .5 && xoff > .0005 ? -0.0005 : .00045;
    }

    if (fast) {
        changeColor();
        fill(20);
    } else {
        if (activeLines) {
            fill(color.r, color.g, color.b);
            strokeWeight(1);
            for (let i = 0; i <= width; i += 20) {
                line(x(i / Math.PI), y(i / Math.PI), x(i + xoff * Math.PI), y(i + xoff * Math.PI));
            }
        }
    }

    strokeWeight(2);
    for (let i = 0; i <= width; i += 2) {
        line(x(i), y(i), x(i), y(i + xoff * 2));
    }

    xoff += fast ? 0.000005 : 0.000001;

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