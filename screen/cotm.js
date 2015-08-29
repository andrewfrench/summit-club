function Cotm(context) {
  var chef = this;

  this.context = context;

  this.image_urls = [
    "../assets/chef_pngs/bio.png",
    "../assets/chef_pngs/budweiser.png",
    // "../assets/chef_pngs/bio_2.png",
    // "../assets/chef_pngs/oktoberfest.png",
    "../assets/chef_pngs/marley_coffee.png",
    "../assets/chef_pngs/menu.png",
    "../assets/chef_pngs/odell_brewing.png"
  ];

  // The configurable length of each slide, in ms.
  this.image_slide_lengths = [
    40 * 1000,
    15 * 1000,
    // 40 * 1000,
    // 15 * 1000,
    15 * 1000,
    40 * 1000,
    15 * 1000
  ];

  chef.images = [];
  chef.index = 0;
  // chef.interval_length_ms = 40 * 1000;
  chef.last_slide_time = new Date().getTime();

  // Figure out where to call this
  this.load = function() {
    for(var i = 0; i < this.image_urls.length; i++) {
      var image = new Image();
      image.src = chef.image_urls[i];
      chef.images.push(image);
    }
  };

  this.get_frame = function(current_time) {
    chef.time_diff = current_time - chef.last_slide_time;

    chef.check_interval(current_time);

    chef.image = chef.images[chef.index % chef.images.length];
    chef.context.drawImage(chef.image, 0, 0);

    chef.fraction_elapsed = chef.time_diff / (chef.image_slide_lengths[chef.index % chef.images.length]);
    chef.context.fillStyle = "rgba(140,0,26,0.8)";
    chef.context.fillRect(0, 1060, (1920 * chef.fraction_elapsed), 1080);
  };

  this.check_interval = function(current_time) {
    if(chef.time_diff >= chef.image_slide_lengths[chef.index % chef.images.length]) {
      chef.index++;
      chef.last_slide_time = current_time;
    }
  };

  this.accept_click = function(event) {
    chef.index++;
    chef.last_slide_time = new Date().getTime();
  };
}
