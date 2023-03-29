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
    const userSurname = document.getElementById('user-surname');
    const commentText = document.getElementById('comment-text');

    const userNameValue = userName.value;
    const userSurnameValue = userSurname.value
    const commentTextValue = commentText.value;

    const isHasError = checkErrors(userNameValue, userSurnameValue, commentTextValue);
    if (isHasError) return;

    const newComment = createComment(userNameValue, userSurnameValue, commentTextValue);

    comments.push(newComment);
    userName.value = '';
    userSurname.value = '';
    commentText.value = '';

    renderComments();
}

const createComment = (useName, useSurname, comment) => {
    return {
        'useName': useName.trim(),
        'useSurname' : useSurname.trim(),
        'comment': comment.trim(),
        date: new Date(),
        }
}

const renderComments = () => {

    const getCommentSection = document.getElementById('show-comments');

    let allComments = '';

    for(let i = 0; i < comments.length; i++) {

        allComments += `<article>
                    <h4>${comments[i].useName} ${comments[i].useSurname}</h4>
                    <span>${comments[i].date}</span>
                    <div>${comments[i].comment}</div>
                </article>`;
    }
    
    getCommentSection.innerHTML = allComments;

}

const checkErrors = (userNameValue, userSurnameValue, commentTextValue) => {
    
    let showErr = document.querySelectorAll('.error');
    
          showErr.forEach(function(showErr, index) {

            showErr.classList.remove('show-error');
            
            if (userNameValue.length == 0 && index === 0) {
                showErr.classList.add('show-error');
            }
            if (userSurnameValue.length == 0 && index === 1) {
                showErr.classList.add('show-error');
            }
            if (commentTextValue.length == 0 && index === 2) {
                showErr.classList.add('show-error');
            }
            return
        })
 };

const saveBtn = document.getElementById('comment-save');
saveBtn.addEventListener('click', saveComments);
