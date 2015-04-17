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
    "../assets/rapids_roster_pngs/zac_macmath.png",
    "../assets/member_pngs/aaron_evans.png",
    "../assets/member_pngs/brett_story.png",
    "../assets/member_pngs/marco_chayet.png",
    "../assets/member_pngs/rick_garcia.png",
    "../assets/member_pngs/steve_and_theresa_paul.png"
  ];

  slideshow.images = [];
  slideshow.index = 0;
  slideshow.interval_length_ms = 20 * 1000;
  slideshow.last_slide_time = new Date().getTime();

  this.load = function() {
    for(var i = 0; i < this.image_urls.length; i++) {
      var image = new Image();
      image.src = slideshow.image_urls[i];
      slideshow.images.push(image);
      console.log("loaded", image.src);
    }
  };

  this.get_frame = function(current_time) {
    slideshow.time_diff = current_time - slideshow.last_slide_time;

    slideshow.check_interval(current_time);

    slideshow.image = slideshow.images[slideshow.index % slideshow.images.length];
    slideshow.context.drawImage(slideshow.image, 0, 0);

    slideshow.fraction_elapsed = slideshow.time_diff / slideshow.interval_length_ms;
    slideshow.context.fillStyle = "rgba(140,0,26,0.8)";
    slideshow.context.fillRect(0, 1060, (1920 * slideshow.fraction_elapsed), 1080);
  };

  this.check_interval = function(current_time) {
    if(slideshow.time_diff >= slideshow.interval_length_ms) {
      slideshow.index++;
      slideshow.last_slide_time = current_time;
    }
  };

  this.accept_click = function(event) {
    slideshow.index++;
    slideshow.last_slide_time = new Date().getTime();
  };
}
