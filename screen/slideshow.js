function Slideshow(context) {
  var slideshow = this;

  this.context = context;

  this.image_urls = [
    "../assets/rapids_roster_pngs/alex_sjoberg.png",
    "../assets/rapids_roster_pngs/ben_newman.png",
    "../assets/rapids_roster_pngs/bobby_burling.png",
    "../assets/rapids_roster_pngs/caleb_calvert.png",
    "../assets/rapids_roster_pngs/carlos_alvarez.png",
    "../assets/rapids_roster_pngs/charles_eloundou.png",
    "../assets/rapids_roster_pngs/dillon_powers.png",
    "../assets/rapids_roster_pngs/dillon_serna.png",
    "../assets/rapids_roster_pngs/dominique_badji.png",
    "../assets/rapids_roster_pngs/drew_moor.png",
    "../assets/rapids_roster_pngs/gabriel_torres.png",
    "../assets/rapids_roster_pngs/jared_watts.png",
    "../assets/rapids_roster_pngs/john_berner.png",
    "../assets/rapids_roster_pngs/juan_ramirez.png",
    "../assets/rapids_roster_pngs/lucas_pittinari.png",
    "../assets/rapids_roster_pngs/marc_burch.png",
    "../assets/rapids_roster_pngs/marcelo_sarvas.png",
    // "../assets/rapids_roster_pngs/marlon_hairston.png",
    "../assets/rapids_roster_pngs/michael_harrington.png",
    "../assets/rapids_roster_pngs/nick_labrocca.png",
    "../assets/rapids_roster_pngs/shane_oneill.png",
    "../assets/rapids_roster_pngs/vicente_sanchez.png",
    "../assets/rapids_roster_pngs/zac_macmath.png"
  ];

  slideshow.images = [];

  // Figure out where to call this
  this.load_images = function() {
    for(var i = 0; i < this.image_urls.length; i++) {
      var image = new Image();
      image.src = slideshow.image_urls[i];
      slideshow.images.push(image);
    }
  };

  this.launch_slideshow = function() {
    if(slideshow.requestAnimationFrameID) {
      cancelAnimationFrame(slideshow.requestAnimationFrameID);
    }

    if(!slideshow.index) {
      slideshow.index = 0;
    }

    slideshow.last_slide_time = new Date().getTime();
    slideshow.interval_length_ms = 20000; // 20 seconds

    slideshow.draw_slide();
  };

  this.draw_slide = function() {
    slideshow.current_time = new Date().getTime();
    slideshow.time_diff = slideshow.current_time - slideshow.last_slide_time;

    slideshow.check_interval();

    slideshow.image = slideshow.images[slideshow.index % slideshow.images.length];
    slideshow.context.drawImage(slideshow.image, 0, 0);

    slideshow.fraction_elapsed = slideshow.time_diff / slideshow.interval_length_ms;
    slideshow.context.fillStyle = "rgba(140,0,26,0.8)";
    slideshow.context.fillRect(0, 1060, (1920 * slideshow.fraction_elapsed), 1080);

    slideshow.requestAnimationFrameID = requestAnimationFrame(slideshow.draw_slide);
  };

  this.check_interval = function() {
    if(slideshow.time_diff >= slideshow.interval_length_ms) {
      slideshow.index++;
      slideshow.last_slide_time = slideshow.current_time;
    }
  };

  this.advance_slide = function() {
    slideshow.index++;

    if(slideshow.requestAnimationFrameID) {
      cancelAnimationFrame(slideshow.requestAnimationFrameID);
    }

    slideshow.last_slide_time = new Date().getTime();

    slideshow.draw_slide();
  };

  this.stop = function() {
    if(slideshow.requestAnimationFrameID) {
      cancelAnimationFrame(slideshow.requestAnimationFrameID);
    }
  };
}
