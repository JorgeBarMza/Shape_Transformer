
var vertices = [];
var drawingPoligon = false;
var lastDrawF, currentT;


function setup() {
  var canvas = createCanvas(500, 500);
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  background(0,0,128);
  fill(256,256,256)
  stroke(256,0,0);
}

function draw() {

}

function clearUI(){
  location.reload();
  // setup();
  // let div = document.getElementById('shape-container');
  // div.style.display = 'flex';
  // div = document.getElementById('transformations-container');
  // div.style.display = 'none';
}

function mouseReleased(){
  if(drawingPoligon){
    point(mouseX, mouseY);
    vertices.push([mouseX,mouseY]);
  }
}

function hideOrDisplay(id){
  let divToHide = document.getElementById(id);
  let status = divToHide.style.display;
  divToHide.style.display = (status == 'none')? 'flex':'none';
}

function drawPolygon(){
  hideOrDisplay('shape-container');
  // show instructions
  var cols = document.getElementsByClassName('vertices-info');
  for(i=0; i<cols.length; i++) {
    cols[i].style.display = 'flex';
  }
  vertices = [];
  drawingPoligon = true;
}

function drawCube(){
  hideOrDisplay('shape-container');
  hideOrDisplay('transformations-container');
  createCanvas(1000, 1000, WEBGL);
  box(100, 100, 100);
  lastDrawF = drawCube;
}

function drawArc(){
  hideOrDisplay('shape-container');
  hideOrDisplay('transformations-container');
  arc(100, 100, 100, 100, PI, 0);
  lastDrawF = drawArc;
}

function drawRectPrism(){
  hideOrDisplay('shape-container');
  hideOrDisplay('transformations-container');
  createCanvas(1000, 1000, WEBGL);
  lastDrawF = drawRectPrism;
}

function drawTriangPrism(){
  hideOrDisplay('shape-container');
  hideOrDisplay('transformations-container');
  createCanvas(1000, 1000, WEBGL);
  lastDrawF = drawRectPrism;
}

function drawCone(){
  hideOrDisplay('shape-container');
  hideOrDisplay('transformations-container');
  createCanvas(1000, 1000, WEBGL);
  box(100, 100, 100);
  lastDrawF = drawCube;
}

function finishPolygon(){
  for(i = 0; i<vertices.length-2; ++i){ // avoid last vertex (button click)
    var p1 = vertices[i];
    var p2 = vertices[i+1];
    line(p1[0],p1[1],p2[0],p2[1]);
  }

  //join first and last vertices
  var p1 = vertices[vertices.length-2];
  var p2 = vertices[0];
  line(p1[0],p1[1],p2[0],p2[1]);

  // info back to normal
  drawingPoligon = false;
  var cols = document.getElementsByClassName('vertices-info');
  for(i=0; i<cols.length; i++) {
    cols[i].style.display = 'none';
  }

  lastDrawF = finishPolygon;
  hideOrDisplay('transformations-container');
}

function rotateMatrix(){
  // x'= x*cos(theta) - y*sin(theta)
  applyMatrix(10,1,1,1,10,10);
}

function translateMInput(){
  hideOrDisplay('slide-cointainer');
  currentT = translateM;
}

function translateM(){
  let xShift = document.getElementById('x-slider').value;
  let yShift = document.getElementById('y-slider').value;
  applyMatrix(1, 0, 0, 1, xShift, yShift);
  lastDrawF();
}

function scaleMatrix(){
  applyMatrix(10,1,1,1,10,10);
}

function reflectMatrix(){
  applyMatrix(10,1,1,1,10,10);
}

// sacle, translate: x(int),y(int)
// rotate angle (int)
