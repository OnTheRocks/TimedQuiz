
var time = 15 * questions.length;
var interval;
var startQ = document.getElementById("startButton")
var nextQ = document.getElementById("nextButton")

var questionContainerDiv = document.getElementById("questionContainer")
var hScores = document.getElementById("highScore")
var questionElement = document.getElementById("question")
var ansButtonsElement = document.getElementById("answerButtons")
var currentQuestinIndex = ""

var shuffledQuestions = ""
var currentQuestionInde = ""

startQ.addEventListener("click", startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  nextQuestion()
})

document.getElementById("timer").innerHTML = "Timer: " + time;
    interval = setInterval(countDown, 1000)

function startQuiz() {
  startQ.classList.add("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerDiv.classList.remove("hide")
  hScores.classList.add("hide")  
  nextQuestion()
}

function countDown() {

  if (time >= 0) {
      time--;
  }
  else {
      clearInterval(time);
      document.getElementById("timer").innerHTML = "EXPIRED";
  }

  document.getElementById("timer").innerHTML = "Timer: " + time;
}


function nextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn','btn-outline-secondary', 'btn-block' )
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    ansButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextQ.classList.add('hide')
  while (ansButtonsElement.firstChild) {
    ansButtonsElement.removeChild(ansButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(ansButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function wrongAnswer() {
  currentQuestinIndex++;
  time = time - 15;

}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
    wrongAnswer()
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
