
let comments = [];

function saveComments() {

    const allFields = document.getElementsByClassName('field');

    const userNameValue = userName.value;
    const userSurnameValue = userSurname.value
    const commentTextValue = commentText.value;

    checkErrors(allFields);

    const isHasError =  document.querySelectorAll('.show-error');
    console.log('isHasError--> ', isHasError);
    if (isHasError.length) return;

    const newComment = createComment(userNameValue, userSurnameValue, commentTextValue);

    comments.push(newComment);
    userName.value = ''; // need refactoring

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

const checkErrors = (allFields) => { 
    
    for(let i = 0; allFields.length > i; i++) {
        console.log('allFields[i]--> ', allFields[i]);
        if(allFields[i].value == '') {
           
            // allFields[i].nextSibling.classList.add('show-error');
        }
    }

 };

const saveBtn = document.getElementById('comment-save');
saveBtn.addEventListener('click', saveComments);


function getComments() {

}

//http://www.mocky.io/v2/5944e07213000038025b6f30