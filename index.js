//      



// Your quizArray remains the same

let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let selectedOption = null;

// const quizArray = [
//   // Your quiz questions and answers here
// ];
const quizArray = [
  {
    id: "0",
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Highly Typed Machine Learning", "Hyperlink and Text Markup Language", "Hyper Transfer Markup Language"],
    correct: "Hyper Text Markup Language",
  },
  {
    id: "1",
    question: "Which CSS property is used for specifying the type of cursor to be displayed when pointing over an element?",
    options: ["cursor-type", "mouse-pointer", "cursor", "pointer-type"],
    correct: "cursor",
  },
  {
    id: "2",
    question: "Which JavaScript keyword is used to declare variables that cannot be changed?",
    options: ["var", "const", "let", "mutable"],
    correct: "const",
  },
  {
    id: "3",
    question: "Which HTML tag is used for creating a hyperlink?",
    options: ["<a>", "<link>", "<hlink>", "<url>"],
    correct: "<a>",
  },
  {
    id: "4",
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    correct: "Cascading Style Sheets",
  },
  {
    id: "5",
    question: "Which JavaScript method is used for printing content to the console?",
    options: ["console.log()", "print()", "display()", "write()"],
    correct: "console.log()",
  },
  {
    id: "6",
    question: "What is the correct way to comment out multiple lines in CSS?",
    options: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->", "// This is a comment //"],
    correct: "/* This is a comment */",
  },
  {
    id: "7",
    question: "Which HTML tag is used for creating an unordered list?",
    options: ["<ol>", "<dl>", "<list>", "<ul>"],
    correct: "<ul>",
  },
  {
    id: "8",
    question: "What is the purpose of the 'href' attribute in an anchor (<a>) tag?",
    options: ["Specifies the link's target location", "Defines the link's style", "Sets the link's visibility", "Determines the link's color"],
    correct: "Specifies the link's target location",
  },
  {
    id: "9",
    question: "Which JavaScript function is used to add a new HTML element?",
    options: ["createElement()", "addHTML()", "newElement()", "appendElement()"],
    correct: "createElement()",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;

    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");

      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + quizArray.length;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";

      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
      nextBtn.disabled = true; // Disable the "Next" button after submitting
    }
  })
);

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);

  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);

    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `
    <button class="option-div" onclick="selectOption(this)">${i.options[0]}</button>
     <button class="option-div" onclick="selectOption(this)">${i.options[1]}</button>
      <button class="option-div" onclick="selectOption(this)">${i.options[2]}</button>
       <button class="option-div" onclick="selectOption(this)">${i.options[3]}</button>
    `;

    quizContainer.appendChild(div);
  }
}

function selectOption(option) {
  const previousSelectedOption = selectedOption;
  if (previousSelectedOption) {
    previousSelectedOption.disabled = false;
    previousSelectedOption.style.backgroundColor = "white";
  }
  option.disabled = true;
  option.style.backgroundColor = "#0a69ed";
  selectedOption = option;
  nextBtn.disabled = false; // Enable the "Next" button after selecting an option
}

function checker(userOption) {
  userOption.disabled = false;
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");

    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  clearInterval(countdown);
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
  nextBtn.disabled = true;
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
