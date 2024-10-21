console.log('The page is working!');

//4. Client socket connection
let socket = io();
let r;
let g;
let b;
let size;

//4.1. log the client socket connection
socket.on('connect', () => {
  console.log('Connected');
});

//8. Listen for data and do something with it
socket.on('data', (data) => {
  console.log(data);
  //9. Draw ellipses
  fill(data.r, data.g, data.b)
  ellipse(data.x, data.y, data.size, data.size)
})

//11. Color change
socket.on('colorChange', () => {
  r = random(255);
  g = random(255);
  b = random(255);
  size = random(20);
});

//STEP 1. p5 setup
function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  //10. Assign random colors
  r = random(255);
  g = random(255);
  b = random(255);
  size = random(20);
}

function mouseMoved(){
  // fill(0);
  // ellipse(mouseX, mouseY, 10, 10);

  //5. Emit the data
  let ellipseInfo = {
    x: mouseX,
    y: mouseY,
    r: r,
    g: g,
    b: b,
    size: size
  }

  socket.emit('data', ellipseInfo);
}

//11. Change color on mouse click
function mousePressed(){
  //send event trigger to the server
  socket.emit('colorChange');
}
