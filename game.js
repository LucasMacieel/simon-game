var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).keypress(function () { 
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }   
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    animateGamePattern(0);
    userClickedPattern = [];
}

function animateGamePattern(index) {
    if (index === gamePattern.length) {
        return;
    }

    $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[index]);

    setTimeout(function() {
        animateGamePattern(index + 1);
    }, 500);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }    
    else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}