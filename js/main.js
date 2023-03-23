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
// }]

const showErrName = document.querySelector('div.error.error-name');
const showErrComment = document.querySelector('div.error.error-comment');

function saveComments() {
    const userName = document.getElementById('user-name').value;
    const commentText = document.getElementById('comment-text').value;

    let comments = [];
    if(userName.length === 0 || commentText.length === 0) {
        showErrName.style.display = 'block';
        showErrComment.style.display = 'block';
    } else { 
        pushObjInArr = (useName, comment, date) => {
        return {
            useName: userName,
            comment: commentText,
            date: Date(),
            }
    
        }
        comments.push(pushObjInArr());
        console.log(comments);
    

        //comments.push({useName: `${userName}`, comment: `${commentText}`, date: Date()});
        // console.log(comments[0].useName);
    };


    /////////////////
    const getCommentSection = document.getElementById('show-comments');
    
    let createNewParagraph = document.createElement('p');
    createNewParagraph = getCommentSection.appendChild(createNewParagraph);

    let comment = comments[0].useName + '<br>' +
                  comments[0].comment + '<br>' +
                  comments[0].date;

    createNewParagraph.innerHTML = comment;
      
}

const saveBtn = document.getElementById('comment-save');
saveBtn.addEventListener('click', saveComments)

