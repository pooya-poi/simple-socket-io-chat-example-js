const express = require("express")
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
	// res.send("<h1>Hello World</h1>");
	res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
	console.log("a user Connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	})
	socket.on("chatMessage", (msg) => {
		// console.log("message:" + msg);
		io.emit("chatMessage", msg);
	})
})


server.listen(4000, () => {
	console.log("Server is running on port 4000");
});

