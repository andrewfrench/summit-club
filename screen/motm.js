function Motm(context) {
  var man = this;

  this.context = context;

  this.image_urls = [
    "../assets/rapids_roster_pngs/alex_sjoberg.png",
    "../assets/rapids_roster_pngs/ben_newnam.png",
    "../assets/rapids_roster_pngs/bobby_burling.png",
    "../assets/rapids_roster_pngs/brian_mullan.png",
    "../assets/rapids_roster_pngs/caleb_calvert.png",
    "../assets/rapids_roster_pngs/carlos_alvarez.png",
    "../assets/rapids_roster_pngs/charles_eloundou.png",
    "../assets/rapids_roster_pngs/chris_sharpe.png",
    "../assets/rapids_roster_pngs/clint_irwin.png",
    "../assets/rapids_roster_pngs/dillon_powers.png",
    "../assets/rapids_roster_pngs/dillon_serna.png",
    "../assets/rapids_roster_pngs/dominique_badji.png",
    "../assets/rapids_roster_pngs/drew_moor.png",
    "../assets/rapids_roster_pngs/gabriel_torres.png",
    "../assets/rapids_roster_pngs/james_riley.png",
    "../assets/rapids_roster_pngs/jared_watts.png",
    "../assets/rapids_roster_pngs/john_berner.png",
    "../assets/rapids_roster_pngs/juan_ramirez.png",
    "../assets/rapids_roster_pngs/lucas_pittinari.png",
    "../assets/rapids_roster_pngs/marc_burch.png",
    "../assets/rapids_roster_pngs/marcelo_sarvas.png",
    "../assets/rapids_roster_pngs/marlon_hairston.png",
    "../assets/rapids_roster_pngs/michael_harrington.png",
    "../assets/rapids_roster_pngs/nick_labrocca.png",
    "../assets/rapids_roster_pngs/sam_cronin.png",
    "../assets/rapids_roster_pngs/shane_oneill.png",
    "../assets/rapids_roster_pngs/vicente_sanchez.png",
    "../assets/rapids_roster_pngs/zac_macmath.png",
  ];

  this.overlay_url = "../assets/motm_overlay/motm_overlay.png";
  this.overlay_image = new Image();
  this.overlay_image.src = this.overlay_url;

  this.images = [];

  this.load = function() {
    for(var i = 0; i < man.image_urls.length; i++) {
      var image = new Image();
      image.src = man.image_urls[i];
      man.images.push(image);
    }
  };

  this.set_player = function(player) {
    man.player = player;
  };

  this.get_frame = function(player) {
    var image;
    for(var i = 0; i < man.images.length; i++) {
      var name_full_arr = man.images[i].src.split("/");
      var name = name_full_arr[name_full_arr.length - 1];
      if(name == man.player) {
        image = man.images[i];
      }
    }

    if(image){
      man.context.drawImage(image, 0, 0);
    } else {
      man.context.fillStyle = "#000";
      man.context.fillRect(0,0,1920,1080);

      // Create a name from the given image filename
      var player_name_chunks = man.player.split(".");
      var player_name_display = player_name_chunks[0].replace("_", " ");
      man.context.fillStyle = "#FFF";
      man.context.font = "140px Arial";
      man.context.fillText(player_name_display.toUpperCase(), 150, 260);
    }
    man.context.drawImage(man.overlay_image, 150, 600);
  };
}
