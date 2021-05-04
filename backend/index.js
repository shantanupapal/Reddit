"use strict";
const app = require("./app");

//routes
const login = require("./routes/login");

app.use("/api/login", login);

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

module.exports = app;
