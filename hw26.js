const postContainer = document.getElementById('post-container');
const postIdInput = document.getElementById('post-id');
const searchBtn = document.getElementById('search-btn');

function inputValidation(){
    if (postIdInput.value === ``){
        postIdInput.style.borderColor = `red`;
    } else if (postIdInput.value > 100){
        postIdInput.style.borderColor = `red`;
    } else if (postIdInput.value < 1){
        postIdInput.style.borderColor = `red`;
    } else {
        postIdInput.style.borderColor = `rgb(133, 133, 133)`;
    }
}

const renderPost = function (postData) {
    const postHtml = `
    <div>
      <h2>${postData.title}</h2>
      <p>${postData.body}</p>
      <button id="comments-btn">View comments</button>
    </div>
  `;
    postContainer.innerHTML = postHtml;

    const commentsBtn = document.getElementById('comments-btn');
    commentsBtn.addEventListener('click',  () => {
        fetchComments();
    });
}

const fetchPostById = async function(){
    try{
        const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!posts.ok) {
            throw new Error(`Post request failed!`);
        }
        await posts.json();

        const post = await fetch (`https://jsonplaceholder.typicode.com/posts/${postIdInput.value}`);
        if (!post.ok) {
            throw new Error(`Id request failed!`);
        }
        const postData = await post.json();

        renderPost(postData);
    } catch (err) {
        console.log(`${err}`);
    }
};

const fetchComments = async function(){
    try{
        const comments = await fetch (`https://jsonplaceholder.typicode.com/posts/${postIdInput.value}/comments`);
        if (!comments.ok) {
            throw new Error(`Comments request failed!`);
        }
        const commentsData = await comments.json();
        const commentsDiv = document.createElement(`div`);
        for (let i = 0; i < commentsData.length; i++){
            commentsDiv.innerHTML = commentsDiv.innerHTML + `
        <div>
          <h3>${commentsData[i].name}</h3>
          <p>${commentsData[i].body}</p>
        </div>
        `;
        }
        postContainer.append(commentsDiv);
    } catch (err) {
        console.log(`${err}`);
    }
}

searchBtn.addEventListener('click', () => {
    inputValidation();
    fetchPostById();
});