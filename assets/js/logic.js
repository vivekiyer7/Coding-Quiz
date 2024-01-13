document.addEventListener('DOMContentLoaded', function () {
  // Your existing code here
  let currentQuestionIndex = 0
  let score = 0
  let totalTime = 60
  let timerDisplay = document.getElementById('time')
  let timerInterval
  let startScreen = document.getElementById('start-screen')
  let questionsContainer = document.getElementById('questions-html')

  timerDisplay.textContent = totalTime

  var startBtn = document.querySelector('#start')
  var submitBtn = document.querySelector('#submit')

  startBtn.addEventListener('click', function () {
    startQuiz()
    displayQuestion()
  })

  submitBtn.addEventListener('click', function () {
    submit_score()
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

    let answerheaderEl = document.getElementById('answer-header')
    answerheaderEl.textContent = 'Options:'

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
    let answerstatusEl = document.getElementById('answer-status')

    // Check if the answer is correct
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      // If the answer is correct, increase the score
      score++
      answerstatusEl.textContent = 'Answer Status: Correct'
    } else {
      answerstatusEl.textContent = 'Answer Status: Incorrect'
      // If the answer is wrong, penalize the time
      totalTime -= 5
      if (totalTime < 0) {
        totalTime = 0
      }
      timerDisplay.textContent = totalTime
    }

    // Move to the next question
    currentQuestionIndex++

    // If there are more questions, display the next one
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion(currentQuestionIndex)
    } else {
      // Hide the questions container
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

  function submit_score () {
    let initials = document.querySelector('#initials').value
    let newScore = {
      initials: initials,
      score: score
    }
    //Save in local storage of highscores.html page

    let highScores = JSON.parse(localStorage.getItem('highscoresstorage')) || []
    highScores.push(newScore)
    localStorage.setItem('highscoresstorage', JSON.stringify(highScores))
    window.location.href = './assets/html/highscores.html'
  }
})
