//Crée une variable canvasWidth qui contient la largeur du canvas à créer.
let canvasWidth = 700;
//Crée une variable canvasHeight qui contient la hauteur du canvas à créer.
let canvasHeight = 300;
//Crée une variable densityMap qui va contenir les différentes densités utilisée pour déterminer la couleur des rectangles.
let densityMap = [];
//Crée une variable sizeRec qui contient la taille des rectangles à dessiner.
let sizeRec = 6;
//Définition d'autres variable nécessaire pour l'anlyse et l'utilisation de musiques
var mic;
let song;
var analyzer;
let active=0;
// Créer un tableau qui contient les musiques du porgramme
let tracks = [];
//Contient la musique qui est en cours de lecture
let currentTrack = 0;





//Fonction pour précharger les musiques
function preload() {
  //Insère chaque musiques dans le tableau "tracks"
  tracks.push(loadSound('https://matheo-pougalan.com/sound/empty-example/track1.mp3'));
  tracks.push(loadSound('https://matheo-pougalan.com/sound/empty-example/track2.mp3'));
  tracks.push(loadSound('https://matheo-pougalan.com/sound/empty-example/track3.mp3'));
}





//Fonction exécutée une seule fois au début du script
function setup() {
  //Crée la zonne de dessin avec les dimensions définies au début du programme
  let cnv = createCanvas(canvasWidth, canvasHeight);
  //Insère la zone de dessin dans le conteneur qui porte l'id "program"
  cnv.parent('program');
  //Définie le fond de ma zone de dessin avec la couleur blanche
  background(255);

  //Contient l'élément avec l'id "loader"
  let loader = select('#loader');
  //Change l'attribut de style de l'élément loader en display none
  //Permet de faire disparaitre le loader lorsque le programme est chargé et s'exécute
  loader.attribute('style', 'display: none');

  //Appelle la fonction "togglePlay" lorsque l'élément avec l'id "pausebutton" est cliqué
  select('#pausebutton').mousePressed(togglePlay);
  //Appelle la fonction "nextTrack" lorsque l'élément avec l'id "nextbutton" est cliqué
  select('#nextbutton').mousePressed(nextTrack);
  //Appelle la fonction "prevTrack" lorsque l'élément avec l'id "prevbutton" est cliqué
  select('#prevbutton').mousePressed(prevTrack);

  //Crée un analyseur d'amplitude qui mesure la valeur maximale d'une forme d'onde sonore.
  //"analyzer" est utilisé pour stocker l'instance de l'analyseur d'amplitude.
  analyzer = new p5.Amplitude();

  //Définie la fréquence d'appel de la fonction draw à la seconde
  frameRate(6);
}







function togglePlay() {
  //Variable "current" contient l'élément qui est en cours de lecture (ou prêt à être joué si bouton pause actif)
  const current = tracks[currentTrack];
  //Si la musique actuelle est en train d'être jouée
  if (current.isPlaying()) {
    //Mettre en pause la musique actuelle
    current.pause();
  } 
  //Si la musique actuelle n'est pas en train d'être jouée
  else {
    //Jouer la musique actuelle
    current.play();
  }
}


function nextTrack() {
  //Met en pause la musique actuelle
  tracks[currentTrack].pause();
  //Passe à la musique suivante dans le tableau de musique
  //Si la musique en cours de lecture est la dernière du tableau, alors repasse à la première musique du tableau.
  currentTrack = (currentTrack + 1) % tracks.length;
  //Joue la nouvelle musique actuelle
  tracks[currentTrack].play();
}


function prevTrack() {
  //Met en pause la musique actuelle
  tracks[currentTrack].pause();
  //Passe à la musique précédente dans le tableau de musique
  //Si la musique en cours de lecture est la première du tableau, alors repasse à la dernière musique du tableau.
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  //Joue la nouvelle musique actuelle
  tracks[currentTrack].play();
}
 






function draw(){
    //Fonction getLevel() : renvoie la valeur de l'amplitude audio actuelle : valeur entre 0 et 1. 
    //Valeur multipliée par 200 et arrondie à l'entier le plus proche avec méthode Math.round() : valeur entre 0 et 200. 
    var vol = Math.round((analyzer.getLevel())*200);
    //Création de la carte de densités en utilisant une double boucle for pour parcourir chaque pixel de la zone de dessin
    //Première boucle parcourt chaque colonne de pixels de la zone de dessin en utilisant "x" pour connaitre la colonne actuelle.
    for(let x = 0; x < canvasWidth; x++) {
      //Pour chaque colonne, on initialise une nouvelle ligne vide dans le tableau densityMap
      densityMap[x] = [];
      //Deuxième boucle parcourt chaque ligne de pixels de la zone de dessin en utilisant "y" pour connaitre la ligne actuelle.
      for(let y = 0; y < canvasHeight; y++) {
        //Pour chaque pixel, généreration d'une valeur aléatoire entre 0 et 1 à partir des coordonnées x et y
        //Résultat multiplier par vol pour répartir les valeurs de densité sur une plage plus large : de 0 à vol.
        let density = noise(x/90, y/40) * vol; 
        //Valeur de density stockée dans la carte de densité à la position x et y, donc pour un pixel.
        densityMap[x][y] = density;
      }
    }
    noStroke();
    //Première boucle parcourt chaque colonne de pixels de la zone de dessin avec un pas égal à la taille du rectangle "sizeRec"
    for(let x = 0; x < canvasWidth; x += sizeRec) {
        //Deuxième boucle parcourt chaque ligne de pixels de la zone de dessin avec un pas égal à la taille du rectangle "sizeRec"
      for(let y = 0; y < canvasHeight; y += sizeRec) {
        //Convertie une valeur de la map de densité vers une nouvelle plage en prenant la plage de départ (0,"vol") et la plage voulue (0,1)
        let mythreshold = map(densityMap[x][y], 0, vol, 0, 1); 
        //Random renvoie une valeur entre 0 et 1
        //Résultat de random comparé avec valeur de la nouvelle plage (0,1)
        //Si la valeur du random est supérieure à la valeur de la map de desnités alors color1=0, et inversement pour le cas inférieur
        let color1 = random() > mythreshold ? 0 : 255; 
        
        //Si color1 vaut 0
        if (color1 == 0) {
          //Remplit le rectangle avec la couleur de code hexadécimal : "#EBECF0"
          fill(color("#EBECF0"));
        } else {
          //Remplit le rectangle avec la couleur noire
          fill(0);
        }
        
        //Dessine le rectangle
        rect(x, y, sizeRec, sizeRec);
      }
    }
  }