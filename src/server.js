const express = require("express");
const app = express();

//TODO Import Routes
const postRoutes = require("./routes/post");

//TODO Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TODO Setup PORT
const PORT = process.env.PORT || 3000;

//TODO Routes
app.use("/api/posts", postRoutes);

//TODO Homepage
app.get("/", (req, res) => res.send("Homepage!"));

//TODO Start server
app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
