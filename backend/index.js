"use strict";
const app = require("./app");

//routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const mycommunity = require("./routes/mycommunity");
const community = require("./routes/createcommunity");
const moderation = require("./routes/moderation");
const chat = require("./routes/chat");
const invitation = require("./routes/invitation");

const communityhome = require("./routes/communityHome");
const communityhome1 = require("./routes/communityhome1");
const imageUpload = require("./routes/uploads");
const getImage = require("./routes/images");

app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/profile", profile);
app.use("/api/createcommunity", community);
app.use("/api/mycommunity", mycommunity);
app.use("/api/moderation", moderation);
app.use("/chat", chat);
app.use("/invitation", invitation);
app.use("/api/communityhome1", communityhome1);
app.use("/api/uploads", imageUpload);
app.use("/api/images", getImage);

app.use("/api/communityhome", communityhome);

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
