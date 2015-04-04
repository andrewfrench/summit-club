function make_testcard(context) {
  var cyan = "#0FF";
  var magenta = "#F0F";
  var yellow = "#FF0";
  var black = "#000";
  var red = "#F00";
  var green = "#0F0";
  var blue = "#00F";

  context.fillStyle = cyan;
  context.fillRect(0,0,960,360);
  context.fillStyle = magenta;
  context.fillRect(960,0,1080,360);
  context.fillStyle = yellow;
  context.fillRect(0,360,960,720);
  context.fillStyle = black;
  context.fillRect(960,360,1920,720);
  context.fillStyle = red;
  context.fillRect(0,720,640,1080);
  context.fillStyle = green;
  context.fillRect(640,720,1280,1080);
  context.fillStyle = blue;
  context.fillRect(1280,720,1920,1080);
}
