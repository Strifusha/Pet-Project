// 1поулчить текст с инпута
    //1.1навесить слушатель
// Сравнить текст с заголовками
    // Пройтись по масиву и сравнить заголвок с текстом 
    // Отфильтровать по совпадению 
            

let comments = [];
let allComments = '';

const getCommentSection = document.getElementById('show-comments');
const getSearchInput = document.getElementById('search');
const getAllComments = document.getElementsByClassName('h3-name');
const getArticle = document.getElementsByClassName('article')


getSearchInput.addEventListener('keyup', filteredBySearch);
getComments();

function filteredBySearch(){
    let searchValue = getSearchInput.value;

    let filteredArr = comments.filter((comment) => {
        return comment.title.match(searchValue)
    });

    console.log('filteredArr--> ', filteredArr)
    getCommentSection.innerHTML = '';
    renderComments(filteredArr);
      
        
        // showNoMatches = () => {
            
        //     for(let i = 0; i < arrTitles.length; i++){ 

        //         getArticle[i].classList.add('closed-article');
        //         const elementsClosedClass = document.querySelectorAll('.closed-article');

        //         getSearchInput.nextElementSibling.classList.remove('show-error')
             
        //         if(arrTitles[i].match(searchValue)){
        //             getArticle[i].classList.remove('closed-article');    
        //         } 

        //         if(elementsClosedClass.length == getArticle.length){
        //             getSearchInput.nextElementSibling.classList.add('show-error')  
        //         }  
        //     } 
        // }
        // showNoMatches();            
}


function getDate(){
    const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]; 
    let myDate = new Date();
    return myDate.getDate() + " " + months[myDate.getMonth()] + ", " + myDate.getHours() + ":" + myDate.getMinutes();
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
        allComments += `<article class='article'>${i}
        <h3 class='h3-name'>${renderComments[i].title}</h3>
        <span class='date'>${getDate()}</span>
        <div class='div-comment'>${renderComments[i].body}</div>
        </article>`; 
    }
    getCommentSection.innerHTML = allComments; 
}

/////////////////////////////////////////////////
function saveComments() {
    const allFields = document.getElementsByClassName('field');
    let userName = '';
    let userComment = ''; 

    let showErrors = () =>{
        
        for (let i = 0; i < allFields.length; i++) {
             
            if(allFields[i].value == '') {
                allFields[i].nextElementSibling.classList.add('show-error'); 
            } else {                  
                userName = allFields[0].value;
                userComment = allFields[1].value;
                allFields[i].nextElementSibling.classList.remove('show-error');                                       
            }  
            //  allFields[i].value = '';              
        }     
           
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

            allComments = `<article class='article'>
                            <h3 class='h3-name'>${comments[i].title}</h3>
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
    