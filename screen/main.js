var canvas = document.getElementById('main');
var context = canvas.getContext('2d');

var slideshow = new Slideshow(context);
var trivia = new Trivia(context);

slideshow.load_images();

// function make_testcard() {
//   var cyan = "#0FF";
//   var magenta = "#F0F";
//   var yellow = "#FF0";
//   var black = "#000";
//   var red = "#F00";
//   var green = "#0F0";
//   var blue = "#00F";
//
//   context.fillStyle = cyan;
//   context.fillRect(0,0,960,360);
//   context.fillStyle = magenta;
//   context.fillRect(960,0,1080,360);
//   context.fillStyle = yellow;
//   context.fillRect(0,360,960,720);
//   context.fillStyle = black;
//   context.fillRect(960,360,1920,720);
//   context.fillStyle = red;
//   context.fillRect(0,720,640,1080);
//   context.fillStyle = green;
//   context.fillRect(640,720,1280,1080);
//   context.fillStyle = blue;
//   context.fillRect(1280,720,1920,1080);
// }

canvas.onclick = function(event) {
  if(!document.webkitFullscreenElement) {
    make_fullscreen();
  } else {
    trivia.handle_click(event);
    // if(current_event = "slideshow") {
    //   slideshow.advance_slide();
    // } else if(current_even = "trivia") {
    //   trivia.accept_click();
    // }
  }
}

function make_fullscreen() {
  canvas.webkitRequestFullscreen();

  // slideshow.launch_slideshow();
  trivia.launch_trivia();
}
