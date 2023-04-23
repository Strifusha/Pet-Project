let comments = [];
const getCommentSection = document.getElementById('show-comments');
let allComments = '';


function postServerData(){
   
    let status = function(response){
        if(response.status !== 200){
            return Promise.reject(new Error(response.statusText))
        }
        return Promise.resolve(response)
    };
    let json = function(response){
        return response.json();
    }

    fetch('http://www.mocky.io/v2/5944e07213000038025b6f30')
        .then(status)
        .then(json)
        .then(function(data){
            comments.push(data)
               
            
            for(let i = 0; i < data.length; i++){

                allComments += `<article>
                <h3 class='h3-name'>${data[i].title}</h3>
                <span class='date'>${new Date()}</span>
                <div class='div-comment'>${data[i].body}</div>
                </article>`; 
         
            }
            getCommentSection.innerHTML = allComments; 
        })
        .catch(function(error){
            console.log('error-->', error)
        })
    console.log('comments', comments)
}
    postServerData();
    




/////////////////////////////////////////////////
function saveComments() {
    const allFields = document.getElementsByClassName('field');
    let userName = '';
    let userComment = ''; 

    let showErrors = () =>{
        for (let i = 0; i < allFields.length; i++) {
            if(allFields[i].value == '') {
                allFields[i].nextElementSibling.classList.add('show-error');
                allFields[i].value = ''; 
              } else {   
                userName = allFields[0].value;
                userComment = allFields[1].value;
                allFields[i].nextElementSibling.classList.remove('show-error');
                 }        
            };                 
        }  
    showErrors();
 

    const isHasError =  document.querySelectorAll('.show-error');
    if (isHasError.length) return;

    const createComment = () => {
        return {
            'title': userName.trim(),
            'body': userComment.trim(),
            date: new Date(),
        }   
    }

    const newComment = createComment(userName, userComment)
    comments.push(newComment);


    const showComment = () => {


        for(let i = 0; i < comments.length; i++) {

            allComments = `<article>
                            <h3 class='h3-name'>${comments[i].title}</h3>
                            <span class='date'>${comments[i].date}</span>
                            <div class='div-comment'>${comments[i].body}</div>
                            </article>`; 
            }   
            getCommentSection.innerHTML += allComments; 
        
             
         
    }
    showComment();

}   

    const saveBtn = document.getElementById('comment-save');
    saveBtn.addEventListener('click', saveComments);
    
