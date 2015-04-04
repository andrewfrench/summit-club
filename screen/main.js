var mode = undefined;

console.log(screen_side);

var client = new Paho.MQTT.Client("q.thingfabric.com", 8083, "summit-club-screen");
client.onMessageArrived = message_arrived;

client.connect({
  userName: "5fbd84a3-b9ee-49a2-9e1f-8c2a9b27bca0",
  password: "c5e8790e1de11dc4b37b99191f5b7f03",
  keepAliveInterval: 10,
  onSuccess: connection_success
});

function message_arrived(message) {
  var parsed_message = JSON.parse(message.payloadString);
  switch(parsed_message.mode) {
    case "slideshow":
      mode = "slideshow";
      trivia.stop();
      chef.stop();
      slideshow.launch_slideshow();
      break;

    case "trivia":
      mode = "trivia";
      slideshow.stop();
      chef.stop();
      trivia.launch_trivia();
      break;

    case "motm":
      if(parsed_message.player) {
        mode = "motm";
        slideshow.stop();
        trivia.stop();
        motm.launch(parsed_message.player)
      } else {
        console.log("requires player image name");
      }
      break;

    case "chef":
      mode = "chef";
      slideshow.stop();
      trivia.stop();
      chef.launch_chef();
      break;

    default:
      console.log("malformed request: ", message.payloadString);
  }
}

function connection_success() {
  console.log("connection success");

  client.subscribe("30c5c1103209c9df0eb5abf998fdf33a/summit-club/" + screen_side);
}

var canvas = document.getElementById('main');
var context = canvas.getContext('2d');

var slideshow = new Slideshow(context);
var trivia = new Trivia(context);
var motm = new Motm(context);
var chef = new Chef(context);

slideshow.load_images();
chef.load_images();

canvas.onclick = function(event) {
  if(!document.webkitFullscreenElement) {
    make_fullscreen();
  } else {
    console.log(mode);
    switch(mode) {
      case "slideshow":
        slideshow.advance_slide();
        break;
      case "trivia":
        trivia.handle_click(event);
        break;
      case "chef":
        chef.advance_slide();
        break;
      default:
        event.preventDefault();
    }
  }
}

function make_fullscreen() {
  canvas.webkitRequestFullscreen();

  make_testcard(context);

  // slideshow.launch_slideshow();
  // trivia.launch_trivia();
}
