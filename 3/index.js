let song;
let xoff = .1;
let fast = false;
let canSwitchSpeed = false;
let color = { r: 255, g: 255, b: 255 };
let beatDebounce = .1;
let beatCount = 0;

function preload() {
    song = loadSound('../assets/past.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(1);
    background(25);
    fill(255);

    song.loop();
    song.play();

    amplitude = new p5.Amplitude();
    amplitude.setInput(song);

    setInterval(() => canSwitchSpeed = true, 10000);
    
    translate(width / 2, height / 2);
    ellipse(0, 0, windowHeight - 15, windowHeight - 15);
}

function draw() {
    translate(width / 2, height / 2);
    beatDebounce++;

    const level = amplitude.getLevel();
    if (beatDebounce > 10 && level >= .4) {
        beatDebounce = 0;

        if (canSwitchSpeed) {
            canSwitchSpeed = false;
            xoff += (xoff < .1 || Math.random() >= .5) ? .015 : -0.015
            fast = !fast;
        }
    }
    
    for (let i = 0; i <= 2550; i++) {
        setCurrentColor({ r: i / 10, g: i * Math.exp(level) / 10, b: i * Math.exp(level) / 10});
        line(x(i), y(i), x(i + i * xoff), y(i + i * xoff));
    }


    xoff += fast ? 0.0000025 : 0.0000005;
}

x = (value) => Math.sin(value) * xoff * value;
y = (value) => Math.cos(value) * xoff * value;

function setCurrentColor(otherColor) {
    color = otherColor || color;
    stroke(color.r, color.g, color.b);
}

