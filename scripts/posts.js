// This file is responsible for interfacing with the local storage and contains methods to get data from the storage, add/remove data from the storage and update data in the storage

// Default storage for when local storage is empty
let defaultStorage = [
  {
    postId: 1,
    postTitle: "Post 1",
    postDate: "2023-02-08",
    postSummary:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ea laudantium magni veniam expedita at facere voluptatem fugiat quam quas dolorum magnam perspiciatis dicta, officia quibusdam? Officiis, aliquid. Facilis, totam?",
  },
  {
    postId: 2,
    postTitle: "Post 2",
    postDate: "2023-02-08",
    postSummary:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ea laudantium magni veniam expedita at facere voluptatem fugiat quam quas dolorum magnam perspiciatis dicta, officia quibusdam? Officiis, aliquid. Facilis, totam?",
  },
  {
    postId: 3,
    postTitle: "Post 3",
    postDate: "2023-02-08",
    postSummary:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ea laudantium magni veniam expedita at facere voluptatem fugiat quam quas dolorum magnam perspiciatis dicta, officia quibusdam? Officiis, aliquid. Facilis, totam?",
  },
];

//the current storage
var storage;
//the id to assign new items
var currentId;

function initStorage() {
  //initialize storage with the saved local storage if it exists, otherwise initialize to default
  storage = JSON.parse(localStorage.getItem("post-list"));
  if (!storage || storage.length == 0) {
    storage = defaultStorage;
  }
  currentId = JSON.parse(localStorage.getItem("current-id")) || 4;
}

//return all the posts in the current storage
function getPosts() {
  return storage;
}

//return a post with the specified postId if it exists
function getPost(postId) {
  let id = Number(postId);
  return storage.find((post) => Number(post.postId) === id);
}

//delete the post with the postId from the current storage, then update the local storage
function deletePost(postId) {
  postId = Number(postId);
  storage = storage.filter((elem) => {
    return elem.postId !== postId;
  });
  console.log(storage);
  localStorage.setItem("post-list", JSON.stringify(storage));
}

//create a post with the given arguments, add it to the current storage, then update the local storage
function createPost(post) {
  currentId++;
  let newId = currentId;
  post = { postId: newId, ...post };
  storage = [...storage, post];
  console.log(storage);
  localStorage.setItem("post-list", JSON.stringify(storage));
  localStorage.setItem("current-id", JSON.stringify(currentId));
  return post;
}

//update the given post, replace it in the current storage, then update the local storage
function editPost(post) {
  post.postId = Number(post.postId);
  let index = storage.findIndex((elem) => {
    return elem.postId === post.postId;
  });

  storage[index] = post;
  console.log(storage);
  localStorage.setItem("post-list", JSON.stringify(storage));
}

export { initStorage, getPosts, createPost, deletePost, editPost, getPost };
