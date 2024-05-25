import getPosts from "./index.js";
const baseURL = "http://likelion-toyproject.kro.kr:8000/post/"

async function postData(e, formData){
    //서버에 보낼 데이터 구성
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });

    //fetch API를 이용해 보낼거임, JSON 형태임을 명시
    await fetch( `${baseURL}`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(requestData)
    });

    getPosts();

}


export default postData;