function Trivia(context) {
  var trivia = this;

  this.context = context;

  this.questions = [
    {
      question: "Where is the Colorado Rapids' home stadium?",
      answers: [
        "Commerce City",
        "Denver",
        "Aurora",
        "Wheat Ridge"
      ],
      response_text: "Dick's Sporting Goods Park, the home stadium of the Colorado Rapids, is located in Commerce City."
    },
    {
      question: "Which Irish striker did the Rapids sign in the Spring of 2015?",
      answers: [
        "Kevin Doyle",
        "Marlon Hairston",
        "Drew Moor",
        "Clint Irwin"
      ],
      response_text: "The Rapids signed Irish striker Kevin Doyle in the Spring of 2015."
    },
    {
      question: "When did the Colorado Rapids begin playing?",
      answers: [
        "1995",
        "1992",
        "1980",
        "2002"
      ],
      response_text: "The Colorado Rapids began playing in 1995, the inaugural season of MLS."
    },
    {
      question: "When did Pablo Mastroeni take over as Rapids head coach?",
      answers: [
        "2014",
        "2010",
        "1999",
        "2003"
      ],
      response_text: "Pablo Mastroeni became head coach of the Rapids on March 8, 2014."
    },
    {
      question: "The Rapids and which team compete for the Rocky Mountain Cup?",
      answers: [
        "Real Salt Lake",
        "Sporting Kansas City",
        "NYCFC",
        "Portland Timbers"
      ],
      response_text: "The Rapids compete against Real Salt Lake for the Rocky Mountain cup each year."
    }
  ];

  this.box_bounds = [220,420,620,820];

  this.background_image_url = "../assets/rapids_trivia_pngs/background.png";
  this.background_image = new Image();
  this.background_image.src = this.background_image_url;

  this.launch_trivia = function() {
    trivia.max_response_time_ms = 12000;
    trivia.answer_screen_interval_ms = 6000;
    trivia.animate_question = true;
    trivia.animate_answer = false;

    trivia.select_question();

    trivia.draw_question();
  },

  this.select_question = function() {
    trivia.response = -1;

    trivia.question_index = Math.floor(Math.random() * trivia.questions.length);
    trivia.current_question = trivia.questions[trivia.question_index];

    trivia.random_answer_offset = Math.floor(Math.random() * trivia.current_question.answers.length);

    trivia.begin_time = new Date().getTime();
  },

  this.draw_question = function() {
    trivia.context.clearRect(0, 0, 1920, 1080);

    trivia.context.drawImage(trivia.background_image, 0, 0);

    trivia.current_time = new Date().getTime();
    trivia.time_diff = trivia.current_time - trivia.begin_time;

    trivia.check_interval_question();

    context.fillStyle = "#FFF";
    context.font = "60px Arial";

    context.fillText(trivia.current_question.question, 80, 130);

    for(var i = 0; i < trivia.current_question.answers.length; i++) {
      trivia.answer_index = (i + trivia.random_answer_offset) % trivia.current_question.answers.length;
      trivia.current_answer = trivia.current_question.answers[trivia.answer_index];

      if(trivia.answer_index == trivia.response) {
        context.fillStyle = "rgba(0,0,0,0.7)";
      } else {
        context.fillStyle = "rgba(0,0,0,0.3)";
      }
      context.fillRect(80,trivia.box_bounds[i],1720,140);

      context.fillStyle = "#FFF";
      context.font = "30px Arial";
      context.fillText(trivia.current_answer, 130, 300 + (200 * i));
    }

    trivia.fraction_elapsed = trivia.time_diff / trivia.max_response_time_ms;
    trivia.context.fillStyle = "rgba(255,255,255,0.3)";
    trivia.context.fillRect(0, 1060, (1920 * trivia.fraction_elapsed), 1080);

    if(trivia.animate_question) trivia.requestAnimationFrameID = requestAnimationFrame(trivia.draw_question);
  },

  this.check_interval_question = function() {
    if(trivia.time_diff >= trivia.max_response_time_ms) {
      trivia.animate_question = false;
      trivia.animate_answer = true;

      trivia.evaluate();
    }
  },

  this.check_interval_answer = function() {
    if (trivia.time_diff >= trivia.answer_screen_interval_ms) {
      trivia.animate_answer = false;
      trivia.animate_question = true;

      trivia.launch_trivia();
    }
  },

  this.evaluate = function() {
    trivia.begin_time = new Date().getTime();

    trivia.draw_answer_screen();
  },

  this.draw_answer_screen = function() {
    trivia.context.clearRect(0, 0, 1920, 1080);
    trivia.context.drawImage(trivia.background_image, 0, 0);

    trivia.current_time = new Date().getTime();
    trivia.time_diff = trivia.current_time - trivia.begin_time;

    trivia.check_interval_answer();

    if(trivia.response == 0) {
      trivia.response_title = "Yes!";
    } else if(trivia.response == -1){
      trivia.response_title = "Too slow!";
    } else {
      trivia.response_title = "Nope!";
    }

    trivia.response_text = trivia.current_question.response_text;

    trivia.context.fillStyle = "#FFF";
    trivia.context.font = "60px Arial";
    trivia.context.fillText(trivia.response_title, 80, 130);

    trivia.context.font = "30px Arial";
    trivia.context.fillText(trivia.response_text, 80, 300);

    trivia.fraction_elapsed = trivia.time_diff / trivia.answer_screen_interval_ms;
    trivia.context.fillStyle = "rgba(255,255,255,0.3)";
    trivia.context.fillRect(0, 1060, (1920 * trivia.fraction_elapsed), 1080);

    if(trivia.animate_answer) trivia.requestAnimationFrameID = requestAnimationFrame(trivia.draw_answer_screen);
  },

  this.handle_click = function(event) {
    if(trivia.animate_question){
      trivia.new_response = undefined;
      for(var i = 0; i < trivia.box_bounds.length; i++) {
        if(event.clientX > 80 &&
           event.clientX < 1800 &&
           event.clientY > trivia.box_bounds[i] &&
           event.clientY < (trivia.box_bounds[i] + 140)) {
          trivia.new_response = (i + trivia.random_answer_offset) % trivia.current_question.answers.length;
        }
      }

      if(trivia.response == trivia.new_response) {
        trivia.begin_time = new Date().getTime() - trivia.max_response_time_ms;
      } else if(trivia.new_response != undefined) {
        trivia.response = trivia.new_response;
      }
    }
  },

  this.stop = function() {
    if(trivia.requestAnimationFrameID) {
      cancelAnimationFrame(trivia.requestAnimationFrameID);
      trivia.animate_answer = false;
      trivia.animate_question = false;
    }
  }
}
