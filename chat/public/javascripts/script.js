const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  console.log("Sale "+ typeof(msg.data));
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  console.log(JSON.parse("algo"));
  fetch('http://localhost:3000/chat/api/messages', {
        method: "POST",
        body: JSON.parse(message.value)
    })
    .then(response => response)
    .then(data => console.log(data))
  ws.send(message.value);
  message.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
