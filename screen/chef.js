function Chef(context) {
  var chef = this;

  this.context = context;

  this.image_urls = [
    "../assets/chef_pngs/bio.png",
    "../assets/chef_pngs/menu.png"
  ];

  chef.images = [];

  // Figure out where to call this
  this.load_images = function() {
    for(var i = 0; i < this.image_urls.length; i++) {
      var image = new Image();
      image.src = chef.image_urls[i];
      chef.images.push(image);
    }
  };

  this.launch_chef = function() {
    if(chef.requestAnimationFrameID) {
      cancelAnimationFrame(chef.requestAnimationFrameID);
    }

    if(!chef.index) {
      chef.index = 0;
    }

    chef.last_slide_time = new Date().getTime();
    chef.interval_length_ms = 60000; // 20 seconds

    chef.draw_slide();
  };

  this.draw_slide = function() {
    chef.current_time = new Date().getTime();
    chef.time_diff = chef.current_time - chef.last_slide_time;

    chef.check_interval();

    chef.image = chef.images[chef.index % chef.images.length];
    chef.context.drawImage(chef.image, 0, 0);

    chef.fraction_elapsed = chef.time_diff / chef.interval_length_ms;
    chef.context.fillStyle = "rgba(140,0,26,0.8)";
    chef.context.fillRect(0, 1060, (1920 * chef.fraction_elapsed), 1080);

    chef.requestAnimationFrameID = requestAnimationFrame(chef.draw_slide);
  };

  this.check_interval = function() {
    if(chef.time_diff >= chef.interval_length_ms) {
      chef.index++;
      chef.last_slide_time = chef.current_time;
    }
  };

  this.advance_slide = function() {
    chef.index++;

    if(chef.requestAnimationFrameID) {
      cancelAnimationFrame(chef.requestAnimationFrameID);
    }

    chef.last_slide_time = new Date().getTime();

    chef.draw_slide();
  };

  this.stop = function() {
    if(chef.requestAnimationFrameID) {
      cancelAnimationFrame(chef.requestAnimationFrameID);
    }
  };
}
