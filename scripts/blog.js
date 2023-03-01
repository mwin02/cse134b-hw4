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
  //initialize the storage by retrieving local storage information
  initStorage();

  let list = document.getElementById("post-list");
  let postList = getPosts();
  if (postList.length == 0) {
    showEmptyMessage(true);
  } else {
    showEmptyMessage(false);
  }
  currentMode = mode;

  //populate the unordered list element with the contents of the post database
  postList.forEach(({ postId, postTitle, postDate, postSummary }) => {
    let litem = createListItem(postId, postTitle, postDate, postSummary);
    list.appendChild(litem);
  });

  let addBtn = document.getElementById("add-post");
  addBtn.addEventListener("click", onAddClicked);

  //promptDialog responsible for creating/editing posts returning with value "confirm" means that a save button was clicked
  let promptDialog = document.getElementById("prompt");
  promptDialog.addEventListener("close", () => {
    if (promptDialog.returnValue == "confirm") {
      onDialogSubmit();
    }
    resetFields();
  });

  //confirmDialog responsible for deleting posts returning with value "confirm" means that a delete button was clicked
  let confirmDialog = document.getElementById("confirm");
  confirmDialog.addEventListener("close", () => {
    if (confirmDialog.returnValue == "confirm") {
      onDeleteSubmit();
    }
  });
}

//display or hide the empty message
function showEmptyMessage(showMessage) {
  let message = document.getElementById("empty-message");
  if (showMessage) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

//creates a list item that displays the post information and has an edit and delete button
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

//when add is clicked, display the create new post prompt
function onAddClicked() {
  let hidden = document.getElementById("post-id");
  hidden.value = "no-val";
  createPrompt();
}

//when edit is clicked, populate the values of the new post prompt and display it
function onEditClicked(postId) {
  let hidden = document.getElementById("post-id");
  hidden.value = `${postId}`;
  let postToEdit = getPost(postId);
  createPrompt(postToEdit);
}

//when delete is clicked, display the confirm prompt
function onDeleteClicked(postId) {
  let deleteConfirm = document.getElementById("confirm");
  deleteConfirm.showModal();
  document.getElementById("delete-id").value = postId;
}

//when delete is confirmed on the dialog, remove the list item from the list and update the storage
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

//when a save is confirmed, get the new post and create it if it is a new post or update if it it was an edit
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

//add a new post to the list and update the local storage
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

//edit the post in the list and update the local storage
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

//displays the prompt with any specified values
function createPrompt(post) {
  let dialog = document.getElementById("prompt");
  dialog.showModal();
  if (post) {
    document.getElementById("title").value = post.postTitle;
    document.getElementById("date").value = post.postDate;
    document.getElementById("summary").value = post.postSummary;
  }
}

//creates a button with specifed text in "simple" mode or icons in "styled" mode
function createButton(buttonText) {
  let button = document.createElement("button");
  button.type = "button";
  if (currentMode == "simple") {
    button.innerText = buttonText;
  } else if (currentMode == "styled") {
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
