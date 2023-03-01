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

var storage;
var currentId;

function initStorage() {
  storage = JSON.parse(localStorage.getItem("post-list"));
  if (!storage || storage.length == 0) {
    storage = defaultStorage;
  }
  currentId = JSON.parse(localStorage.getItem("current-id")) || 4;
}

function getPosts() {
  return storage;
}

function getPost(postId) {
  let id = Number(postId);
  return storage.find((post) => Number(post.postId) === id);
}

function deletePost(postId) {
  //delete litem from array
  postId = Number(postId);
  storage = storage.filter((elem) => {
    return elem.postId !== postId;
  });
  console.log(storage);
  localStorage.setItem("post-list", JSON.stringify(storage));
}

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
