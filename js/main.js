// 1. Найти кнопку
// 2. навесить обработчик события
// 3. Получить данные с формы
//     3.1 Проверка на пустоту имя и комметарий
//    3.2 Добавить дату публикации
// 4. Записат в масив комментариев
// 5. Вывести на страницу
//     5.1 Сортировка,


// var comments = [{
//     useName: '',
//     comment: 'dsfsdf',
//     date: '23.03.2023'
// }, {
//     useName: '',
//     comment: 'dsfsdf',
//     date: '23.03.2023'
// }, {
//     useName: '',
//     comment: 'dsfsdf',
//     date: '23.03.2023'
// }]


function saveComments() {
    const userName = document.getElementById('user-name');
}

const saveBtn = document.getElementById('comment-save');

saveBtn.addEventListener('click', saveComments)

