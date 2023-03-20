//Tableau de tableaux qui défini les niveaux de gris du programme.
const GRAY_SCALE = [
  [0, 0, 0],
  [40, 40, 40],
  [100, 100, 100],
  [255, 255, 255]
];

function setup() {
  //Créer une zone de dessin de 600 pixels de largeur et de 400 pixels de hauteur
  createCanvas(600, 400);
  //Supprime les contours de tous les éléments dessinés
  noStroke();
  //Défini le fond de la zone de dessin en blanc
  background(255);
  //Appel de la fonction pour dessiner les carrés
  drawSquare(0, 0, width, height, 0);
}

function draw() {}

//Fonction pour dessiner les carrés 
//Prend 5 arguments : coordonnées (x,y) du coin supérieur gauche du carré, largeur carré, hauteur carré, niveau de subdivision.
function drawSquare(x, y, w, h, level) {
  //Si le niveau de subdivision est inférieur à 7 alors on continue de dessiner des carrés en subdivisant
  if (level < 3.5) {
    //Calcule la moitié de la largeur et de la hauteur du carré actuel
    let subW = w / 4;
    let subH = h / 4;
    //Dessine seize nouveaux carrés quatre fois plus petit que le carré actuela avec l'appel de la fonction drawSquare
    //Incrémentation de la variable du niveau de subdivision de 1, car il y a eu une subdivision du carré actuel
    drawSquare(x, y, subW, subH, level + 1);
    drawSquare(x + subW, y, subW, subH, level + 1);
    drawSquare(x + subW + subW, y, subW, subH, level + 1);
    drawSquare(x + subW + subW + subW, y, subW, subH, level + 1);

    drawSquare(x, y + subH, subW, subH, level + 1);
    drawSquare(x + subW, y + subH, subW, subH, level + 1);
    drawSquare(x + subW + subW, y + subH, subW, subH, level + 1);
    drawSquare(x + subW + subW + subW, y + subH, subW, subH, level + 1);

    drawSquare(x, y + subH + subH, subW, subH, level + 1);
    drawSquare(x + subW, y + subH + subH, subW, subH, level + 1);
    drawSquare(x + subW + subW, y + subH + subH, subW, subH, level + 1);
    drawSquare(x + subW + subW + subW, y + subH + subH, subW, subH, level + 1);

    drawSquare(x, y + subH + subH + subH, subW, subH, level + 1);
    drawSquare(x + subW, y + subH + subH + subH, subW, subH, level + 1);
    drawSquare(x + subW + subW, y + subH + subH + subH, subW, subH, level + 1);
    drawSquare(x + subW + subW + subW, y + subH + subH + subH, subW, subH, level + 1);
  }
    //Une fois le niveau de subdivision atteint
    else {
    //"noiseval" génère une valeur de bruit pour les coordonnées x et y du coin supérieur gauche du carré actuel.
    let noiseVal = noise(x / 50, y / 20);
    //Utilisation de cette valeur de bruit pour choisir une nuance de gris à partir du tableau GRAY_SCALE
    //Détermine si la nuance de gris sélectionnée sera la nuance la plus claire ou la plus sombre dans le tableau.
    let grayIndex = Math.random() < 0.05 + noiseVal * 0.8 ? 3 : Math.floor(random(3));
    //Rremplit le carré avec cette couleur en utilisant la fonction fill()
    fill(color(...GRAY_SCALE[grayIndex]));
    //Dessine un rectangle sans contour avec noStroke()
    noStroke(); 
    //Dessine le carré avec la fonction rect()
    rect(x, y, w, h);
  }
} 
