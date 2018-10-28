let song;
let xoff = .1;
let fast = true;
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
    fill(20);

    song.loop();
    song.play();

    amplitude = new p5.Amplitude();
    amplitude.setInput(song);
    
    setInterval(() => canSwitchSpeed = true, 5000);
}

function draw() {
    background(25);
    beatDebounce++;
    translate(width / 2, height / 2);

    const level = amplitude.getLevel();
    if (beatDebounce > 10 && level >= .1) {
        beatDebounce = 0;
        xoff += (xoff <= .1 || Math.random() >= .5) ? .0005 : -0.0005

        if (canSwitchSpeed) {
            canSwitchSpeed = false;
            xoff += (xoff <= .1 || Math.random() >= .5) ? .005 : -0.05
            fast = !fast;
        }
    }

    for (let i = 0; i <= 2550; i++) {
        setCurrentColor({ r: i / 10, g: i / 10, b: i / 10 });
        line(x(i), y(i), x(i + i * xoff), y(i + i * xoff));
    }


    xoff += fast ? 0.000005 : 0.0000005;
}

x = (value) => Math.sin(value) * xoff * value;
y = (value) => Math.cos(value) * xoff * value;

function setCurrentColor(otherColor) {
    color = otherColor || color;
    stroke(color.r, color.g, color.b);
}

