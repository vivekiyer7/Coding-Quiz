let currentQuestionIndex = 0;
let score = 0;
let totalTime = 60;

// Start the quiz
function startQuiz() {
    // Start the timer
    let timer = setInterval(function() {
        totalTime--;
        // Update the timer display in HTML
        // Assuming you have a timer element with id 'timer'
        document.getElementById('timer').textContent = totalTime;

        // If the time runs out, end the quiz
        if (totalTime <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);

    // Display the first question
    displayQuestion(currentQuestionIndex);
}
function displayQuestion(index) {
    // Retrieve the question
    let question = quizQuestions[index];

    // Update the question text in HTML
    // Assuming you have a question element with id 'question'
    document.getElementById('question').textContent = question.question;

    // Update the choices in HTML
    // Assuming you have choice elements with ids 'choice1', 'choice2', etc.
    for (let i = 0; i < question.choices.length; i++) {
        document.getElementById('choice' + (i + 1)).textContent = question.choices[i];
    }
}
function handleAnswer(answer) {
    // Check if the answer is correct
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
        // If the answer is correct, increase the score
        score++;
    }

    // Move to the next question
    currentQuestionIndex++;

    // If there are more questions, display the next one
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        // If there are no more questions, end the quiz
        endQuiz();
    }
}
function endQuiz() {
    // Stop the timer
    clearInterval(timer);

    // Display the final score
    // Assuming you have a score element with id 'score'
    document.getElementById('score').textContent = score;
}

//Call the Start Quiz function on click of the start button
document.getElementById('start').addEventListener('click', startQuiz);

//Call the handleAnswer function on click of the choices
document.getElementById('choice1').addEventListener('click', function() {
    handleAnswer(document.getElementById('choice1').textContent);
});
document.getElementById('choice2').addEventListener('click', function() {
    handleAnswer(document.getElementById('choice2').textContent);
});
document.getElementById('choice3').addEventListener('click', function() {
    handleAnswer(document.getElementById('choice3').textContent);
});
document.getElementById('choice4').addEventListener('click', function() {
    handleAnswer(document.getElementById('choice4').textContent);
});


startQuiz();