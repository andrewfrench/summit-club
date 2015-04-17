var mode;
var canvas = document.getElementById('main');
var context = canvas.getContext('2d');

// Initialize objects
var slideshow = new Slideshow(context);
slideshow.load();

var motm = new Motm(context);
motm.load();

var cotm = new Cotm(context);
cotm.load();

var client = new Paho.MQTT.Client("q.thingfabric.com", 8083, "summit-club-screen");
client.onMessageArrived = message_arrived;
client.onConnectionLost = reconnect;

client.connect({
  userName: "5fbd84a3-b9ee-49a2-9e1f-8c2a9b27bca0",
  password: "c5e8790e1de11dc4b37b99191f5b7f03",
  keepAliveInterval: 10,
  onSuccess: connection_success
});

function reconnect(responseObject) {
  console.error("MQTT connection lost!");
  console.log(responseObject);

  client.connect({
    userName: "5fbd84a3-b9ee-49a2-9e1f-8c2a9b27bca0",
    password: "c5e8790e1de11dc4b37b99191f5b7f03",
    keepAliveInterval: 10,
    onSuccess: connection_success
  });
}

function message_arrived(message) {
  try{
    console.log(JSON.parse(message.payloadString));

    var outbound_message = new Paho.MQTT.Message("Message received and parsed.");
    outbound_message.destinationName = "30c5c1103209c9df0eb5abf998fdf33a/summit-club/status/right";
    client.send(outbound_message);

    var parsed_message = JSON.parse(message.payloadString);

    mode = parsed_message.mode;
    console.log(mode);

    if(mode == "motm") {
      motm.set_player(parsed_message.player);
    }

  } catch(e) {
    console.error("JSON message parse error:", e.message);

    var error_message = new Paho.MQTT.Message("Malformed JSON in request.");
    error_message.destinationName = "30c5c1103209c9df0eb5abf998fdf33a/summit-club/status/right";
    client.send(error_message);
  }
}

function connection_success() {
  console.log("connection success");

  client.subscribe("30c5c1103209c9df0eb5abf998fdf33a/summit-club/" + screen_side);
  client.subscribe("30c5c1103209c9df0eb5abf998fdf33a/summit-club/both");
}

canvas.onclick = function(event) {
  if(!document.webkitFullscreenElement) {
    canvas.webkitRequestFullscreen();

    start_animation();
  } else {
    // If fullscreen, pass click event to click handler
    console.log("Click event:", event.clientX, event.clientY);

    switch (mode) {
      case "slideshow":
        slideshow.accept_click(event);
        break;

      case "cotm":
        cotm.accept_click(event);
        break;
    }
  }
}

function start_animation() {
  if(mode == undefined) {
    mode = "slideshow";
  }

  draw();
}

function draw() {
  var current_time = new Date().getTime();

  switch (mode) {
    case "slideshow":
      slideshow.get_frame(current_time);
      break;

    case "cotm":
      cotm.get_frame(current_time);
      break;

    case "motm":
      motm.get_frame(current_time);
      break;
  }

  requestAnimationFrame(draw);
}
