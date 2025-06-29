// Store all flashcards
let cards = JSON.parse(localStorage.getItem('flashcards')) || [];

// DOM elements
const cardForm = document.getElementById('cardForm');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const cardsList = document.getElementById('cardsList');

const studyQuestion = document.getElementById('studyQuestion');
const studyAnswer = document.getElementById('studyAnswer');
const showAnswerBtn = document.getElementById('showAnswer');
const nextCardBtn = document.getElementById('nextCard');

let currentStudyIndex = null;

// Initial render
renderCards();

// Add new card
cardForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const newCard = {
    question: questionInput.value.trim(),
    answer: answerInput.value.trim()
  };
  cards.push(newCard);
  saveCards();
  renderCards();
  cardForm.reset();
});

// Save to LocalStorage
function saveCards() {
  localStorage.setItem('flashcards', JSON.stringify(cards));
}

// Render all cards
function renderCards() {
  cardsList.innerHTML = '';
  cards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const q = document.createElement('p');
    q.textContent = `Q: ${card.question}`;

    const a = document.createElement('p');
    a.textContent = `A: ${card.answer}`;

    const btns = document.createElement('div');
    btns.classList.add('buttons');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => editCard(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteCard(index));

    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

    cardDiv.appendChild(q);
    cardDiv.appendChild(a);
    cardDiv.appendChild(btns);

    cardsList.appendChild(cardDiv);
  });
}

// Delete card
function deleteCard(index) {
  if (confirm('Delete this card?')) {
    cards.splice(index, 1);
    saveCards();
    renderCards();
  }
}

// Edit card
function editCard(index) {
  const card = cards[index];
  questionInput.value = card.question;
  answerInput.value = card.answer;
  cards.splice(index, 1);
  saveCards();
  renderCards();
}

// Study Mode
showAnswerBtn.addEventListener('click', () => {
  studyAnswer.classList.toggle('hidden');
});

nextCardBtn.addEventListener('click', () => {
  if (cards.length === 0) {
    studyQuestion.textContent = "No cards available!";
    studyAnswer.textContent = "";
    return;
  }
  currentStudyIndex = Math.floor(Math.random() * cards.length);
  studyQuestion.textContent = `Q: ${cards[currentStudyIndex].question}`;
  studyAnswer.textContent = `A: ${cards[currentStudyIndex].answer}`;
  studyAnswer.classList.add('hidden');
});
