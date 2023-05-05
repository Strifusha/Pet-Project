let comments = [];
let allComments = '';

const getCommentSection = document.getElementById('show-comments');
const getSearchInput = document.getElementById('search');
const getArticle = document.getElementsByTagName('article');

const allDeleteButtons = document.getElementsByClassName('delete-comment');


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
    const getSelectDate = document.getElementById('select-date');
    const selectedOption = getSelectDate.options[getSelectDate.selectedIndex];
    
        if(selectedOption.value === 'up'){
            getCommentSection.innerHTML = '';
            comments.reverse()
            //old comments
            renderComments(comments);
        } 
        if(selectedOption.value === 'down'){
            //new comments
            let rendered = comments.reverse();
            getCommentSection.innerHTML = '';
            renderComments(rendered);
       }
}

// function getDate(){
//     const months = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"]; 
//     let myDate = new Date();
//     let hours = myDate.getHours();
//     let minute = myDate.getMinutes();
    
//     if(hours < 10){
//         hours = '0' + hours;
//     }
//     if(minute < 10){
//         minute = '0' + minute;
//     }
    
//     return myDate.getDate() + " " + months[myDate.getMonth()] + ", " + hours + ":" + minute;
// }

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
            console.log('data--> ', data)
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
        <span class='date'>${renderComments[i].time}</span>
        <div class='div-comment'>${renderComments[i].body}</div>
        <button class='delete-comment' data-id='${renderComments[i].id}'>Delete</button>
        </article>`; 
        getCommentSection.innerHTML += allComments; 
    }
    
}

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

// comments.forEach((article) => {
//     console.log(article);})

// function addDeleteBtn() {
//     //const getArticles = Array.from(getCommentSection.children);
//     //  console.log(getArticles);

//      comments.forEach((article) => {
//         //console.log(article);
//          //console.log(article.textContent);

//         // let deleteBtn = document.createElement('button');
//         // deleteBtn.classList.add('delete-button');
//         // deleteBtn.textContent = 'Delete';
        
//         // deleteBtn.addEventListener('click', () => {
//         //     article.remove();
//         // })

//         // article.appendChild(deleteBtn);
//      });

//      renderComments()


// }
// addDeleteBtn()
//     const saveBtn = document.getElementById('comment-save');
//     saveBtn.addEventListener('click', saveComments);
    