//arrays section
var userClickedPattern = [];
var gamePattern = [];
var buttonarray = ["red", "blue", "green", "yellow"];

var start = false;

var level = 0;

$(document).click(function(){
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    //adding the user clicked color into the array
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");

        var audio = new Audio("./sounds/wrong.mp3")
        audio.play();

        $("body").addClass("game-over");

        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    start = false;
    level = 0;
    gamePattern = [];
}

//choosing the random number
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randNumber = Math.floor(Math.random() * 4);

    //choosing the random color
    var randomChooseenColor = buttonarray[randNumber];
    console.log(randomChooseenColor);

    //adding the color to empty array
    gamePattern.push(randomChooseenColor);

    //adding the animation
    $("#" + randomChooseenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //adding the sound


    
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(cuurentColor){
    $("#" + cuurentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + cuurentColor).removeClass("pressed");
    }, 100);
}

