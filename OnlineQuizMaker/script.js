let quizData = [];

function addQuestion() {
  const container = document.createElement('div');
  container.className = 'question';

  const qInput = document.createElement('input');
  qInput.placeholder = 'Enter your question';
  qInput.className = 'question-text';

  const answers = [];
  for (let i = 0; i < 4; i++) {
    const input = document.createElement('input');
    input.placeholder = `Answer ${i + 1}`;
    input.className = 'answer';
    container.appendChild(input);
    container.appendChild(document.createElement('br'));
  }

  const correctAnswer = document.createElement('input');
  correctAnswer.placeholder = 'Correct Answer (1-4)';
  correctAnswer.className = 'correct';

  container.appendChild(qInput);
  container.appendChild(document.createElement('br'));
  container.appendChild(correctAnswer);

  document.getElementById('questions').appendChild(container);
}

function startQuiz() {
  quizData = [];
  const questionDivs = document.querySelectorAll('.question');
  questionDivs.forEach((q) => {
    const text = q.querySelector('.question-text').value;
    const answers = Array.from(q.querySelectorAll('.answer')).map(a => a.value);
    const correctIndex = parseInt(q.querySelector('.correct').value) - 1;

    if (text && answers.every(a => a) && correctIndex >= 0 && correctIndex < 4) {
      quizData.push({ question: text, answers, correct: correctIndex });
    }
  });

  if (quizData.length > 0) {
    document.getElementById('create-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    renderQuiz();
  } else {
    alert('Please add at least one valid question.');
  }
}

function renderQuiz() {
  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = '';
  quizData.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    const title = document.createElement('h4');
    title.textContent = `${i + 1}. ${q.question}`;
    div.appendChild(title);

    q.answers.forEach((a, j) => {
      const label = document.createElement('label');
      label.className = 'answer-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${i}`;
      input.value = j;
      label.appendChild(input);
      label.appendChild(document.createTextNode(a));
      div.appendChild(label);
      div.appendChild(document.createElement('br'));
    });

    quizContainer.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;
  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && parseInt(selected.value) === q.correct) {
      score++;
    }
  });

  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  document.getElementById('score').textContent = `You scored ${score} out of ${quizData.length}`;
}

function restart() {
  document.getElementById('questions').innerHTML = '';
  document.getElementById('quiz').innerHTML = '';
  document.getElementById('score').textContent = '';
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('create-section').style.display = 'block';
}
