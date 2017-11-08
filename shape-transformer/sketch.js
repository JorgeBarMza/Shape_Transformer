
var vertices = [];
var drawingPoligon = false;
var lastDrawF, currentT;


function setup() {
  var canvas = createCanvas(500, 500);
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  background(0,0,128);
  fill(256,256,256);
  noFill();
  stroke(256,0,0);
}

// function setup3d() {
//   var canvas =   createCanvas(500, 500, WEBGL);
//   // Move the canvas so it's inside our <div id="sketch-holder">.
//   canvas.parent('sketch-holder');
//
//   background(0,0,128);
//   fill(256,256,256);
//   noFill();
//   stroke(256,0,0);
// }

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

function hide(id){
  let divToHide = document.getElementById(id);
  divToHide.style.display = 'none';
}

function display(id){
  let divToHide = document.getElementById(id);
  divToHide.style.display = 'flex';
}

function drawPolygon(){
  hide('shape-container');
  // show instructions
  var cols = document.getElementsByClassName('vertices-info');
  for(i=0; i<cols.length; i++) {
    cols[i].style.display = 'flex';
  }
  vertices = [];
  drawingPoligon = true;
}

function drawCube(){
  hide('shape-container');
  display('transformations-container');
  setup3d();
  box(100, 100, 100);
  lastDrawF = drawCube;
}

function drawArc(){
  hide('shape-container');
  display('transformations-container');
  arc(255, 255, 200, 200, PI, 0);
  lastDrawF = drawArc;
}

function drawRectPrism(){
  hide('shape-container');
  display('transformations-container');
  createCanvas(1000, 1000, WEBGL);
  lastDrawF = drawRectPrism;
}

function drawTriangPrism(){
  hide('shape-container');
  display('transformations-container');
  createCanvas(1000, 1000, WEBGL);
  lastDrawF = drawTriangPrism;
}

function drawCone(){
  hide('shape-container');
  display('transformations-container');
  // setup3d();
  cone(200, 200);
  lastDrawF = drawCone;
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
  display('transformations-container');
}

function translateMInput(){
  hide('transformations-container');
  display('translate-slide-container');
  currentT = translateM;
}

function scaleMInput(){
  hide('transformations-container');
  display('scale-slide-container');
  currentT = scaleM;
}

function rotateMInput(){
  hide('transformations-container');
  display('angle-container');
  currentT = rotateM;
}

function rotateM(){
  let angle = document.getElementById('angle-slider').value;
  console.log(angle);
  let cos_a = cos(angle);
  let sin_a = sin(angle);
  applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);
  hide('angle-container');
  lastDrawF();
}

function translateM(){
  let xShift = document.getElementById('x-slider-translate').value;
  let yShift = document.getElementById('y-slider-translate').value;
  applyMatrix(1, 0, 0, 1, xShift, -yShift);
  hide('translate-slide-container');
  lastDrawF();
}

function scaleM(){
  let xShift = document.getElementById('x-slider-scale').value;
  let yShift = document.getElementById('y-slider-scale').value;
  applyMatrix(xShift, 0, 0, yShift, 0, 0);
  hide('translate-slide-container');
  lastDrawF();
}

function reflectM(){
  stroke(0,255,0);
  line(0,0,500,500);
  stroke(256,0,0);
  applyMatrix(0, 1, 1, 0, 0, 0);
  lastDrawF();
}

// sacle, translate: x(int),y(int)
// rotate angle (int)
