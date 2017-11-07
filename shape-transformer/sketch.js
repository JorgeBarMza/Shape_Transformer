
var vertices = [];
var drawingPoligon = false;


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

function mouseReleased(){
  if(drawingPoligon){
    point(mouseX, mouseY);
    vertices.push([mouseX,mouseY]);
  }
}

function drawCube(){
  createCanvas(1000, 1000, WEBGL);
  box(100, 100, 100);
}

function drawArc(){
  arc(100, 100, 100, 100, PI, 0);
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
  vertices = [];
  var cols = document.getElementsByClassName('vertices-info');
  for(i=0; i<cols.length; i++) {
    cols[i].style.display = 'none';
  }

}

function drawPolygon(){
  // show instructions
  var cols = document.getElementsByClassName('vertices-info');
  for(i=0; i<cols.length; i++) {
    cols[i].style.display = 'flex';
  }
  drawingPoligon = true;
}
