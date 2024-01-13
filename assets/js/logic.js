document.addEventListener('DOMContentLoaded', function () {
  // Your existing code here
  let currentQuestionIndex = 0
  let score = 0
  let totalTime = 15
  let timerDisplay = document.getElementById('time')
  let timerInterval
  let startScreen = document.getElementById('start-screen')
  let questionsContainer = document.getElementById('questions-html')

  timerDisplay.textContent = totalTime

  var startBtn = document.querySelector('#start')

  startBtn.addEventListener('click', function () {
    startQuiz()
    displayQuestion()
  })

  function startQuiz () {
    updateTimer()
    timerInterval = setInterval(updateTimer, 1000)
    // Hide the start screen when the quiz starts
    startScreen.style.display = 'none'
    // Apply flex styles to center questions when starting the quiz
    questionsContainer.style.display = 'flex'
  }

  function updateTimer () {
    if (totalTime > 0) {
      totalTime--
      timerDisplay.textContent = totalTime
    } else {
      clearInterval(timerInterval)
      timerDisplay.textContent = "0 -- Time's Up!"
      // Hide the questions container
      questionsContainer.style.display = 'none'
      endQuiz()
    }
  }

  function displayQuestion () {
    // Assuming you have an array of questions named quizQuestions
    let question = quizQuestions[currentQuestionIndex]

    // Clear previous question and answer elements
    let questionTitleEl = document.getElementById('question-title')
    questionTitleEl.textContent =
      'Ques:' + `${currentQuestionIndex + 1}: ` + question.question

    let answerTitleEl = document.getElementById('answer-title')
    answerTitleEl.textContent = 'Answer:'

    let choicesContainer = document.getElementById('choices')
    choicesContainer.innerHTML = '' // Clear previous choices

    // Display each option on a separate line with numbering
    for (let j = 0; j < question.choices.length; j++) {
      let choice = question.choices[j]

      let choiceEl = document.createElement('button')
      choiceEl.textContent = `${j + 1}. ${choice}` // Add numbering
      choiceEl.addEventListener('click', function () {
        handleAnswer(choice)
      })

      choicesContainer.appendChild(choiceEl)
      choicesContainer.appendChild(document.createElement('br')) // Add line break
    }
  }

  function handleAnswer (answer) {
    // Check if the answer is correct
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      // If the answer is correct, increase the score
      score++
    }

    // Move to the next question
    currentQuestionIndex++

    // If there are more questions, display the next one
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion(currentQuestionIndex)
    } else {
      //hide the questions container
      questionsContainer.style.display = 'none'
      endQuiz()
    }
  }

  function endQuiz () {
    // Stop the timer
    clearInterval(timerInterval)

    // Display the final score
    let scoreElement = document.getElementById('final-score')
    scoreElement.textContent = score

    // Show the end screen
    let endScreen = document.getElementById('end-screen')
    endScreen.style.display = 'block'
  }
})
