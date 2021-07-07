var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click on the start/ reset
document.getElementById("startreset").onclick = function() {
    if (playing == true) { // if we are playing
        location.reload(); //reload page
    }
    else { // if we are not playing
        // set score to 0
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining");  // custom function to show countdown box
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        // hide game over box
        hide("gameover");
        document.getElementById("startreset").innerHTML = "Reset Game"; // change button to reset
        // start countdown
        startCountdown();
        generateQA();
    }
}

//Clicking on an answer box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        //check if we are playing
        if(playing==true){ //yes
            if(this.innerHTML == correctAnswer){
                //correct answer, increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML = score;
    
                //hide wrong box and show correect box
                hide("wrong");
                show("correct");
                setTimeout(function(){hide("correct")}, 1000);
                //generate new QA
                generateQA();
            }
            else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){hide("wrong")}, 1000);
            }
        }
    }
}

//****functions****
//start counter
function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) { //game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

//start stop counter
function stopCountdown() {
    clearInterval(action);
}
//hide elements
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}
//show elements
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

// generate question and multiple answers
function generateQA(){
    var x = 1 +  Math.round(Math.random()*9);
    var y = 1 +  Math.round(Math.random()*9);
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition =  1 +  Math.round(Math.random()*3);
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with correct answer

    // fill other boxes with wrong answers
    var answers = [correctAnswer];

    for(i=1;i<5;i++){
        if(i!=correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 +  Math.round(Math.random()*9))*(1 +  Math.round(Math.random()*9));
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}