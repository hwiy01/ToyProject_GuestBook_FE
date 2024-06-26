import postData from "./postData";
import deletePost from "./deletePost";

const baseURL = "http://likelion-toyproject.kro.kr:8000/post/"

const getData = document.getElementById('getData');

const toAdd = document.getElementById('madePost');
const form = document.getElementById('makeNew');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const formData = new FormData(form);
    postData(e, formData);
    resetForm();
});

getData.addEventListener("click", ()=>{
    getPosts();
});

async function getPosts(){
    while (toAdd.hasChildNodes()) {
        toAdd.removeChild(toAdd.firstChild);
    }
    //데이터 불러오기 (body 생략시 GET method로 호출됨)
   const fetchData = await fetch(baseURL);

   const postList = await fetchData.json();


    postList.map((data) =>{
        //불러온 데이터 리스트 각각에 대해 DOM 생성
        const eachPost = document.createElement('div');
        eachPost.className = 'eachPost';
        eachPost.id = data.id;
        eachPost.style.backgroundColor = randomBrightColor();
 
        const postHeader = document.createElement('div');
        postHeader.id = 'postHeader';
 
        const postTitle = document.createElement('div');
        postTitle.id = 'postTitle';
 
        const postCreated = document.createElement('div');
        postCreated.id = 'postCreated';
 
        const postContent = document.createElement('div');
        postContent.id = 'postContent';
 
        const postWriter = document.createElement('div');
        postWriter.id = 'postWriter';
 
        const postDelete = document.createElement('button');
        postDelete.className = 'postDelete';
        postDelete.innerText = 'x';
 
        //여기서 이벤트리스너를 등록 -> 삭제하기 기능
         postDelete.addEventListener('click', (element)=> {
             deletePost(element);
         })
 
        const line = document.createElement('hr');
        line.id = 'line';
 
        const parsedDate = parseDate(data.created_at);
 
        //만든 DOM에 내용 작성
        postTitle.innerText = data.title;
        postCreated.innerText = parsedDate;
        postContent.innerText = data.content;
        postWriter.innerText = data.writer;
 
        eachPost.appendChild(postDelete);
        postHeader.appendChild(postTitle);
        postHeader.appendChild(postCreated);
        eachPost.appendChild(postHeader);
        eachPost.appendChild(line);
        eachPost.appendChild(postContent);
        eachPost.appendChild(postWriter);
 
        toAdd.appendChild(eachPost);
    })
}

function resetForm() {
    document.querySelectorAll('input, textarea').forEach((e)=>{
        e.value = '';
    });
}


//이건 그냥 나비보벳따우
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    })
});

//날짜 보기 좋게 파싱
let parseDate = (date) =>{
    var sliced = date.substring(0, 10);
    var result = sliced.replace(/-/g, '/');
    return result;
}
//배경색
const randomBrightColor = () => {
    let color_r = Math.floor(Math.random() * 127 + 128).toString(16);
    let color_g = Math.floor(Math.random() * 127 + 128).toString(16);
    let color_b = Math.floor(Math.random() * 127 + 128).toString(16);
    return `#${color_r+color_g+color_b}`;
}

export default getPosts;
