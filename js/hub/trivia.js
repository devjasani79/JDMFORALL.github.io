// Open Trivia Overlay
function openTriviaOverlay() {
    document.getElementById("triviaOverlay").style.display = "flex";
    loadQuestions(); // Load random questions when overlay opens
}

// Close Trivia Overlay
function closeTriviaOverlay() {
    document.getElementById("triviaOverlay").style.display = "none";
    resetTrivia(); // Reset trivia when overlay is closed
}

// Load random questions from the JSON
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function loadQuestions() {
    try {
        const response = await fetch('./data/triviaQuestions.json'); // Corrected path to triviaQuestions.json
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Randomly select 5 questions from the JSON
        questions = data.questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        
        displayQuestion(currentQuestionIndex); // Display the first question
    } catch (error) {
        console.error("Error loading questions:", error);
    }
}

function displayQuestion(index) {
    const question = questions[index];
    const questionContainer = document.getElementById("questionContainer");
    const nextButton = document.getElementById("nextButton");

    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="answers">
            ${question.answers.map((answer, i) => `
                <label>
                    <input type="radio" name="answer" value="${i}" onclick="enableNextButton()">
                    ${answer}
                </label>
            `).join('')}
        </div>
    `;

    nextButton.disabled = true; // Disable next button until answer is selected
}

// Enable Next Button after an answer is selected
function enableNextButton() {
    document.getElementById("nextButton").disabled = false;
}

// Handle Next Question
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const isCorrect = questions[currentQuestionIndex].correctAnswerIndex === parseInt(selectedAnswer.value);
        if (isCorrect) {
            score++;
        }
    }

    // Move to the next question or show result if it's the last question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

// Show Trivia Results
function showResult() {
    const resultContainer = document.getElementById("resultContainer");
    const scoreElement = document.getElementById("score");

    scoreElement.innerHTML = `Your Score: ${score} / 5`;
    resultContainer.style.display = "block";
    document.getElementById("nextButton").style.display = "none"; // Hide Next Button
}

// Reset Trivia
function resetTrivia() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById("nextButton").style.display = "inline-block"; // Show Next Button again
    document.getElementById("resultContainer").style.display = "none";
}
