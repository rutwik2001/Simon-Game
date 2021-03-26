var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;
function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber =Math.random();
  randomNumber = Math.floor(randomNumber*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)
}

$(".btn").on("click",function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
           $("#" + currentColor).removeClass("pressed");
   }, 100);
}

$(document).on("keypress", function() {
  if(!started) {
    nextSequence();
    started = true;
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
    var audio = new Audio("sounds/wrong.mp")
    audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();


  }
}


function startOver() {
  level = 0;
  gamePattern =[];
  started = false;

}
