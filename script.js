var infoBox = document.querySelector(".infoBox");
var startQuiz = infoBox.querySelector(".start-btn");
var quizContainer = document.querySelector(".quizContainer");
var resultsBox = document.querySelector(".resultsBox");
var optionsBox = document.querySelector(".optionsBox");
var restartQuiz = resultsBox.querySelector(".restart-btn");
var nextButton = document.querySelector(".next-btn");
var Count = document.querySelector(".timer .timerDisplay");
var questionCounter = document.querySelector(".displayQuestionCounter");
var lastHighScore = JSON.parse(localStorage.getItem("lastScore"));
var timeAmount =  20;
var questionAmount = 0;
var questionNumber = 1;
var userNumber = 0;
var secCounter;

//eventlisteners to make the buttons in the html file work
infoBox.classList.add("info");
startQuiz.addEventListener("click", beginTest)
restartQuiz.addEventListener("click", restartTest)
nextButton.addEventListener("click", next)

//function to begin the quiz
function beginTest(){
    infoBox.classList.remove("info");
    quizContainer.classList.add("quiz"); 
    displayQuestion(0);
    questionCount(1); 
    timer(20); 
}

//function to restart the quiz
function restartTest(){
    window.location.reload();
    saveUserScore();
}

//function to etablish the next question, makes sure to add one to the amount and the number that is displayed on the header
//clears and resets the timer
function next(){
    if(questionAmount < questions.length - 1){
        questionAmount++;
        questionNumber++;
        displayQuestion(questionAmount);
        questionCount(questionNumber);
        clearInterval(secCounter);
        timer(timeAmount);
        nextButton.classList.remove("show");
    }else{
        clearInterval(secCounter);
        userResult();
    }
}

//array that holds all the questions
var questions = [
  {
  number: 1,
  question: "Which one of the following is the correct way for calling the JavaScript code?",
  answer: "D. Function/Method",
  options: [
    "A. Preprocessor",
    "B. Triggering Event",
    "C. RMI",
    "D. Function/Method"
  ]
},
  {
  number: 2,
  question: "Which of the following number object function returns the value of the number?",
  answer: "B. valueOf()",
  options: [
    "A. toString()",
    "B. valueOf()",
    "C. toLocaleString()",
    "D. toPrecision()"
  ]
},
  {
  number: 3,
  question: "What is JavaScript?",
  answer: "A. JavaScript is a scripting language used to make the website interactive",
  options: [
    "A. JavaScript is a scripting language used to make the website interactive",
    "B. JavaScript is an assembly language used to make the website interactive",
    "C. JavaScript is a compiled language used to make the website interactive",
    "D. None of the mentioned"
  ]
},
  {
  number: 4,
  question: "Which one of the following is an ternary operator:",
  answer: "A. ?",
  options: [
    "A. ?",
    "B. :",
    "C. -",
    "D. +"
  ]
},
  {
  number: 5,
  question: "A set of unordered properties that, has a name and value is called ______",
  answer: "D. Object",
  options: [
    "A. String",
    "B. Array",
    "C. Serialized Object",
    "D. Object"
  ]
},

  {
  number: 6,
  question: "Which of the following variables are used in JavaScript programs?",
  answer: "C. Storing numbers, dates, or other values",
  options: [
    "A. Varying randomly",
    "B. Causing high-school algebra flashbacks",
    "C. Storing numbers, dates, or other values",
    "D. None of the above"
  ]
},

{
  number: 7,
  question: "What are the different types of Pop up boxes available in JavaScript?",
  answer: "D. All of the above",
  options: [
    "A. Alert",
    "B. Prompt",
    "C. Confirm",
    "D. All of the above"
  ]
},

{
  number: 8,
  question: "Which of the following is not a JavaScript framework or library?",
  answer: "D. Cassandra",
  options: [
    "A. Polymer",
    "B. Meteor",
    "C. jQuery",
    "D. Cassandra"
  ]
},

{
  number: 9,
  question: "Which of the following is not a JavaScript Data Types?",
  answer: "D. Float",
  options: [
    "A. Boolean",
    "B. Undefined",
    "C. Number",
    "D. Float"
  ]
},

{
  number: 10,
  question: "In JavaScript, what kind of scoping is used?",
  answer: "D. Lexical scoping",
  options: [
    "A. Literal scoping",
    "B. Sequential scoping",
    "C. Segmental scoping",
    "D. Lexical scoping"
  ]
}

];

//displays the questions and answer choices for the user
function displayQuestion(x){
    var questionBox = document.querySelector(".questionBox");

    var questionsDisplay = '<span>'+ questions[x].number + ". " + questions[x].question +'</span>';
    var optionsDisplay = '<div class="option"><span>'+ questions[x].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[x].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[x].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[x].options[3] +'</span></div>';
    questionBox.innerHTML = questionsDisplay;
    optionsBox.innerHTML = optionsDisplay;
    
    var choice = optionsBox.querySelectorAll(".option");

    for(a=0; a < choice.length; a++){
      choice[a].setAttribute("onclick", "selected(this)");
    }
}

//the function will check if the users choice is correct or incorrect
function selected(answer){
    clearInterval(secCounter);
    var userPick = answer.textContent;
    var correct = questions[questionAmount].answer;
    var userOptions = optionsBox.children.length;
    
    if(userPick == correct){
        userNumber += 1;
        answer.classList.add("correct");
    }else{
        answer.classList.add("incorrect");
        for(a=0; a < userOptions; a++){
            if(optionsBox.children[a].textContent == correct){
                optionsBox.children[a].setAttribute("class", "option correct");
            }
        }
    }
    for(a=0; a < userOptions; a++){
        optionsBox.children[a].classList.add("disabled");
    }
}

//displays your results
function userResult(){
    infoBox.classList.remove("info");
    quizContainer.classList.remove("quiz");
    resultsBox.classList.add("results");
    var score = resultsBox.querySelector(".score_text");
    if (userNumber >= 6){ 
        var displayScore = '<span>Congrats! , You got <p>'+ userNumber +'</p> out of <p>'+ questions.length +'</p>correct</span>';
        score.innerHTML = displayScore;
    }
    else if(userNumber < 6){
        var displayScore = '<span>Nice , You got only <p>'+ userNumber +'</p> out of <p>'+ questions.length +'</p>correct</span>';
        score.innerHTML = displayScore;
    }
    document.getElementById("last-score").innerHTML ="Last Score: " + lastHighScore + "0" + " out of 100 (Hit replay to save your score)";
}

//timer for 20 seconds
function timer(time){
  secCounter = setInterval(timer, 1000);
  function timer(){
      Count.textContent = time;
      time--;
      if(time < 9){
          var zero = Count.textContent; 
          Count.textContent = "0" + zero;
      }
      if(time == -1){
        document.getElementById("next-btn").click()
      }
  }
}

//counts the amount of total questions
function questionCount(x){
    var totalQuestions = '<span><p>'+ x +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    questionCounter.innerHTML = totalQuestions;
}

//saves your last score
function saveUserScore(){
  localStorage.setItem("lastScore", JSON.stringify(userNumber));
}