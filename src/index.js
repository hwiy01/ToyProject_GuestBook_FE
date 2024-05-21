const baseURL = "http://likelion-toyproject.kro.kr:8000/post/"

//<불러오기 기능>
window.addEventListener("load", ()=>{
    getPosts();
});

async function getPosts() {
    //데이터 불러오기 (body 생략시 GET method로 호출됨)
   const fetchData = await fetch(baseURL);

   const postList = await fetchData.json();

   console.log(postList);
   

   postList.map((data, i) =>{
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

       const toAdd = document.getElementById('newPost');
       toAdd.appendChild(eachPost);
   })

}

//<게시하기 기능>
const form = document.getElementById('makeNew');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); //form 제출시 자동으로 reload됨. 이를 방지
    
    //form안의 데이터를 쉽게 가져오기 위해 FormData 객체 사용
    //form의 name이 key값이 됨!
    const formData = new FormData(form);

    console.log(formData);

    //서버에 보낼 데이터 구성
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });

    //JSON 형태로 바꿔서 보내줄거임
    const toJson = JSON.stringify(requestData);
    console.log(toJson);
    //fetch API를 이용해 보낼거임, JSON 형태임을 명시
    const response = await fetch( `${baseURL}`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: toJson
    });
    //location.reload();
})

//<삭제하기 기능>
const deletePost = async (e) => {
    let delId = e.target.parentElement.id;
    let pw = parseInt(prompt('비밀번호를 입력해주세요'));

    //delPost는 삭제할 게시물 전체 div 가르킴.

    const throwDel = {
        "password" : pw
    };

    const toDelJson = JSON.stringify(throwDel);
    console.log('toDelJson');

    
    const response = await fetch( `${baseURL}${delId}/`,{
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
        },
        body: toDelJson
    });

    if(response.ok) {
        console.log(response.ok);
        //location.reload();
        
    }
    else {
        console.log(response.ok);
        alert('비밀번호가 틀렸습니다.');
    }
    location.reload();
    //반영 내용 update되도록 reload해줌
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

