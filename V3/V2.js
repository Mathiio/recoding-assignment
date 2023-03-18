let canvasWidth = 700;
let canvasHeight = 300;
let densityMap = [];
let sizeRec = 6;
var mic;
let song;
var button;
var analyzer;
let active=0;


// Charger les fichiers de musique
let tracks = [];
let currentTrack = 0;
let playButton;
let nextButton;
let prevButton;

function preload() {
  tracks.push(loadSound('https://matheo-pougalan.com/sound/empty-example/track1.mp3'));
  tracks.push(loadSound('https://matheo-pougalan.com/sound/empty-example/track2.mp3'));
  tracks.push(loadSound('https://matheo-pougalan.com/sound/empty-example/track3.mp3'));
}





function setup() {
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('program');
  background(255);

  let loader = select('#loader');
  loader.attribute('style', 'display: none');

  select('#pausebutton').mousePressed(togglePlay);
  select('#nextbutton').mousePressed(nextTrack);
  select('#prevbutton').mousePressed(prevTrack);
  analyzer = new p5.Amplitude();
  
  frameRate(6);
}




function togglePlay() {
  const current = tracks[currentTrack];
  if (current.isPlaying()) {
    current.pause();
  } else {
    current.play();
  }
}

function nextTrack() {
  tracks[currentTrack].pause();
  currentTrack = (currentTrack + 1) % tracks.length;
  tracks[currentTrack].play();
}

function prevTrack() {
  tracks[currentTrack].pause();
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  tracks[currentTrack].play();
}
 








function draw(){
  var vol = Math.round((analyzer.getLevel())*200);
    // Créé une map de densités
    for(let x = 0; x < canvasWidth; x++) {
      densityMap[x] = [];
      for(let y = 0; y < canvasHeight; y++) {
        let density = noise(x/90, y/40) * vol; 
        densityMap[x][y] = density;
      }
    }
    noStroke();
    for(let x = 0; x < canvasWidth; x += sizeRec) {
      for(let y = 0; y < canvasHeight; y += sizeRec) {
        // Détermine si la couleur est du blanc ou du noir en fonction de la map de densités
        let mythreshold = map(densityMap[x][y], 0, 20, 0, 1); 
        let color1 = random() > mythreshold ? 0 : 255; // Si la valeur random est supérieur à la valeur générée par la map de desnités alors le rectangle est noir, sinon blanc
        
        if (color1 == 0) {
          fill(color("#EBECF0"));
        } else {
          fill(0);
        }
        
        rect(x, y, sizeRec, sizeRec);
      }
    }
  }
