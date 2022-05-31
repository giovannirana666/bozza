let polySynth;

function setup() {
  let cnv = createCanvas(1000, 1000);
  cnv.mouseWheel(playSynth);
  cnv.mousePressed(makeNoise);
  background(255, 0);
  text('scroll to play, click to add noise', 20, 20);

  polySynth = new p5.PolySynth();
}

function playSynth() {
  userStartAudio();

  // note duration (in seconds)
  let dur = 100;

  // time from now (in seconds)
  let time = 0;

  // velocity (volume, from 0 to 1)
  let vel = 0.1;

  // notes can overlap with each other
  polySynth.play('G2', vel, 0, dur);
  polySynth.play('C3', vel, time += 1/9, dur);
  polySynth.play('G3', vel, time += 1/9, dur);
  polySynth.play('A3', vel, time += 1/9, dur);
  polySynth.play('G2', vel, 0, dur);
  polySynth.play('C3', vel, time += 1/9, dur);
  polySynth.play('G3', vel, time += 1/9, dur);
  polySynth.play('A3', vel, time += 1/9, dur);

}

let fft, noise, filter;



  filter = new p5.BandPass();
  noise = new p5.Noise();
  noise.disconnect();
  noise.connect(filter);

  fft = new p5.FFT();


function draw() {
  background(255, 0);

  // set the BandPass frequency based on mouseX
  let freq = map(mouseX, 0, width, 20, 10000);
  freq = constrain(freq, 0, 22050);
  filter.freq(freq);
  // give the filter a narrow band (lower res = wider bandpass)
  filter.res(50);

  // draw filtered spectrum
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 0, height, 0);
    rect(x, height, width/spectrum.length, h);
  }
  if (!noise.started) {
    text();
  } else {
    text();
  }
}

function makeNoise() {
  // see also: `userStartAudio()`
  noise.start();
  noise.amp(0.5, 0.2);
}

function mouseReleased() {
  noise.amp(0.5, 0.2);
}