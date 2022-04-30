// DOM
let startButton = document.querySelector('.start-btn button');
let rulesBox = document.querySelector('.rules-box');
let exitButton = document.querySelector('.exit-button');
let questions = document.querySelector('.questions');
let continueButton = document.querySelector('.continue-button');
let appBody = document.querySelector('.app');
let nextQuestion = document.querySelector('.next-question');
let answerList = document.querySelector('.answer-list');
let timeCount = document.querySelector('.timer .seconds');
let timeLine = document.querySelector('.question-header .timeline');
let questionCount = document.querySelector('.question-count');
let resultBox = document.querySelector('.result-box');
let restartQuiz = document.querySelector('.restart-quiz');
let quitQuiz = document.querySelector('.quit-quiz');
let score = document.querySelector('.score');


// Variables
let timeValue = 15;
let questionLength = 0;
let checkIcon = `<div class="check icon"><i class="fa-solid fa-check"></i></div>`;
let crossIcon = `<div class="cross icon"><i class="fa-solid fa-xmark"></i></div>`;
let counter;
let counterLine;
let timelineWidth = 0;
let userScore = 0;


//events
startButton.addEventListener('click', () =>{
    rulesBox.classList.add('show-rules-box');
    appBody.classList.add('hide-app');
});

exitButton.addEventListener('click', ()=>{
    rulesBox.classList.remove('show-rules-box');
    appBody.classList.remove('hide-app');
})

continueButton.addEventListener('click', ()=>{
    rulesBox.classList.remove('show-rules-box');
    questions.classList.add('show-questions');
    appBody.classList.add('hide-app');
    showQuestions(0);
    setTimer(15);
    setTimeLine(timelineWidth);
})


restartQuiz.addEventListener('click', ()=>{
    questionLength = 0;
    userScore = 0;
    resultBox.classList.remove('show-result-box');
    rulesBox.classList.remove('show-rules-box');
    questions.classList.add('show-questions');
    appBody.classList.add('hide-app');
    showQuestions(0);
    setTimer(15);
    setTimeLine(timelineWidth);
})


nextQuestion.addEventListener('click', ()=>{
    if(questionLength < questionsData.length -1){
        questionLength ++;
        showQuestions(questionLength);
        clearInterval(counter);
        setTimer(timeValue);
        clearInterval(counterLine);
        setTimeLine(timelineWidth);
        nextQuestion.style.display = 'none';
    }else{
        showResultBox();
    }
})

quitQuiz.addEventListener('click', ()=>{
    window.location.reload();
})



// functions.
function showQuestions(index){
    let questionTitle = document.querySelector('.question-body-title');
    let questionTiletText = `<span>${questionsData[index].number}.  ${questionsData[index].question}</span>`;
    questionTitle.innerHTML = questionTiletText;

    let answerList = document.querySelector('.answer-list');
    let answersText = 
        `<div class="answers"><span>${questionsData[index].options[0]}</span></div>
        <div class="answers"><span>${questionsData[index].options[1]}</span></div>
        <div class="answers"><span>${questionsData[index].options[2]}</span></div>
        <div class="answers"><span>${questionsData[index].options[3]}</span></div>`;
    answerList.innerHTML = answersText;

    let questionCount = document.querySelector('.question-count');
    let questionCountText = `<p>${questionsData[index].number} of 5 Questions</p>`;
    questionCount.innerHTML = questionCountText;

    let answerOptions = answerList.querySelectorAll('.answers');
    for(let i = 0; i < answerOptions.length; i++){
        answerOptions[i].setAttribute('onclick', "validate(this)");
    }
}



function validate(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questionsData[questionLength].answer;
    let allOptions = answerList.children.length;

    if(userAnswer == correctAnswer){
        userScore++;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', checkIcon);
    }else{
        answer.classList.add('wrong');
        answer.insertAdjacentHTML('beforeend', crossIcon);
        for(let i = 0; i < allOptions; i++){
            if(answerList.children[i].textContent == correctAnswer){
                answerList.children[i].setAttribute('class', 'answers correct');
                answerList.children[i].insertAdjacentHTML('beforeend', checkIcon);
            }
        }
    }

    for(let i = 0; i < allOptions; i++){
        answerList.children[i].classList.add('disabled');
    }
    nextQuestion.style.display = 'block';
}


function setTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;

        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = 0 + addZero;

            if(time < 0){
                clearInterval(timer);
                timeCount.textContent = '00';
                nextQuestion.style.display = 'block';
                let allOptions = answerList.children.length;
                for(let i = 0; i < allOptions; i++){
                    answerList.children[i].classList.add('disabled');
                }
            }
        }
    }
}


function setTimeLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time++;
        timeLine.style.width = time + 'px';
        if(time > 319){
            clearInterval(counterLine);
        }
    }
}


function showResultBox(){
    resultBox.classList.add('show-result-box');
    rulesBox.classList.remove('show-rules-box');
    questions.classList.remove('show-questions');
    appBody.classList.add('hide-app');

    if(userScore > 3){
        let scoreText = `<span>Congratulations..!! You Got <p>${userScore}</p> Out of <p>${questionsData.length}</p></span>`;
        score.innerHTML = scoreText;
    }else if(userScore > 1){
        let scoreText = `<span>Carry On..!! You Got <p>${userScore}</p> Out of <p>${questionsData.length}</p></span>`;
        score.innerHTML = scoreText; 
    }else{
        let scoreText = `<span>Sorry..!! You Got <p>${userScore}</p> Out of <p>${questionsData.length}</p></span>`;
        score.innerHTML = scoreText;
    }
}