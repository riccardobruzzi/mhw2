/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function resetQuiz(){
    for (const key in userAnswers) {
        delete userAnswers[key];
    }
    const notShow = document.querySelector('#result');
    notShow.classList.add('hidden');
    for (const box of boxes) {
        box.classList.remove('opacity');
        box.classList.remove('selected');
        box.addEventListener('click', onBoxClick);
        box.querySelector('.checkbox').src = "images/unchecked.png";
    }

}
function resultfunction(){
    if(userAnswers.two === userAnswers.three)
        return userAnswers.two;
    return userAnswers.one;
}

function showResult(key){
    const show = document.querySelector('#result');
    show.querySelector('h1').textContent = RESULTS_MAP[key].title;
    show.querySelector('p').textContent = RESULTS_MAP[key].contents;
    show.classList.remove('hidden');
    const button = document.querySelector('#button');
    button.addEventListener('click',resetQuiz);
}

function opacity(selected){
    //devo nascondere tutte le schede tranne qulla selezionata
    const userAnswerId = selected.dataset.choiceId;
    //ottengo la lista dei div
    const answers = selected.parentNode.querySelectorAll('div');
    for (const ans of answers) {
        if(ans.dataset.choiceId !== userAnswerId){
            ans.classList.add('opacity');
            ans.querySelector('.checkbox').src = "images/unchecked.png";
            ans.classList.remove('selected');
        }
    }
}

function onBoxClick(event){
    const box = event.currentTarget;
    // inserisco checkbox
    box.querySelector('.checkbox').src = "images/checked.png";
    //abilito lo stile selected
    box.classList.add('selected');
    //rimuovo l'opaco se avevo già scelto una risposta
    box.classList.remove('opacity');
    opacity(box);
    //memorizzo la risposta dell'utente nella mappa
    userAnswers[box.dataset.questionId] = box.dataset.choiceId;
    //mostro il risultato se ho avuto 3 scelte
    if(userAnswers.one && userAnswers.two && userAnswers.three){
        for (const box of boxes) {
            box.removeEventListener('click',onBoxClick);
        }
        showResult(resultfunction());
    }
}

const userAnswers = {}; 

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
    box.addEventListener('click', onBoxClick);
}
