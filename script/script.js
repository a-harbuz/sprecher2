document.addEventListener('DOMContentLoaded', function () {
    var textContainer = document.getElementById('text-container');
    var sentences = document.getElementsByClassName('sentence');

    // Добавляем кнопку после каждого предложения
    for (var i = 0; i < sentences.length; i++) {
        var button = document.createElement('button');
        button.innerText = 'btn ' + (i + 1);
        button.addEventListener('click', function () {
            alert('Вы нажали кнопку!');
        });

        sentences[i].appendChild(button);
    }
});
// =================================================================
function speak(text) { 
    // Сам синтезатор
    const message = new SpeechSynthesisUtterance();
    //message.lang = "de-DE";
    const combobox = document.getElementById('comboSound').value;
    if (combobox == 'DE') {
        message.lang = "de-DE";
    } else {
        message.lang = "en-EN";
    }
    message.text = text;
    window.speechSynthesis.speak(message)
}

function speakWithPause(text) {
    // Произнести с паузой после каждого предложения
    let textArea = document.querySelector('.textarea1');
    let words = textArea.value.split('\n'); // \n .
    speak(words[0]);
    for (let i=1; i<words.length; i++){
        setTimeout(function(){
            speak(words[i]);
        }, 11000*i);
        // !! доработать паузы между фразами !!!
    }

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while ((currentDate - date) < milliseconds);
  }
// =================================================================
function highlightText(sentenceClass) {  //Обработчик - ondblclick
    //var textElement = document.getElementById('text');
    let textElement = document.querySelector(sentenceClass);
    textElement.classList.toggle('highlighted');

    var range = document.createRange();
    range.selectNodeContents(textElement);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    speak(window.getSelection());
}

function splitt(arg) { //Разделяет текст на строки
    let textElement = document.querySelector(arg);
    let words = textElement.innerText.split('\n');
    console.log(words[0]);
    //let textArea = document.querySelector('.w3review');
    for (let i=0; i<words.length; i++){
        //alert(words[i]);
        console.log(words[i]);
        //textArea.innerHTML.valueOf = 'AAA';
    }
    
}  
// =================================================================
function split2old() { //Разделяет текст на строки (\n)
    clearP(); //очищаем экран от карточек
    // в окошке слева
    let textArea = document.querySelector('.textarea1');
    let words = textArea.value.split('\n'); // \n .
    //console.log(words[1]);
    for (let i=0; i<words.length; i++){
        //console.log(words[i]);
        addP('.div2',words[i],i);
    }
    //addP('.div2','New Txt'); // параметры вызова функции

    // в окошке справа
    textArea = document.querySelector('.textarea2');
    words = textArea.value.split('\n');
    //console.log(words[1]);
    for (let i=0; i<words.length; i++){
        //console.log(words[i]);
        addP('.div3',words[i],i);
    }
}  

function split2() { //Разделяет текст на строки (\n)
    clearP(); //очищаем экран от карточек
    let textArea1 = document.querySelector('.textarea1');
    let wordsF = textArea1.value.split('\n');
    let textArea2 = document.querySelector('.textarea2');
    let wordsB = textArea2.value.split('\n');

    for (let i = 0; i < wordsF.length; i++){
        // console.log(wordsF[i] + '   ' + wordsB[i]);
        addCards(wordsF[i], wordsB[i]);
    }    
} 

function split3old() { //Разделяет текст на строки (.)
    clearP(); //очищаем экран от карточек
    let textArea = document.querySelector('.textarea1');
    let words = textArea.value.split('.'); // \n .
    for (let i = 0; i < words.length; i++){
        addP('.div2', words[i], i);
    }

    textArea = document.querySelector('.textarea2');
    words = textArea.value.split('\n');
    for (let i = 0; i < words.length; i++){
        addP('.div3', words[i], i);
    }
}

function split3() { //Разделяет текст на строки (.)
    clearP(); //очищаем экран от карточек
    let textArea1 = document.querySelector('.textarea1');
    let wordsF = textArea1.value.replace(/\s+/g, ' ').split('.');
    let textArea2 = document.querySelector('.textarea2');
    let wordsB = textArea2.value.replace(/\s+/g, ' ').split('.');

    for (let i = 0; i < wordsF.length; i++){
        // console.log(wordsF[i] + '   ' + wordsB[i]);
        addCards(wordsF[i] + '.', wordsB[i] + '.');
    }
}

