// 1. Найти кнопку
// 2. навесить обработчик события
// 3. Получить данные с формы
//     3.1 Проверка на пустоту имя и комметарий
//    3.2 Добавить дату публикации
// 4. Записат в масив комментариев
//    4.1 Очистить поля ввожа
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
// }]

let comments = [];

function saveComments() {

    const userName = document.getElementById('user-name');
    const commentText = document.getElementById('comment-text');

    const userNameValue = userName.value;
    const commentTextValue = commentText.value;

    const isHasError = checkErrors(userNameValue, commentTextValue);
    if (isHasError) return;

    const newComment = createComment(userNameValue, commentTextValue);

    comments.push(newComment);
    userName.value = '';
    commentText.value = '';

    renderComments();
}

const createComment = (useName, comment) => {
    return {
        'useName': useName.trim(),
        'comment': comment.trim(),
        date: new Date(),
        }
}

const renderComments = () => {

    const getCommentSection = document.getElementById('show-comments');

    let allComments = '';

    for(let i = 0; i < comments.length; i++) {

        allComments += `<article>
                    <h4>${comments[i].useName}</h4>
                    <span>${comments[i].date}</span>
                    <div>${comments[i].comment}</div>
                </article>`;
    }
    
    getCommentSection.innerHTML = allComments;

}

const checkErrors = (userNameValue, commentTextValue) => {

    const showErrName = document.querySelector('.error-name');
    const showErrComment = document.querySelector('.error-comment');

    showErrName.classList.remove('show-error');
    showErrComment.classList.remove('show-error');

    if (userNameValue.length == 0) {
        showErrName.classList.add('show-error');
    }
    if (commentTextValue.length == 0) {
        showErrComment.classList.add('show-error');
    }

   return userNameValue.length == 0 || commentTextValue.length == 0;
};


const saveBtn = document.getElementById('comment-save');
saveBtn.addEventListener('click', saveComments)

