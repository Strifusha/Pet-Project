// 1поулчить текст с инпута
    //1.1навесить слушатель
// Сравнить текст с заголовками
    // Пройтись по масиву и сравнить заголвок с текстом 
    // Отфильтровать по совпадению 
            

let comments = [];
let allComments = '';

const getCommentSection = document.getElementById('show-comments');
const getSearchInput = document.getElementById('search');
const getArticle = document.getElementsByTagName('article');


getSearchInput.addEventListener('keyup', filteredBySearch);
getComments();

function filteredBySearch(){
    let searchValue = getSearchInput.value;
    
    let filteredArr = comments.filter((comment) => {
        return comment.title.match(searchValue)
    });

    let showNoMatches = document.getElementById('no-matches');
    showNoMatches.classList.remove('show-error');

    if (filteredArr.length === 0){
        showNoMatches.classList.add('show-error');
    }

    getCommentSection.innerHTML = '';
    renderComments(filteredArr);          
}


function getDate(){
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]; 
    let myDate = new Date();
    let hours = myDate.getHours();
    let randomMinute = Math.floor(Math.random() * 60);

    if(hours < 10){
        hours = '0' + hours;
    }
    if(randomMinute < 10){
        randomMinute = '0' + randomMinute;
    }
    
    return myDate.getDate() + " " + months[myDate.getMonth()] + ", " + myDate.getHours() + ":" + randomMinute;
}

function responseStatus(response){
    if(response.status !== 200){
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
};
    function json(response){
    return response.json();
}

function getComments(){
    fetch('http://www.mocky.io/v2/5944e07213000038025b6f30')
        .then(responseStatus)
        .then(json)
        .then(function(data){
            comments.push(...data)
            renderComments(comments);
            
        })
        .catch(function(error){
            console.log('error-->', error)
        })
}

function renderComments(renderComments) {
   
    for(let i = 0; i < renderComments.length; i++){
    
        allComments = `<article>
        <h3 class='titleName'>${renderComments[i].title}</h3>
        <span class='date'>${getDate()}</span>
        <div class='div-comment'>${renderComments[i].body}</div>
        </article>`; 
        getCommentSection.innerHTML += allComments; 
    }
    
}

/////////////////////////////////////////////////
function saveComments() {
    const allFields = document.getElementsByClassName('field');
    let userName = '';
    let userComment = ''; 

    let showErrors = () =>{
        
        for (let i = 0; i < allFields.length; i++) {
            
            if(allFields[i].value !== ''){   
                userName = allFields[0].value;
                userComment = allFields[1].value;       
                allFields[i].nextElementSibling.classList.remove('show-error');                                         
            } 

            if(allFields[i].value == '') {
                allFields[i].nextElementSibling.classList.add('show-error');   
            }          
        }   
         
        // allFields.value = ''; 
    
    }  
    showErrors();

    const isHasError =  document.querySelectorAll('.show-error');
    if (isHasError.length) return;

    const createComment = () => {
        return {
            'title': userName.trim(),
            'body': userComment.trim(),
        }   
    }

    const newComment = createComment(userName, userComment)
    comments.push(newComment);


    const showComment = () => {
        for(let i = 0; i < comments.length; i++) {

            allComments = `<article>
                            <h3 class='titleName'>${comments[i].title}</h3>
                            <span class='date'>${getDate()}</span>
                            <div class='div-comment'>${comments[i].body}</div>
                            </article>`; 
        }   
            getCommentSection.innerHTML += allComments;     
    }
    showComment();
}   

    const saveBtn = document.getElementById('comment-save');
    saveBtn.addEventListener('click', saveComments);
    