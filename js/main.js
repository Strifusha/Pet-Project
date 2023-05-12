let comments = [];
let allComments = '';

let deletedItemArr = [];
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

const getSelectDate = document.getElementById('select-date');
getSelectDate.addEventListener('change', filteredByDate);

function filteredByDate(){
    const selectedOption = getSelectDate.options[getSelectDate.selectedIndex];

    comments.sort((a, b) => {
        const [dayA, monthA, yearA] = a.time.split(".");
        const [dayB, monthB, yearB] = b.time.split(".");
      
        const dateA = new Date(`${monthA}/${dayA}/${yearA}`);
        const dateB = new Date(`${monthB}/${dayB}/${yearB}`);
       
        if(selectedOption.value === 'up'){
            //old comments
            getCommentSection.innerHTML = '';
            return dateB - dateA;
        }
        if(selectedOption.value === 'down'){
            //new comments
            getCommentSection.innerHTML = '';
            return dateA - dateB;
        }   
    });
    renderComments(comments);
} 

function getDate(){
    let myDate = new Date();
    let day = myDate.getDate();
    let months = myDate.getMonth();
    let year = myDate.getFullYear()

    months = ++months;
    if(day < 10){
        day = '0' + day;
    }

    if(months < 10){
        months = '0' + months;
    }
    return day + "." + months + "." + year;

}

function responseStatus(response){
    if(response.status !== 200){
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}

function json(response){
    return response.json();
}

function getComments(){
    fetch('https://run.mocky.io/v3/95fc487f-cc77-4965-824f-c13b582983c0')
        .then(responseStatus)
        .then(json)
        .then(function(data){
            comments.push(...data);
            renderComments(comments);
            console.log('comments before', comments) 
            
        })
        .catch(function(error){
            console.log('error-->', error)
        })
}

function renderComments(renderComments) {
    getCommentSection.innerHTML = '';
    
    for(let i = 0; i < renderComments.length; i++){
   
        allComments = `<article>
        <h3 class='titleName'>${renderComments[i].title}</h3>
        <span class='date'>${renderComments[i].time}</span>
        <div class='div-comment'>${renderComments[i].body}</div>
        <button class='delete-comment' data-id='${renderComments[i].id}'>Delete</button>
        </article>`; 
        getCommentSection.innerHTML += allComments; 
    }

    let  allDeleteButtons = document.getElementsByClassName('delete-comment');

    for (let i = 0; i < allDeleteButtons.length; i++) {
        allDeleteButtons[i].addEventListener("click", deletePost);
    } 
}
    

function saveComments() {
    let userName = '';
    let userComment = ''; 
    
    const allFields = document.getElementsByClassName('field');
    let commentInfo = {}

    for (let i = 0; i < allFields.length; i++) {  
        commentInfo[allFields[i].getAttribute('data-name')] = allFields[i].value       
    }   

    userName = commentInfo.title;
    userComment = commentInfo.text; 

    showErrors(allFields);

    const isHasError =  document.querySelectorAll('.show-error');
    if (isHasError.length) return;

    let currentId = comments.length + 1;
    
    const newComment = {
        'body': userComment.trim(),
        'id': currentId,
        'time': getDate(),
        'title': userName.trim(),
    }
    
    comments.push(newComment);

    renderComments(comments);
}   



function deletePost(event) {
    let postId = event.target.getAttribute('data-id');
    let indexInPosts = comments.findIndex((post) => post.id == postId)

     comments.splice(indexInPosts, 1);
     renderComments(comments);
}


function showErrors() {
    const allFields = document.getElementsByClassName('field');

    for (let i = 0; i < allFields.length; i++) {
        if(allFields[i].value !== ''){         
            allFields[i].nextElementSibling.classList.remove('show-error');                                         
        } else {
            allFields[i].nextElementSibling.classList.add('show-error');   
        }          
    }   
}  

const saveBtn = document.getElementById('comment-save');
saveBtn.addEventListener('click', saveComments);
    