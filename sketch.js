// Constants
const buffer = 120;
const bufferTop = 50;
const imageSize = 460;
const rectH = 100;
var rectW = 500; // Changed to var in case we wanted to scale rectangle with window (on line 476)
// Function Setup (for while loops)
const trackSetup = [setupTrack1, setupTrack2, setupTrack3, setupTrack4, setupTrack5];
const trackDraw = [drawTrack1, drawTrack2, drawTrack3, drawTrack4, drawTrack5];

// Define Elements
let title;
let loopButton;
let volumeSlider;
let track1Button;
let timeSlider1;
let track2Button;
let timeSlider2;
let track3Button;
let timeSlider3;
let track4Button;
let timeSlider4;
let track5Button;
let timeSlider5;

// Variables
var loopToggle = false;
var iA = 1;
var i1 = 1;
var i2 = 1;

// Audio Files
let track1;
let track2;
let track3;
let track4;
let track5;

// Image Files
let cover;
let image1;
let image2;
let image3;
let image4;
let image5;

// Font Files
let font1;

// Preload Audio, Images, and Font
function preload(){
// preload audio files
    track1 = loadSound("/assets/Cloud Dancer.mp3");
    track2 = loadSound("/assets/Fresh Focus.mp3");
    track3 = loadSound("/assets/Happy Bee.mp3");
    track4 = loadSound("/assets/Modern Island Jam.mp3");
    track5 = loadSound("/assets/Just Nasty.mp3");
    
// preload image files
    cover = loadImage("/assets/Default.png");
    image1 = loadImage("/assets/Cloud Dancer.png");
    image2 = loadImage("/assets/Fresh Focus.png");
    image3 = loadImage("/assets/Happy Bee.png");
    image4 = loadImage("/assets/Modern Island Jam.png");
    image5 = loadImage("/assets/Just Nasty.png");
    
// preload font
    font1 = loadFont("/assets/Typewriter-Serial-ExtraBold Regular.ttf");
}

// Setup Buttons and Sliders
function setup() {
// Setup Canvas
    createCanvas(windowWidth, windowHeight);
    background(152, 108, 195);
// Setup Toolbar
    setupToolbar();
// Setup Tracks (buttons and sliders)
    while (i1 <= 5) {
        trackSetup[i1-1](i1, 0);
        i1++;
    }
}

// Toolbar Functions
function setupToolbar() {
// Create loop button
    loopButton = createButton('Loop');
    loopButton.mousePressed(function() {
        if (!loopToggle) {
            loopButton.style('border', '5px solid #470078');
            track1.setLoop(true);
            track2.setLoop(true);
            track3.setLoop(true);
            track4.setLoop(true);
            track5.setLoop(true);
        }
        else {
            loopButton.style('border', '5px solid #E5CCEB');
            track1.setLoop(false);
            track2.setLoop(false);
            track3.setLoop(false);
            track4.setLoop(false);
            track5.setLoop(false);
        }
        loopToggle = !loopToggle;
    });
    loopButton.size(75, 40);
    loopButton.style('font-size', '18px');
    loopButton.style('border', '5px solid #E5CCEB');
    loopButton.style('border-radius', '100px');
// Create volume slider
    volumeSlider = createSlider(0, 1, 0.8, 0.01);
    volumeSlider.size(200);
    volumeSlider.addClass("mySlider");
}
function drawToolbar() {
// Draw rectangle and stagnant text
    fill('#f4e6fa');
    stroke('#5E247D');
    strokeWeight(4);
    rect(windowWidth/2 + 26, bufferTop + 570, imageSize, 60, 20);
    strokeWeight(0);
    fill('#5E247D');
    text('Volume', windowWidth/2 + 130, bufferTop+597);
// Show volume number
    outputVolume(volumeSlider.value());
    text(round(volumeSlider.value()*100), windowWidth/2 + 445, bufferTop+597);
}

