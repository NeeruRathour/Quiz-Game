// Define array of questions and qnswers
const questions = [

    {
        question: "What is the term for a score of three under par on a single hole",
        answers: [
            { text: "Eagle", correct: false },
            { text: "Double Eagle", correct: false },
            { text: "Albatross", correct: true },
            { text: "Birdie", correct: false },
        ]
    },
    {
        question: "What do you call the grassy area surrounding the putting green?",
        answers: [
            { text: "Rough", correct: false },
            { text: "Fairway", correct: false },
            { text: "Fringe", correct: true },
            { text: "Hazard", correct: false },
        ]
    },
    {
        question: "In which country did the game of golf originate?",
        answers: [
            { text: "USA", correct: false },
            { text: "Scotland", correct: true },
            { text: "Ireland", correct: false },
            { text: "England", correct: false },
        ]
    },

    {
        question: " What is the standard number of holes on a golf course?",
        answers: [
            { text: "9", correct: false },
            { text: "18", correct: true },
            { text: "27", correct: false },
            { text: "36", correct: false },
        ]
    },
    {
        question: " Which major golf tournament is held at different courses each year?",
        answers: [
            { text: "The Masters", correct: false },
            { text: "The Open Championship", correct: false },
            { text: "U.S. Open", correct: true },
            { text: "PGA Championship", correct: false },
        ]
    },

];
//Connect elements from the DOM using their ids and class selector for start-button 
//Question button
const questionElement = document.getElementById("question-text");
console.log(questionElement);
//Answer buttons
const answerContainer = document.getElementById("answer-select");
console.log(answerContainer);
// Start button
const startButton = document.querySelector(".start-quiz-btn");
//Next buttn & Check Answer button
const nextButton = document.getElementById("next-question-btn");
const checkAnswerButton = document.getElementById("check-answer-btn");
const scoreText = document.getElementById("score"); 



// Define state variables
let currentQuestionIndex = 0;
let score = 0;

// Add event listener for start button to begin quiz
startButton.addEventListener("click", startQuiz);

/**
 * startQuiz function starts the Quiz by resetting the currentQuestionIndex and score, 
 * hiding the landing page area and displaying the question area, 
 * updating the button text, and calling showQuestion function to display the firts question.
 */
function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    // Prepare the "Next" button 
    nextButton.innerText = "Next"; // Ensure the text of next button is set to "Next"
    nextButton.style.display = "none"; // Ensure next button is hidden initially

    // Show the "Check Answer" button
    checkAnswerButton.style.display = "block"; // Ensures the "Check Answer" button is visible.

    // Hide the landing page area
    document.getElementById("landing-page").style.display = 'none';

    // Show the question section with quizz questions
    document.getElementById("question-section").style.display = 'block';

    // Show the elements that were initially hidden
    document.getElementById("question").style.display = 'block';
    document.getElementById("question-text").style.display = 'block';
    document.getElementById("answer-select").style.display = 'block';
    document.getElementById("check-answer-btn").style.display = 'block';
    document.getElementById("score-text").style.display = 'block';
    document.getElementById("reveal").style.display = 'block';

    scoreText.innerText = score; // Sets core display to 0

    // Calls showQuestion function to display the first question.
    showQuestion();
}

/**
 * showQuestion function displays the current question and its answer options. 
 * Dynamically creates radio buttons for each answer and adds them to the answer container. 
 */
function showQuestion() {

    // Reset the previous question by calling resetState function
    resetState();

    // Get current question from "questions" array, then updates the question element with the current question number and text.
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Create and display answer options
    // Iterates through each answer in the current question's "answers" array.
        currentQuestion.answers.forEach((answer, index) => {
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("form-check", "mb-2");
        answerDiv.innerHTML = `
        <input class="form-check-input custom-radio" type="radio" name="answer" id="answer${index}" value="${answer.correct}">
        <label class="form-check-label" for="answer${index}">
            ${answer.text}
        </label>
    `;
        answerContainer.appendChild(answerDiv);
    });
}

/**
 * This function resets the Quiz state before displaying a new question.
 */
function resetState() {

    // Hide the next button initially

    nextButton.style.display = "none"; 

    // Show and enable check answer button 
    checkAnswerButton.style.display = "block"; 
    checkAnswerButton.disabled = false; 

    // Clear Previous Answer Options
    while (answerContainer.firstChild) { 
        answerContainer.removeChild(answerContainer.firstChild); 
    }

    // Clear previous feedback
    document.getElementById("reveal").innerText = ''; 
}

/**
 * This function handles the answer selection, 
 * checks if the answer is correct, 
 * and provides feedback. 
 */
function selectAnswer() {

    // Check if an answer is selected:
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    // Check if the selected answer is correct:

    const isCorrect = selectedAnswer.value === "true";
    if (isCorrect) {
        selectedAnswer.nextElementSibling.classList.add("correct");
        score++;
        document.getElementById("reveal").innerText = "Correct!!!";
    } else {
        selectedAnswer.nextElementSibling.classList.add("incorrect");
        document.getElementById("reveal").innerText = "Incorrect!";
    }

    // Show correct answer and disable all options
    // Convert answerContainer children to an array to use Array.from() method and use 'forEach' to iterate over elements
    Array.from(answerContainer.children).forEach(div => {
        // Select the first input element (radio button) within the div
        const input = div.querySelector("input");

        // Check if the input value indicates a correct answer
        if (input.value === "true") {
            input.nextElementSibling.classList.add("correct");
        }
        input.disabled = true;
    });

    // Update score text
    scoreText.innerText = score; // Display updated score

    checkAnswerButton.disabled = true; // Disable check answer button after an answer is selected
    nextButton.style.display = "block"; // Show next button after an answer is selected
}

// Event listener for check answer button to handle answer checking
checkAnswerButton.addEventListener("click", selectAnswer);


/** 
* This function displays the final score and change the Next button to Play again.
*/
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    // Hide unnecessary elements on the final screen
    document.getElementById("question").style.display = 'none'; // Hide the question number
    document.getElementById("check-answer-btn").style.display = 'none'; // Hide the "Check Answer" button
    document.getElementById("score-text").style.display = 'none'; // Hide the progress score
    document.getElementById("answer-select").style.display = 'none';
    
}

/**
* This function handles the transition to the next
*/ 
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();

    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


