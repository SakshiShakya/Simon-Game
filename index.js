var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// call for starting the game // for detecting the keypress
$(document).keypress(function(){ //works same as addEventListener in vanilla javascript
    if(!started){
        $("#level-title").text("level - " + level); //innerHTML
        nextSequence();
        started = true;
    }
});

// function for adding new sequence in the gamePattern
function nextSequence(){
    userClickedPattern = []; //updating the player's pattern
    level++;
    $("#level-title").text("level - " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //for animating the sound played
    playSound(randomChoosenColour); //function call for playing sound
}

// function for playing the audio when the button is clicked or the key is pressed
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// for detecting button click
$(".btn").click(function(){
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// for animating the user clicked button
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ // for removing the class after 100 ms
        $("#" + currentColour).removeClass("pressed");}
    ,100);
}

// to check the user entered pattern 
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

// function to reset the game 
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

$("#rule-book").click(function(){
    location.replace("rule-book.html");
});