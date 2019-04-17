let yoff = 0.0;
let song;
let dark = true;
let fast = false;

function preload() {
    song = loadSound('../assets/song.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(25);
    song.loop();
    song.play();

    amplitude = new p5.Amplitude();
    amplitude.setInput(song);
}

function draw() {
    const level = amplitude.getLevel();
    if (level >= .3) {
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

    yoff += fast ? 0.0025 : 0.0005;
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
