import getPosts from "./index.js";
const baseURL = "http://likelion-toyproject.kro.kr:8000/post/"

const deletePost = async (e) => {
    let delId = e.target.parentElement.id;
    let pw = parseInt(prompt('비밀번호를 입력해주세요'));

    //delPost는 삭제할 게시물 전체 div 가르킴.
    const throwDel = {
        "password" : pw
    };
    await fetch( `${baseURL}${delId}/`,{
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
        },
            body: JSON.stringify(throwDel)
    });
    getPosts();
    //반영 내용 update되도록
}

export default deletePost;
