let yoff = 0.0;
let song;
let peaks = [];
let dark = true;
let fast = true;

function preload() {
    song = loadSound('song.mp3', () =>
        song.processPeaks((result) => peaks = result));
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(25);
    song.loop();
    song.play();
}

function draw() {
    if (peaks.find(p => p.toFixed(1) === song.currentTime().toFixed(1))) {
        color = randomizeColor(color);
        fill(color.r, color.g, color.b);
        fast = !fast;
    }

    beginShape();
    let xoff = 0;

    for (let x = 0; x <= width; x += 10) {
        let y = map(noise(xoff, yoff), 0, 1, 0, height);
        vertex(x, y);
        xoff += 0.01;
    }

    yoff += fast ? 0.005 : 0.0005;
    vertex(width, height);
    vertex(0, height);
    endShape();
}

function randomizeColor() {
    dark = !dark;
    return dark ?
        { r: 25, g: 25, b: 25 } :
        { r: random(127.5, 255), g: random(127.5, 255), b: random(127.5, 255) };
}
