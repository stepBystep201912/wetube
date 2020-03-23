import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delCommentBtn = document.querySelectorAll("button");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, videoId, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;

  //button(name="delCommentBtn", v_id=video.id, c_id=comment.id, class="del") ❌
  const delBtn = document.createElement("button");
  delBtn.name = "delCommentBtn";
  delBtn.setAttribute("class", "del");
  delBtn.setAttribute("v_id", videoId);
  delBtn.setAttribute("c_id", commentId);
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", delComment);
  li.appendChild(span);
  li.appendChild(delBtn);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log("response", response);
  if (response.status === 200) {
    const commentId = response.data;
    addComment(comment, videoId, commentId);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

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
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}

function init2() {
  delCommentBtn.forEach(btn => {
    btn.addEventListener("click", delComment);
  });
}

if (delCommentBtn) {
  init2();
}
