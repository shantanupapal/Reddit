"use strict";
const app = require("./app");

//routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const mycommunity = require("./routes/mycommunity");
const community = require("./routes/createcommunity");
const moderation = require("./routes/moderation");

app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/profile", profile);
app.use("/api/createcommunity", community);
app.use("/api/mycommunity", mycommunity);
app.use("/api/moderation", moderation);

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
