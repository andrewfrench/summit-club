motm = undefined;

client_id = "summit-club-controller";
client = new Paho.MQTT.Client("q.thingfabric.com", 8083, client_id);
// client.onMessageArrived = message_arrived;
client.onConnectionLost = mqtt_reconnect;

client.connect({
  userName: "5fbd84a3-b9ee-49a2-9e1f-8c2a9b27bca0",
  password: "c5e8790e1de11dc4b37b99191f5b7f03",
  keepAliveInterval: 10,
  onSuccess: connection_success
});

function mqtt_reconnect(responseObject) {
  console.error("MQTT connection lost!");
  console.log(responseObject);

  client.connect({
    userName: "5fbd84a3-b9ee-49a2-9e1f-8c2a9b27bca0",
    password: "c5e8790e1de11dc4b37b99191f5b7f03",
    keepAliveInterval: 10,
    onSuccess: connection_success
  });
};

function connection_success() {
  console.log("MQTT connection success.");
};

buttons = {
  left_tv_selector: document.getElementById("tv-left"),
  both_tv_selector: document.getElementById("tv-both"),
  right_tv_selector: document.getElementById("tv-right"),

  roster: document.getElementById("roster"),
  cotm: document.getElementById("cotm"),
  motm: document.getElementById("motm"),
  motm_selector: document.getElementById("motm-button")
  // Other buttons go here as they are added.
};

buttons.left_tv_selector.onclick = function() {
  // Set left TV to selected TV when clicked
  buttons.left_tv_selector.classList.add("selected");
  buttons.right_tv_selector.className = "";
  buttons.both_tv_selector.className = "";

  selected_tv = "left";
};

buttons.both_tv_selector.onclick = function() {
  // Set both tvs button to selected when clicked.
  buttons.left_tv_selector.className = "";
  buttons.right_tv_selector.className = "";
  buttons.both_tv_selector.classList.add("selected");

  selected_tv = "both";
};

buttons.right_tv_selector.onclick = function() {
  // Set right TV to selected TV when clicked
  buttons.left_tv_selector.className = "";
  buttons.right_tv_selector.classList.add("selected");
  buttons.both_tv_selector.className = "";

  selected_tv = "right";
};

buttons.roster.onclick = function() {
  var json_command = '{"mode":"slideshow"}';
  command(json_command);
};

buttons.cotm.onclick = function() {
  var json_command = '{"mode":"cotm"}';
  command(json_command);
}

buttons.motm.onclick = function() {
  if(motm != undefined) {
    var json_command = '{"mode":"motm", "player":"' + motm + '"}';
    command(json_command);
  }
}

buttons.motm_selector.onclick = function() {
  motm = document.getElementById("motm-select").value;
  document.getElementById("current-motm").innerHTML = "Man of the Match is set to " + document.getElementById("motm-select").options[document.getElementById("motm-select").selectedIndex].innerHTML + ".";
}

function command(command) {
  if(selected_tv == null || selected_tv == undefined) {
    console.log("tv not selected");
  } else {
    var command_message = new Paho.MQTT.Message(command);
    command_message.destinationName = "30c5c1103209c9df0eb5abf998fdf33a/summit-club/" + selected_tv;
    client.send(command_message);
    console.log(selected_tv, command);
  }
};
