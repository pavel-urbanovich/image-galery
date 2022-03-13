const searchBtn = document.querySelector('.glass');
const imageWrapper = document.querySelector('.images-wrapper');
const input = document.querySelector('.input');
const logo = document.querySelector('.logo');
let value;

value = localStorage.getItem('value', value);
if (!value) {
    value = 'Java script';
}

async function getData() {
    logoRotate()
    const url = `https://api.unsplash.com/search/photos?query=${value}&orientation=landscape&tag_mode=all&extras=url_m&per_page=30&client_id=WkjYQ6Mv1-GMKwrDYxrfJgm0xp7XKrkmMW0k79ENaRc`;
    const res = await fetch(url);
    const data = await res.json();
    return   data.results.length === 0 ? addNotification() :  data.results.forEach(item => addImages(item.urls.regular));
}

getData();

function addImages(url) {
    imageWrapper.classList.remove('notification')
    const img = document.createElement('img');
    img.classList.add('photos');
    img.src = `${url}`;
    img.alt = 'photo';
    imageWrapper.append(img);
}

function getSearchData() {
    value = input.value;
    imageWrapper.innerHTML = '';
    getData();
}

function getSearchDataEnter(event) {
    if (event.keyCode === 13) {
        value = input.value;
        imageWrapper.innerHTML = '';
        getData();
    }
}

searchBtn.addEventListener('click', getSearchData);
input.addEventListener('keydown', getSearchDataEnter);

function setLocalStorage() {
    localStorage.setItem('value', value);
}

window.addEventListener('beforeunload', setLocalStorage);

function logoRotate() {
    logo.classList.add('rotate');
    setTimeout(() => logo.classList.remove('rotate'), 500);
}

function addNotification() {
    const div = document.createElement('div');
    div.classList.add('notification');
    div.innerText = 'There is no information for this request';
    imageWrapper.append(div);
    imageWrapper.classList.add('notification');
}

console.log('Cамооценка - 60 баллов (выполнены все требования)\nВёрстка +10 на странице есть есть фотографии и строка поиска +5 в футере приложения есть ссылка на гитхаб, год создания приложения, логотип курса со ссылкой на курс +5\nПри загрузке приложения на странице отображаются полученные от API изображения +10\nЕсли в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\nПоиск +30 (при открытии приложения курсор находится в поле ввода +5\nесть placeholder +5, автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\nпоисковый запрос можно отправить нажатием клавиши Enter +5,\nпосле отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5,\nв поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5)\nвысокое качество оформления приложения и дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\nверстка адаптивна до разрешения 320px, добавлено сохранение в localStorage (за исключением когда пользователь ввел неправильный запрос или API не располагает сведениями),\nдобавлена анимация логотипа при запросе, добавлено уведомление когда API не располагает сведениями или запрос некорректный')

