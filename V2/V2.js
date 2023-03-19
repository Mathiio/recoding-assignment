//Crée une variable canvasWidth qui contient la largeur du canvas à créer.
let canvasWidth = 800;
//Crée une variable canvasHeight qui contient la hauteur du canvas à créer.
let canvasHeight = 600;
//Crée une variable densityMap qui va contenir les différentes densités utilisée pour déterminer la couleur des rectangles.
let densityMap = [];
//Crée une variable sizeRec qui contient la taille des rectangles à dessiner.
let sizeRec = 4;




//Fonction exécutée une seule fois au début du script
function setup() {
  //Crée la zone de dessin avec les dimensions en pixels définies au début du programme
  createCanvas(canvasWidth, canvasHeight);
  //Définie la couleur de la zone de dessin avec du blanc
  background(255);
  
  //Création de la carte de densités en utilisant une double boucle for pour parcourir chaque pixel de la zone de dessin
  //Première boucle parcourt chaque colonne de pixels de la zone de dessin en utilisant "x" pour connaitre la colonne actuelle.
  for(let x = 0; x < canvasWidth; x++) {
    //Pour chaque colonne, on initialise une nouvelle ligne vide dans le tableau densityMap
    densityMap[x] = [];
    //Deuxième boucle parcourt chaque ligne de pixels de la zone de dessin en utilisant "y" pour connaitre la ligne actuelle.
    for(let y = 0; y < canvasHeight; y++) {
      //Pour chaque pixel, généreration d'une valeur aléatoire entre 0 et 1 à partir des coordonnées x et y
      //Résultat multiplier par 28 pour répartir les valeurs de densité sur une plage plus large : de 0 à 28.
      let density = noise(x/90, y/40) * 28; 
      //Valeur de density stockée dans la carte de densité à la position x et y, donc pour un pixel.
      densityMap[x][y] = density;
    }
  }
  noStroke();
  //Première boucle parcourt chaque colonne de pixels de la zone de dessin avec un pas égal à la taille du rectangle "sizeRec"
  for(let x = 0; x < canvasWidth; x += sizeRec) {
    //Deuxième boucle parcourt chaque ligne de pixels de la zone de dessin avec un pas égal à la taille du rectangle "sizeRec"
    for(let y = 0; y < canvasHeight; y += sizeRec) {
      //Convertie une valeur de la map de densité vers une nouvelle plage en prenant la plage de départ (0,28) et la plage voulue (0,1)
      let threshold = map(densityMap[x][y], 0, 28, 0, 1); 
      //Random renvoie une valeur entre 0 et 1
      //Résultat de random comparé avec valeur de la nouvelle plage (0,1)
      //Si la valeur du random est supérieure à la valeur de la map de desnités alors color1=0, et inversement pour le cas inférieur
      let color1 = random() > threshold ? 0 : 255; 
      
      //Si color1 vaut 0
      if (color1 == 0) {
        //Remplit le rectangle avec la couleur noire
        fill(0);
      } else {
        //Remplit le rectangle avec la couleur blanche
        fill(255);
      }
      
      //Dessine le rectangle
      rect(x, y, sizeRec, sizeRec);
    }
  }
}