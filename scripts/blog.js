import {
  initStorage,
  getPosts,
  createPost,
  deletePost,
  editPost,
  getPost,
} from "./posts.js";

var currentMode;

function initialize(mode) {
  initStorage();
  let list = document.getElementById("post-list");
  let postList = getPosts();
  if (postList.length == 0) {
    showEmptyMessage(true);
  } else {
    showEmptyMessage(false);
  }
  currentMode = mode;

  postList.forEach(({ postId, postTitle, postDate, postSummary }) => {
    let litem = createListItem(postId, postTitle, postDate, postSummary);
    list.appendChild(litem);
  });
  let addBtn = document.getElementById("add-post");
  addBtn.addEventListener("click", onAddClicked);

  let promptDialog = document.getElementById("prompt");
  promptDialog.addEventListener("close", () => {
    if (promptDialog.returnValue == "confirm") {
      onDialogSubmit();
    }
    resetFields();
  });

  let confirmDialog = document.getElementById("confirm");
  confirmDialog.addEventListener("close", () => {
    if (confirmDialog.returnValue == "confirm") {
      onDeleteSubmit();
    }
  });
}

function showEmptyMessage(showMessage) {
  let message = document.getElementById("empty-message");
  if (showMessage) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

function createListItem(postId, postTitle, postDate, postSummary) {
  let litem = document.createElement("li");
  litem.innerHTML = `<p>Title: ${postTitle}, Date: ${postDate} </br> Summary: ${postSummary} </br></p>`;
  litem.id = `post-${postId}`;
  let editButton = createButton("edit");
  let deleteButton = createButton("delete");
  litem.appendChild(editButton);
  litem.appendChild(deleteButton);
  editButton.addEventListener("click", () => onEditClicked(postId));
  deleteButton.addEventListener("click", () => onDeleteClicked(postId));
  return litem;
}

function onAddClicked() {
  let hidden = document.getElementById("post-id");
  hidden.value = "no-val";
  createPrompt();
}

function onEditClicked(postId) {
  let hidden = document.getElementById("post-id");
  hidden.value = `${postId}`;
  let postToEdit = getPost(postId);
  createPrompt(postToEdit);
}

function onDeleteClicked(postId) {
  let deleteConfirm = document.getElementById("confirm");
  deleteConfirm.showModal();
  document.getElementById("delete-id").value = postId;
}

function onDeleteSubmit() {
  let postId = document.getElementById("delete-id").value;
  let list = document.getElementById("post-list");
  let litem = document.getElementById(`post-${postId}`);
  list.removeChild(litem);
  deletePost(postId);
  if (getPosts().length == 0) {
    showEmptyMessage(true);
  }
}

function onDialogSubmit() {
  let postTitle = document.getElementById("title").value;
  let postDate = document.getElementById("date").value;
  let postSummary = document.getElementById("summary").value;
  let post = { postTitle, postDate, postSummary };
  if (document.getElementById("post-id").value === "no-val") {
    onAddSubmit(post);
  } else {
    post = { postId: document.getElementById("post-id").value, ...post };
    onEditSubmit(post);
  }
}

function onAddSubmit(postInfo) {
  let postItem = createPost(postInfo);
  let newLitem = createListItem(
    postItem.postId,
    postItem.postTitle,
    postItem.postDate,
    postItem.postSummary
  );
  let list = document.getElementById("post-list");
  list.appendChild(newLitem);
  showEmptyMessage(false);
}

function onEditSubmit(postInfo) {
  editPost(postInfo);
  let oldItem = document.getElementById(`post-${postInfo.postId}`);
  let newItem = createListItem(
    postInfo.postId,
    postInfo.postTitle,
    postInfo.postDate,
    postInfo.postSummary
  );
  oldItem.replaceWith(newItem);
}

function createPrompt(post) {
  let dialog = document.getElementById("prompt");
  dialog.showModal();
  if (post) {
    document.getElementById("title").value = post.postTitle;
    document.getElementById("date").value = post.postDate;
    document.getElementById("summary").value = post.postSummary;
  }
}

function createButton(buttonText) {
  let button = document.createElement("button");
  button.type = "button";
  if (currentMode == "simple") {
    button.innerText = buttonText;
  } else {
    console.log("test");
    let icon = document.createElement("img");
    icon.src = `./images/icons/${buttonText}-icon.png`;
    icon.width = "50";
    icon.height = "50";
    button.appendChild(icon);
  }
  return button;
}

function resetFields() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("summary").value = "";
}

export { initialize };
