function Slideshow(context) {
  var slideshow = this;

  this.context = context;

  this.image_urls = [
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\alex_sjoberg.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\ben_newman.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\bobby_burling.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\caleb_calvert.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\carlos_alvarez.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\charles_eloundou.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\dillon_powers.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\dillon_serna.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\dominique_badji.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\drew_moor.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\gabriel_torres.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\jared_watts.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\john_berner.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\juan_ramirez.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\lucas_pittinari.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\marc_burch.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\marcelo_sarvas.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\marlon_hairston.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\michael_harrington.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\nick_labrocca.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\shane_oneill.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\vicente_sanchez.png",
    "C:\\\\Users\\Andrew\\Pictures\\rapids_roster_pngs\\zac_macmath.png"
  ];

  // this.image_urls = [
  //   "https://lh6.googleusercontent.com/h14jpH1hBuEFB2ey8Mw7qaxIZfk7_rHG2grBUnU5F6YKHA9F1WO82eOKCmPS3jpEhSbPGWFzUChFY5E=w920-h871",
  //   "https://lh3.googleusercontent.com/UZXkw9qlUHulLk6G86_qJ-RqJhIzR3hAN_wnf3FtP0Rr9MkCDKR70vm4lfkNX2e092ywgrgxS-3LktA=w920-h871",
  //   "https://lh4.googleusercontent.com/ar-rO5UsEM-CifjQQrcR83bB9ss3ekEjY91_lnThFnfltOEkddR-jtmu0VXvCutWJMKjSAu1ysqfJVc=w920-h871",
  //   "https://lh4.googleusercontent.com/7qLp-5n2KTNhMDEFGt4lOoZmVaBlqGEP9btWmL3Jhz05aLR9NlU3XcWD5ZS5B2P4LcWNKhpAerZa2GM=w920-h871"
  // ];

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
}
