const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// Находим элементы
const headerContainer = document.querySelector('#header'),
	listContainer = document.querySelector('#list'),
	submitBtn = document.querySelector('#submit');

// Переменные игры
let score = 0; // Сколько правильных ответов
let questionIndex = 0; // Номер вопроса

clearPage();
showQuestion();
submitBtn.addEventListener('click', checkAnswer);

// Очищаем страницу
function clearPage() {
	headerContainer.innerHTML = "";
	listContainer.innerHTML = "";
}


function showQuestion() {
	// Title
	headerContainer.innerHTML = `<h2 class="title">${questions[questionIndex]['question']}</h2>`;

	// Перебор вариантов ответа
	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
		const answerTemplate = `
		<li>
			<label>
				<input value="${++index}" type="radio" class="answer" name="answer" />
				<span>${answerText}</span>
			</label>
		</li>`

		listContainer.innerHTML += answerTemplate;
	}
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	// Выбран ли ответ
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	if (parseInt(checkedRadio.value) === questions[questionIndex]['correct']) {
		score++;
	}

	if (questions.length - 1 !== questionIndex) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	console.log('score = ' + score);

	let resultsTitle;
	let resultsMessage;

	if (score == questions.length) {
		resultsTitle = "Красава";
		resultsMessage = "Ты короче молодец, правильно на всё ответил";
	} else if (0 < score < questions.length) {
		resultsTitle = "Среднячок";
		resultsMessage = "Ты короче нормальный";
	} else if (score == 0) {
		resultsTitle = "Лох";
		resultsMessage = "Ты короче ваще не молодец";
	}

	const resultsTemplate = `
		<h2 class="title">${resultsTitle}</h2>
		<h3 class="summary">${resultsMessage}</h3>
		<p class="result">Правильных ответов: ${score}</p>
	`;

	headerContainer.innerHTML = resultsTemplate;
	submitBtn.blur();
	submitBtn.textContent = "Ещё раз";
	submitBtn.addEventListener('click', () => {
		location.reload();
	});
}