function split4() { //Разделяет текст на строки (.)
    let textArea1 = document.querySelector('.textarea1');
    let wordsF = textArea1.value.replace(/\s+/g, ' ').split('.');
    let textArea2 = document.querySelector('.textarea2');
    let wordsB = textArea2.value.replace(/\s+/g, ' ').split('.');

    //очищаем textarea1 & 2
    textArea1.value = '';
    textArea2.value = '';

    for (let i = 0; i < wordsF.length; i++){
        //addCards(wordsF[i] + '.', wordsB[i] + '.');
        textArea1.value += wordsF[i].trimStart() + '.' + '\n';
    }
}
// ==========================================================================
 
function addP(nameSelector,newTxt,i){
    // Создание нового элемента <p>
    var newParagraph = document.createElement('p');
    //var newParagraph1 = document.createElement('p');

    // Добавление текста в новый элемент
    var textNode = document.createTextNode(newTxt);
    newParagraph.appendChild(textNode);
    // Уст.доп.атрибуты
    newParagraph.setAttribute('class','sent'+i);
    let attr = `highlightText('.sent${i}')`
    newParagraph.setAttribute('ondblclick',attr);
    newParagraph.setAttribute('style','margin: 15px 5px'); // отступы параграфов

    // Получение ссылки на блок <div>
    var myDiv = document.querySelector(nameSelector);

    // Добавление нового элемента <p> в блок <div>
    myDiv.appendChild(newParagraph);
    //myDiv.append(newParagraph, newParagraph1);
}

function clearP(){
    let pAll = document.querySelectorAll('p');
    for(let i=0; i<pAll.length; i++){
        // console.log(pAll[i].innerText);
        pAll[i].remove();

    }
    //location.reload();
    clearCard();
}

function clearCard(){
    let pAll = document.querySelectorAll('.card');
    for(let i=0; i<pAll.length; i++){
        pAll[i].remove();
    }
}
// ==========================================================================
function countWords(){
// разделение текста на слова,поиск совпадений и группировка
clearP(); //очищаем экран
let allWords = [];
let count = 0;
let countuniq = 0;
let textArea = document.querySelector('.textarea1');
let str = textArea.value.split('\n');

     for (let i=0; i<str.length; i++){
        // разделяем на слова
         let words = str[i].split(' ');
         for (let y=0; y<words.length; y++){
             count++;
            //обрабатываем каждое слово
            if (allWords.includes(words[y]) == false){
                allWords.push(words[y]);
                countuniq++;
            }
         }
    }

    //allWords.sort(); // сортировка по алфавиту
    allWords.unshift('Уникальных слов: '+countuniq);
    allWords.unshift('Всего слов в тексте: '+count);
    //Вывод массива на экран
    for (let i=0; i<allWords.length; i++){
        addP('.div2',allWords[i],i);
    }
}
// ==========================================================================

function addCards(textFront, textBack) {
    //формирование карточек на экране
    const container = document.getElementById('card-container');
    
    const card = document.createElement('div');

    var combobox = document.getElementById('comboDirection').value;
    if (combobox == 'revers') {
        card.className = 'card flipped';
    } else {
        card.className = 'card';
    }

    card.setAttribute('data-word', textFront);
    card.setAttribute('data-translation', textBack);
    //cards var.1
    card.innerHTML = `
        <div class="front">
            <span>${textFront}</span>
            <button class="speak" onclick="speak('${textFront}')">🔊</button>
            <button class="close-btn">&times</button>
        </div>
        <div class="back">
            <span>${textBack}</span>
        </div>
    `;
    //<button class="speak" onclick="speak('${textBack}')">🔊</button>

    combobox = document.getElementById('myCombobox').value;
    if (combobox == 'var.2') {
        //cards var.2
        card.innerHTML = `
        <div class="card-content">
            <span class="translation">${textBack}</span>
            <span class="word">${textFront}</span>
            <button class="speak" onclick="speak('${textFront}')">🔊</button>
            <button class="close-btn">&times;</button>
        </div>
        `;
    }

    // Добавляем событие для переворота карточки
    card.addEventListener('click', function() {
        card.classList.toggle('flipped');
    });
    // Добавляем событие для удаления карточки
    card.querySelector('.close-btn').addEventListener('click', function(event) {
        event.stopPropagation();  // Предотвращаем переворот карточки
        container.removeChild(card);  // Удаляем карточку
    });
    
    container.appendChild(card);

    // Добавление обработчика события click для кнопки speak
    const speakButton = card.querySelector('.speak');
    speakButton.addEventListener('click', function(event) {
        event.stopPropagation(); // предотвращает всплытие события click
    });
}

// ==========================================================================
