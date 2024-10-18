const users = {
    'Riley6784': 'password1',
    'Cici4571': 'password2'
};

const quizzes = {
    quiz1: [
        {question: "(1) Which Instrument Is Percussion", answers: ["Drumkit", "Guitar", "Bass", "Keyboard", "Vocals"], correct: 0},
        {question: "(2) Which instrument is not a rythm instrument", answers: ["Keyboard", "Trumpet", "Guitar", "Drumkit", "Bass"], correct: 1},
        {question: "(3) Which time signiture is a polyrythm", answers: ["3/4", "4/4", "2/4", "2/2", "2/3"], correct: 4},
        {question: "(4) Whats the most used time signiture in Rock music", answers: ["8/8", "6/8", "4/4", "3/4", "2/4"], correct: 2},
        {question: "(5) What is the most important scale", answers: ["Diatonic Scale", "Pentatonic Scale", "C Major Scale", "Minor Scale", "Major Scale"], correct: 4},
        {question: "(6) How many strings does a standard bass have", answers: ["6", "4", "5"], correct: 1},
        {question: "(7) What Saxaphone is the lowest pitched", answers: ["Soprano", "Alto", "Tenor", "Baritone"], correct: 3},
        {question: "(8) How many Rack toms does a standard drumkit have", answers: ["4", "3", "1", "2", "5"], correct: 1},
        {question: "(9) How many keys does a full size piano have", answers: ["90", "70", "66", "88", "58"], correct: 3},
        {question: "(10) How many strings does a standard guitar have", answers: ["5", "12", "6", "4"], correct: 2}
    ],
    quiz2: [
        {question: "Question 1?", answers: ["A", "B", "C", "D", "E"], correct: 0},
        {question: "Question 2?", answers: ["A", "B", "C", "D", "E"], correct: 1},
        {question: "Question 3?", answers: ["A", "B", "C", "D", "E"], correct: 2},
        {question: "Question 4?", answers: ["A", "B", "C", "D", "E"], correct: 3},
        {question: "Question 5?", answers: ["A", "B", "C", "D", "E"], correct: 4},
        {question: "Question 6?", answers: ["A", "B", "C", "D", "E"], correct: 0},
        {question: "Question 7?", answers: ["A", "B", "C", "D", "E"], correct: 1},
        {question: "Question 8?", answers: ["A", "B", "C", "D", "E"], correct: 2},
        {question: "Question 9?", answers: ["A", "B", "C", "D", "E"], correct: 3},
        {question: "Question 10?", answers: ["A", "B", "C", "D", "E"], correct: 4}
    ]
};

let currentQuiz = null;
let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    if (users[username]) {
        currentUser = username;
        document.getElementById('user-name').textContent = username;
        showPage('home-page');
    } else {
        alert('Invalid username!');
    }
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function startQuiz(quizId) {
    currentQuiz = quizId;
    const quiz = quizzes[quizId];
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    quiz.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>${q.question}</h3>
            <div class="answers">
                ${q.answers.map((answer, i) => `<label><input type="radio" name="q${index}" value="${i}"> ${answer}</label>`).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
    showPage('quiz-page');
}

function submitQuiz() {
    const quiz = quizzes[currentQuiz];
    let score = 0;
    quiz.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });
    const percentage = (score / quiz.length) * 100;
    document.getElementById('score').textContent = `You got ${score} out of ${quiz.length} correct (${percentage}%)`;
    showPage('results-page');
}

function goHome() {
    showPage('home-page');
}

let timer;
let timeLeft = 300; // 5 minutes = 300 seconds

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Your quiz will be submitted automatically.');
            submitQuiz(); // Function to handle quiz submission
        } else {
            displayTime();
            timeLeft--;
        }
    }, 1000);
}

function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function submitQuiz() {
    // Implement the function to handle quiz submission here
    // For example, it can be similar to what you already have in your quiz submission logic
    alert("Quiz submitted!"); // Placeholder alert for submission
    // Call whatever function you use to evaluate the quiz and display results here
}
