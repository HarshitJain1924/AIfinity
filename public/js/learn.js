document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var audioFile = document.getElementById('audioFile').files[0];
    var pdfFile = document.getElementById('pdfFile').files[0];
    
    var pointsEarned = 0;
    
    if (audioFile || pdfFile) {
        // Give 10 points for uploading either audio or PDF
        pointsEarned += 10;
    }
    
    if (audioFile && pdfFile) {
        // Give additional 10 points if both audio and PDF are uploaded
        pointsEarned += 10;
    }
    
    if (pointsEarned > 0) {
        // Simulating upload process
        setTimeout(function() {
            // Increase points by pointsEarned upon successful upload
            var points = parseInt(localStorage.getItem('points')) || 0;
            points += pointsEarned;
            localStorage.setItem('points', points);

            //update submenu points
            document.getElementById('subMenuPoints').textContent = points;
            // Display success message
            document.getElementById('message').textContent = 'Files uploaded successfully! You earned ' + pointsEarned + ' points.';
        }, 2000);
    } else {
        // Display error message if no files are selected
        document.getElementById('message').textContent = 'Please select at least one file to upload.';
    }
});
// Quiz data
const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Markup Leveler"],
        answer: 0
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["color", "text-color", "font-color", "text-style"],
        answer: 0
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "variable"],
        answer: 0
    },
    {
        question: "Which framework is used for building server-side applications in JavaScript?",
        options: ["Express.js", "React.js", "Angular.js", "Vue.js"],
        answer: 0
    }
    // Add more quiz questions here
];

// Function to generate quiz
function generateQuiz() {
    const quizContainer = document.getElementById("quiz");
    const resultElement = document.getElementById("result");

    // Display each question
    quizData.forEach((quiz, index) => {
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        const question = document.createElement("div");
        question.classList.add("question");
        question.textContent = "Question " + (index + 1) + ": " + quiz.question;
        questionContainer.appendChild(question);

        const optionsElement = document.createElement("div");
        optionsElement.classList.add("options");

        // Display options for each question
        quiz.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement("label");
            optionLabel.classList.add("option-label");
            optionLabel.textContent = option;
            optionLabel.addEventListener("click", () => {
                handleOptionClick(index, optionIndex);
            });

            const optionInput = document.createElement("input");
            optionInput.classList.add("option-input");
            optionInput.type = "radio";
            optionInput.name = "question" + index;
            optionInput.value = optionIndex;

            optionLabel.appendChild(optionInput);
            optionsElement.appendChild(optionLabel);
        });

        questionContainer.appendChild(optionsElement);
        quizContainer.appendChild(questionContainer);
    });

    // Add event listener to the submit button
    const submitButton = document.createElement("button");
    submitButton.id = "submit";
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
        calculateScore();
        
    });
    quizContainer.appendChild(submitButton);

    // Function to handle option click
    function handleOptionClick(questionIndex, optionIndex) {
        const optionLabels = document.querySelectorAll('.options')[questionIndex].querySelectorAll('.option-label');
        optionLabels.forEach(label => {
            label.classList.remove('selected');
        });
        optionLabels[optionIndex].classList.add('selected');

        const radioButtons = document.querySelectorAll('input[name="question' + questionIndex + '"]');
        radioButtons.forEach(button => {
            button.checked = false;
        });
        radioButtons[optionIndex].checked = true;
    }

    // Function to calculate score
    function calculateScore() {
        const radios = document.querySelectorAll('input[type="radio"]:checked');
        let score = 0;

        radios.forEach((radio, index) => {
            const questionIndex = parseInt(radio.name.replace("question", ""));
            const selectedOptionIndex = parseInt(radio.value);
            const correctOptionIndex = quizData[questionIndex].answer;

            if (selectedOptionIndex === correctOptionIndex) {
                score++;
            }
        });

        resultElement.textContent = "Your score: " + score + "/" + quizData.length;
        console.log(score)
    }
}

// Generate the quiz
generateQuiz();

// Async function to send score to the server
async function sendScoreToServer(score) {
    try {
        const response = await fetch('/submit-score', { // Adjust the URL as required
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score: score })
        });

        const data = await response.json();
        console.log('Score submitted successfully:', data);
    } catch (error) {
        console.error('Error submitting score:', error);
    }
}

// Function to reset local storage
function resetLocalStorage() {
    localStorage.removeItem('points');
    // Update submenu to display zero points next to user's name
    document.getElementById('subMenuPoints').textContent = '0';
    console.log('Local storage reset successfully');
}