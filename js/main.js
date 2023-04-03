// 1. Найти кнопку
// 2. навесить обработчик события
// 3. Получить данные с формы
//     3.1 Проверка на пустоту имя и комметарий
//    3.2 Добавить дату публикации
// 4. Записат в масив комментариев
//    4.1 Очистить поля ввожа
// 5. Вывести на страницу
//     5.1 Сортировка,

let comments = [];


function saveComments() {
    const allFields = document.getElementsByClassName('field');
    
    let userName;
    let userSurname;
    let userComment; 

    let showErrors = () =>{
        for (let i = 0; i < allFields.length; i++) {
            if(allFields[i].value == '') {
                allFields[i].nextElementSibling.classList.add('show-error');
                allFields[i].value = ''; 
              } else {   
                userName = allFields[0].value;
                userSurname = allFields[1].value;
                userComment = allFields[2].value;
                allFields[i].nextElementSibling.classList.remove('show-error');
                 }        
            };                 
        }  
    showErrors();
 

    const isHasError =  document.querySelectorAll('.show-error');
    if (isHasError.length) return;

    const createComment = () => {
        return {
            'usName': userName.trim(),
            'surname' : userSurname.trim(),
            'comment': userComment.trim(),
            date: new Date(),
        }   
    }

    const newComment = createComment(userName, userSurname, userComment)
    comments.push(newComment);
    //console.log(comments);


    const showComment = () => {
        const getCommentSection = document.getElementById('show-comments');
            let allComments = '';
            for(let i = 0; i < comments.length; i++) {
            allComments += `<article>
                            <h3>${comments[i].usName} ${comments[i].surname}</h3>
                            <span>${comments[i].date}</span>
                            <div class='div-comment'>${comments[i].comment}</div>
                            </article>`;
        }       
        getCommentSection.innerHTML = allComments;     
    }
    showComment();

}   

    const saveBtn = document.getElementById('comment-save');
    saveBtn.addEventListener('click', saveComments);
    
