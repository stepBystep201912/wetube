import axios from "axios";

const delCommentBtn = document.querySelectorAll("button");
const commentList = document.getElementById("jsCommentList");

const delComment = async event => {
  const videoId = event.target.attributes[2].value;
  const commentId = event.target.attributes[3].value;

  const response = await axios({
    url: `/api/${videoId}/comment/${commentId}`,
    method: "POST",
    data: {
      vid: videoId,
      cid: commentId
    }
  });
  console.log(response);

  if (response.status === 200) {
    const li = event.target.parentNode;
    commentList.removeChild(li);
  }
};

function init() {
  delCommentBtn.forEach(btn => {
    btn.addEventListener("click", delComment);
  });
}

if (delCommentBtn) {
  init();
}
