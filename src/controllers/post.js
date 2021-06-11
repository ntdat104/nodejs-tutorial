const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function readDB() {
  return JSON.parse(fs.readFileSync("src/db.json", { encoding: "utf8" }));
}

function writeDB(value) {
  const valueString = JSON.stringify(value);
  fs.writeFileSync("src/db.json", valueString, {
    encoding: "utf8",
  });
}

const POSTS = readDB();

module.exports.getAllPosts = (req, res) => {
  res.status(200).json(POSTS);
};

module.exports.getPost = (req, res) => {
  const { id } = req.params;
  const postSearch = POSTS.find((post) => post.id == id);
  res.status(200).json(postSearch);
};

module.exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const date = new Date();
  const post = {
    id: uuidv4(),
    title: title || "title",
    content: content || "content",
    createAt: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
  };
  const newPOSTS = [...POSTS, post];
  writeDB(newPOSTS);
  res.status(201).json(post);
};

module.exports.deletePost = (req, res) => {
  const { id } = req.params;
  let postDelete = {};
  const newPOSTS = POSTS.filter((post) => {
    if (post.id === id) {
      postDelete = post;
    }
    return post.id !== id;
  });
  writeDB(newPOSTS);
  res.json(postDelete);
};

module.exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const newPOSTS = [];
  let updatePost = {};
  POSTS.forEach((post) => {
    if (post.id === id) {
      post.title = title || "title";
      post.content = content || "content";
      updatePost = post;
    }
    newPOSTS.push(post);
  });
  writeDB(newPOSTS);
  res.json(updatePost);
};
