
var vertices = [];
var drawingPoligon = false;
var lastDrawF, currentT;


function setup() {
  var canvas = createCanvas(500, 500);
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
function drawCube(){
  hide('shape-container');
  display('transformations-container');
  let x1 = 100;
  let y1 = 100;
  let s = 100;
  let c = s/2;
  rect(x1,y1,s,s);
  rect(x1+c,y1+c,s,s);
  line(x1,y1,x1+c,y1+c);
  line(x1+s,y1,x1+c+s,y1+c);
  line(x1,y1+s,x1+c,y1+s+c);
  line(x1+s,y1+s,x1+s+c,y1+s+c);
  lastDrawF = drawCube;
}
function drawRectPrism(){
  hide('shape-container');
  display('transformations-container');
  let x1 = 100;
  let y1 = 100;
  let w = 100;
  let h = 50;
  let c = 100;
  rect(x1,y1,w,h);
  rect(x1+c,y1+c,w,h);
  line(x1,y1,x1+c,y1+c);
  line(x1+w,y1,x1+w+c,y1+c);
  line(x1,y1+h,x1+c,y1+h+c);
  line(x1+w,y1+h,x1+w+c,y1+h+c);
  lastDrawF = drawRectPrism;
}

function drawTriangPrism(){

  hide('shape-container');
  display('transformations-container');
  let x1 = 250;
  let y1 = 250;
  let x2 = 200;
  let y2 = 300;
  let x3 = 300;
  let y3 = 300;
  let c = 100;
  triangle(x1,y1,x2,y2,x3,y3);
  triangle(x1+c,y1+c,x2+c,y2+c,x3+c,y3+c);
  line(x1,y1,x1+c,y1+c);
  line(x2,y2,x2+c,y2+c);
  line(x3,y3,x3+c,y3+c);
  lastDrawF = drawTriangPrism;
}

function drawCone(){
  hide('shape-container');
  display('transformations-container');
  let x1 = 250;
  let y1 = 250;
  let w = 100;
  let h = w/4
  ellipse(x1,y1,w,h);
  line(x1-w/2,y1,x1,y1-50);
  line(x1+w/2,y1,x1,y1-50)
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
  hide('scale-slide-container');
  lastDrawF();
}

function reflectM(){
  stroke(0,255,0);
  line(0,0,500,500);
  stroke(256,0,0);
  applyMatrix(0, 1, 1, 0, 0, 0);
  lastDrawF();
}
