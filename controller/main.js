(function(){
  var controller = this;

  this.buttons = {
    left_tv_selector: document.getElementById("tv-left"),
    right_tv_selector: document.getElementById("tv-right"),

    test_button: document.getElementById("one")
    // Other buttons go here as they are added.
  };

  this.buttons.left_tv_selector.onclick = function() {
    // Set left TV to selected TV when clicked
    controller.buttons.left_tv_selector.classList.add("selected");
    controller.buttons.right_tv_selector.className = "";

    controller.selected_tv = "left";
  };
  this.buttons.right_tv_selector.onclick = function() {
    // Set right TV to selected TV when clicked
    controller.buttons.left_tv_selector.className = "";
    controller.buttons.right_tv_selector.classList.add("selected");

    controller.selected_tv = "right";
  }
  this.buttons.test_button.onclick = function() {
    controller.command("one");
  }

  this.command = function(command) {
    if(controller.selected_tv == null || controller.selected_tv == undefined) {
      console.log("tv not selected");
    } else {
      var mqtt_topic = "abcd/" + controller.selected_tv + "/" + command;
      console.log(mqtt_topic);
    }
  }
})()
