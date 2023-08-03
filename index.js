const http = require("http").createServer();

//import socket io
//it's a function that takes the http server as an argument
//we are accessing the backend from a frontend browser application
const io = require("socket.io")(http, {
  //* allows any URL to access our backend URL

  cors: { origin: "*" },
});

//socket io is an event based system
//the first event we want to listen for is a connection from the client
io.on("connection", (socket) => {
  console.log("a user connected");
  //the callback gives us access to the socket object, where we can listen to any custom event we want
  //in this case, message is the event
  socket.on("message", (message) => {
    console.log(message);
    //remit the message so it's broadcast out to everybody
    io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
  });
});

http.listen(8080, () => console.log("listening on http://localhost:8080"));
