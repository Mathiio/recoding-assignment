let canvasWidth = 800;
let canvasHeight = 600;
let densityMap = [];
let sizeRec = 4;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  
  // Créé une map de densités
  for(let x = 0; x < canvasWidth; x++) {
    densityMap[x] = [];
    for(let y = 0; y < canvasHeight; y++) {
      let density = noise(x/90, y/40) * 28; 
      densityMap[x][y] = density;
    }
  }
  noStroke();
  for(let x = 0; x < canvasWidth; x += sizeRec) {
    for(let y = 0; y < canvasHeight; y += sizeRec) {
      // Détermine si la couleur est du blanc ou du noir en fonction de la map de densités
      let threshold = map(densityMap[x][y], 0, 20, 0, 1); 
      let color1 = random() > threshold ? 0 : 255; // Si la valeur random est supérieur à la valeur générée par la map de desnités alors le rectangle est noir, sinon blanc
      
      if (color1 == 0) {
        fill(0);
      } else {
        fill(255);
      }
      
      rect(x, y, sizeRec, sizeRec);
    }
  }
}