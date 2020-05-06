var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gameRunning = false;

var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  level++;

  $("h1").text("Level " + level);

  gamePattern.push(randomChosenColor);

  buttonAnimation(randomChosenColor);

  playSound(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio("assets/sounds/" + name + ".mp3");
  sound.play();
}

function buttonAnimation(name) {
  $("#" + name).animate({ opacity: 0 });
  $("#" + name).animate({ opacity: 1 });
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function checkInput() {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] === userClickedPattern[i]){
            console.log("Input true")
        }
        else {
            $("body").addClass("game-over");
            playSound("game-over");
            setTimeout(function (){
              $("body").removeClass("game-over");
            }, 200);
            gameRunning = false;
            level = 0;
            $("h1").text("GAME OVER, press any key to play again");
            gamePattern = [];
            userClickedPattern = [];
            break;
        }
    }
}

$(".btn").click(this, function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);

  playSound(userChosenColor);

  checkInput();

  console.log(userClickedPattern + " ---- " + gamePattern);

  if (gameRunning && userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
});

$(document).keydown(function () {
  if (!gameRunning) {
    gameRunning = true;
    nextSequence();
  }
});