// Track 1 Functions (explanatory text included)
function setupTrack1(buffLine) {
// Create play button
    track1Button = createButton('Play');
    track1Button.mousePressed(playTrack1);
    track1Button.size(125, 40);
    track1Button.style('font-size', '18px');
    track1Button.style('border', '5px solid #E5CCEB');
    track1Button.style('border-radius', '100px');
// Create time slider
    timeSlider1 = createSlider(0, track1.duration(), 0, 0.1);
    timeSlider1.size(200);
    timeSlider1.addClass("mySlider");
}
function playTrack1() {
    if (track1.isPlaying()) {   // Stop track if button is pressed, and is playing
        track1.stop();
    }
    else {
        if (Math.floor(timeSlider1.value()) == Math.floor(track1.duration())) // If slider is at end, restart song to the beginning if not on loop
        {
            timeSlider1.value(0);
        }
        pauseAudio(); // Pauses all audio so there is no double playing
        track1.play(0, 1, 1, timeSlider1.value()); // Starts track where slider value is
    }
}
function drawTrack1(buffLine) {
// Reposition Button and Slider if window is changed
    track1Button.position(windowWidth/2 - rectW - 15, bufferTop-20 + buffLine*buffer);
    timeSlider1.position(windowWidth/2 - rectW + 125, bufferTop-7 + buffLine*buffer);
    if (rectW - 300 >= 200) {
        timeSlider1.size(rectW - 300);
    } else {
        timeSlider1.size(150);
    }
// Create background rectangle for track
    fill('#f4e6fa');
    stroke('#5E247D');
    strokeWeight(4);
    R1 = rect(windowWidth/2 - 25 - rectW, bufferTop-70 + buffLine*buffer, rectW, rectH, 20);
// Create static text
    fill('#ffffff');
    textAlign(CENTER, TOP);
    text('- Cloud Dancer -', windowWidth/2 - 25 - rectW/2, bufferTop-60 + buffLine*buffer);
    strokeWeight(0);
// Create timestamp numbers
    fill('#5E247D');
    textAlign(RIGHT, CENTER);
    track1Time1 = String(Math.floor(timeSlider1.value()%60)).padStart(2, '0'); // Pad the number so there is a 0 if single number. Uses remainder % to separate seconds from minutes
    track1Time2 = String(Math.floor(track1.duration()%60)).padStart(2, '0');
    text(Math.floor(timeSlider1.value()/60) + ":" + track1Time1, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws current slider time
    textAlign(LEFT);
    text(" / " + Math.floor(track1.duration()/60) + ":" + track1Time2, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws total duration of track
    
    if (track1.isPlaying()) { // Checks if playing
        track1Button.style('border', '5px solid #470078');
        track1Button.html("Stop");
        timeSlider1.value(track1.currentTime()); // Moves slider while track is playing.
        timeSlider1.input(function() { // For slider movement when audio is playing
            track1.jump(timeSlider1.value()); // Starts track where/when slider is moved
        });
    } else { // If not playing
        track1Button.style('border', '5px solid #E5CCEB');
        track1Button.html("Play");
    }
}

// Track 2 Functions
function setupTrack2(buffLine) {
    track2Button = createButton('Play');
    track2Button.mousePressed(playTrack2);
    track2Button.size(125, 40);
    track2Button.style('font-size', '18px');
    track2Button.style('border', '5px solid #E5CCEB');
    track2Button.style('border-radius', '100px');

    timeSlider2 = createSlider(0, track2.duration(), 0, 0.1);
    timeSlider2.size(200);
    timeSlider2.addClass("mySlider");
}
function playTrack2() {
    if (track2.isPlaying()) {
        track2.stop();
    }
    else {
        if (Math.floor(timeSlider2.value()) == Math.floor(track2.duration()))
        {
            timeSlider2.value(0);
        }
        pauseAudio();
        track2.play(0, 1, 1, timeSlider2.value());
    }
}
function drawTrack2(buffLine) {
    track2Button.position(windowWidth/2 - rectW - 15, bufferTop-20 + buffLine*buffer);
    timeSlider2.position(windowWidth/2 - rectW + 125, bufferTop-7 + buffLine*buffer);
    if (rectW - 300 >= 200) {
        timeSlider2.size(rectW - 300);
    } else {
        timeSlider2.size(150);
    }

    fill('#f4e6fa');
    stroke('#5E247D');
    strokeWeight(4);
    R2 = rect(windowWidth/2 - 25 - rectW, bufferTop-70 + buffLine*buffer, rectW, rectH, 20);

    fill('#ffffff');
    textAlign(CENTER, TOP);
    text('- Fresh Focus -', windowWidth/2 - 25 - rectW/2, bufferTop-60 + buffLine*buffer);
    strokeWeight(0);

    fill('#5E247D');
    textAlign(RIGHT, CENTER);
    track2Time1 = String(Math.floor(timeSlider2.value()%60)).padStart(2, '0'); // Pad the number so there is a 0 if single number. Uses remainder % to separate seconds from minutes
    track2Time2 = String(Math.floor(track2.duration()%60)).padStart(2, '0');
    text(Math.floor(timeSlider2.value()/60) + ":" + track2Time1, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws current slider time
    textAlign(LEFT);
    text(" / " + Math.floor(track2.duration()/60) + ":" + track2Time2, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws total duration of track
    
    if (track2.isPlaying()) {
        track2Button.style('border', '5px solid #470078');
        track2Button.html("Stop");
        timeSlider2.value(track2.currentTime());
        timeSlider2.input(function() {
            track2.jump(timeSlider2.value());
        });
    } else {
        track2Button.style('border', '5px solid #E5CCEB');
        track2Button.html("Play");
    }
}

// Track 3 Functions
function setupTrack3(buffLine) {
    track3Button = createButton('Play');
    track3Button.mousePressed(playTrack3);
    track3Button.size(125, 40);
    track3Button.style('font-size', '18px');
    track3Button.style('border', '5px solid #E5CCEB');
    track3Button.style('border-radius', '100px');

    timeSlider3 = createSlider(0, track3.duration(), 0, 0.1);
    timeSlider3.size(200);
    timeSlider3.addClass("mySlider");
}
function playTrack3() {
    if (track3.isPlaying()) {
        track3.stop();
    }
    else {
        if (Math.floor(timeSlider3.value()) == Math.floor(track3.duration()))
        {
            timeSlider3.value(0);
        }
        pauseAudio();
        track3.play(0, 1, 1, timeSlider3.value());
    }
}
function drawTrack3(buffLine) {
    track3Button.position(windowWidth/2 - rectW - 15, bufferTop-20 + buffLine*buffer);
    timeSlider3.position(windowWidth/2 - rectW + 125, bufferTop-7 + buffLine*buffer);
    if (rectW - 300 >= 200) {
        timeSlider3.size(rectW - 300);
    } else {
        timeSlider3.size(150);
    }

    fill('#f4e6fa');
    stroke('#5E247D');
    strokeWeight(4);
    R3 = rect(windowWidth/2 - 25 - rectW, bufferTop-70 + buffLine*buffer, rectW, rectH, 20);

    fill('#ffffff');
    textAlign(CENTER, TOP);
    text('- Happy Bee -', windowWidth/2 - 25 - rectW/2, bufferTop-60 + buffLine*buffer);
    strokeWeight(0);

    fill('#5E247D');
    textAlign(RIGHT, CENTER);
    track3Time1 = String(Math.floor(timeSlider3.value()%60)).padStart(2, '0'); // Pad the number so there is a 0 if single number. Uses remainder % to separate seconds from minutes
    track3Time2 = String(Math.floor(track3.duration()%60)).padStart(2, '0');
    text(Math.floor(timeSlider3.value()/60) + ":" + track3Time1, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws current slider time
    textAlign(LEFT);
    text(" / " + Math.floor(track3.duration()/60) + ":" + track3Time2, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws total duration of track
    
    if (track3.isPlaying()) {
        track3Button.style('border', '5px solid #470078');
        track3Button.html("Stop");
        timeSlider3.value(track3.currentTime());
        timeSlider3.input(function() {
            track3.jump(timeSlider3.value());
        });
    } else {
        track3Button.style('border', '5px solid #E5CCEB');
        track3Button.html("Play");
    }
}

// Track 4 Functions
function setupTrack4(buffLine) {
    track4Button = createButton('Play');
    track4Button.mousePressed(playTrack4);
    track4Button.size(125, 40);
    track4Button.style('font-size', '18px');
    track4Button.style('border', '5px solid #E5CCEB');
    track4Button.style('border-radius', '100px');

    timeSlider4 = createSlider(0, track4.duration(), 0, 0.1);
    timeSlider4.size(200);
    timeSlider4.addClass("mySlider");
}
function playTrack4() {
    if (track4.isPlaying()) {
        track4.stop();
    }
    else {
        if (Math.floor(timeSlider4.value()) == Math.floor(track4.duration()))
        {
            timeSlider4.value(0);
        }
        pauseAudio();
        track4.play(0, 1, 1, timeSlider4.value());
    }
}
function drawTrack4(buffLine) {
    track4Button.position(windowWidth/2 - rectW - 15, bufferTop-20 + buffLine*buffer);
    timeSlider4.position(windowWidth/2 - rectW + 125, bufferTop-7 + buffLine*buffer);
    if (rectW - 300 >= 200) {
        timeSlider4.size(rectW - 300);
    } else {
        timeSlider4.size(150);
    }

    fill('#f4e6fa');
    stroke('#5E247D');
    strokeWeight(4);
    R4 = rect(windowWidth/2 - 25 - rectW, bufferTop-70 + buffLine*buffer, rectW, rectH, 20);

    fill('#ffffff');
    textAlign(CENTER, TOP);
    text('- Modern Island Jam -', windowWidth/2 - 25 - rectW/2, bufferTop-60 + buffLine*buffer);
    strokeWeight(0);

    fill('#5E247D');
    textAlign(RIGHT, CENTER);
    track4Time1 = String(Math.floor(timeSlider4.value()%60)).padStart(2, '0'); // Pad the number so there is a 0 if single number. Uses remainder % to separate seconds from minutes
    track4Time2 = String(Math.floor(track4.duration()%60)).padStart(2, '0');
    text(Math.floor(timeSlider4.value()/60) + ":" + track4Time1, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws current slider time
    textAlign(LEFT);
    text(" / " + Math.floor(track4.duration()/60) + ":" + track4Time2, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer); // Draws total duration of track
    
    if (track4.isPlaying()) {
        track4Button.style('border', '5px solid #470078');
        track4Button.html("Stop");
        timeSlider4.value(track4.currentTime());
        timeSlider4.input(function() {
            track4.jump(timeSlider4.value());
        });
    } else {
        track4Button.style('border', '5px solid #E5CCEB');
        track4Button.html("Play");
    }
}

// Track 5 Functions
function setupTrack5(buffLine) {
    track5Button = createButton('Play');
    track5Button.mousePressed(playTrack5);
    track5Button.size(125, 40);
    track5Button.style('font-size', '18px');
    track5Button.style('border', '5px solid #E5CCEB');
    track5Button.style('border-radius', '100px');

    timeSlider5 = createSlider(0, track5.duration(), 0, 0.1);
    timeSlider5.size(200);
    timeSlider5.addClass("mySlider");
}
function playTrack5() {
    if (track5.isPlaying()) {
        track5.stop();
    }
    else {
        if (Math.floor(timeSlider5.value()) == Math.floor(track5.duration()))
        {
            timeSlider5.value(0);
        }
        pauseAudio();
        track5.play(0, 1, 1, timeSlider5.value()); 
    }
}
function drawTrack5(buffLine) {
    track5Button.position(windowWidth/2 - rectW - 15, bufferTop-20 + buffLine*buffer);
    timeSlider5.position(windowWidth/2 - rectW + 125, bufferTop-7 + buffLine*buffer);
    if (rectW - 300 >= 200) {
        timeSlider5.size(rectW - 300);
    } else {
        timeSlider5.size(150);
    }

    fill('#f4e6fa');
    stroke('#5E247D');
    strokeWeight(4);
    R5 = rect(windowWidth/2 - 25 - rectW, bufferTop-70 + buffLine*buffer, rectW, rectH, 20);

    fill('#ffffff');
    textAlign(CENTER, TOP);
    text('- Just Nasty -', windowWidth/2 - 25 - rectW/2, bufferTop-60 + buffLine*buffer);
    strokeWeight(0);

    fill('#5E247D');
    textAlign(RIGHT, CENTER);
    track5Time1 = String(Math.floor(timeSlider5.value()%60)).padStart(2, '0');
    track5Time2 = String(Math.floor(track5.duration()%60)).padStart(2, '0');
    text(Math.floor(timeSlider5.value()/60) + ":" + track5Time1, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer);
    textAlign(LEFT);
    text(" / " + Math.floor(track5.duration()/60) + ":" + track5Time2, windowWidth/2 - 110, bufferTop-3 + buffLine*buffer);
    
    if (track5.isPlaying()) {
        track5Button.style('border', '5px solid #470078');
        track5Button.html("Stop");
        timeSlider5.value(track5.currentTime());
        timeSlider5.input(function() {
            track5.jump(timeSlider5.value());
        });
    } else {
        track5Button.style('border', '5px solid #E5CCEB');
        track5Button.html("Play");
    }
}

// Pause All Audio (failsafe)
function pauseAudio() {
    track1.stop();
    track2.stop();
    track3.stop();
    track4.stop();
    track5.stop();
}

function draw() {
// Setup Canvas
    createCanvas(windowWidth, windowHeight);
    background(152, 108, 195);
    /*if (windowWidth/2 - 80 >= 500) { // Added if we want the track box element to extend with page
        rectW = windowWidth/2 - 80;
    } else {
        rectW = 500;
    }*/
// Add Title
    fill('#ffffff');
    stroke(56, 12, 99);
    strokeWeight(6);
    textFont(font1);
    textAlign(CENTER, TOP);
    textSize(40);
    title = text('KEVIN MACLEOD MUSIC', windowWidth/2, 20);
// Reset Text Defaults
    fill('#5E247D');
    textAlign(LEFT, CENTER);
    textSize(20);
// Toolbar Draw
    drawToolbar();
    loopButton.position(windowWidth/2 + 40, bufferTop+580);
    volumeSlider.position(windowWidth/2 + 230, bufferTop+593);
// Track Draw
    drawTrack1();
    while (i2 <= 5) {
        if (i2 <=8) {
            trackDraw[i2-1](i2, 0);
        }
        else {
            trackDraw[i2-1](i2-8, 1);
        }
        i2++;
    }
    i2=1;
// Image Draw
    if (track1.isPlaying()) {
        image(image1, windowWidth/2 + 25, bufferTop + 50, imageSize, imageSize);
    } else if (track2.isPlaying()) {
        image(image2, windowWidth/2 + 25, bufferTop + 50, imageSize, imageSize);
    } else if (track3.isPlaying()) {
        image(image3, windowWidth/2 + 25, bufferTop + 50, imageSize, imageSize);
    } else if (track4.isPlaying()) {
        image(image4, windowWidth/2 + 25, bufferTop + 50, imageSize, imageSize);
    } else if (track5.isPlaying()) {
        image(image5, windowWidth/2 + 25, bufferTop + 50, imageSize, imageSize);
    } else {
        image(cover, windowWidth/2 + 25, bufferTop + 50, imageSize, imageSize);
    }
}