const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function readDB() {
	return JSON.parse(fs.readFileSync("src/db.json", { encoding: "utf8" }));
}

function writeDB(value) {
	const valueString = JSON.stringify(value);
	fs.writeFileSync("src/db.json", valueString, { encoding: "utf8" });
}

const POSTS = readDB();

module.exports.getAllPosts = (req, res) => {
	res.json(POSTS);
};

module.exports.getPost = (req, res) => {
	const { id } = req.params;
	const postSearch = POSTS.find((post) => post.id == id);
	res.json(postSearch);
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
	res.send(`Thêm bài đăng thành công!`);
};

module.exports.deletePost = (req, res) => {
	const { id } = req.params;
	const newPOSTS = POSTS.filter((post) => post.id !== id);
	writeDB(newPOSTS);
	res.send(`Xóa bài đăng thành công!`);
};

module.exports.updatePost = (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;
	const newPOSTS = [];
	POSTS.forEach((post) => {
		if (post.id === id) {
			post.title = title || "title";
			post.content = content || "content";
		}
		newPOSTS.push(post);
	});
	writeDB(newPOSTS);
	res.send(`Cập nhật bài đăng thành công!`);
};
