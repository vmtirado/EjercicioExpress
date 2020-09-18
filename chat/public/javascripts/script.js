const ws = new WebSocket("ws://localhost:3000");
let formData=""
ws.onmessage = (msg) => {
  console.log("Sale " +(msg.data));
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const text=message.value;
  console.log(text)
  const sample={ message:message.value,
    author:"Vilma Tirado", 
    ts:Date.now().toString()};
  const json=JSON.stringify(sample)
  console.log(json)
  
  fetch('http://localhost:3000/chat/api/messages', {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err=>data)
  ws.send(message.value);
  message.value = "";
};

const form = document.getElementById("form");
formData= new FormData(form)

form.addEventListener("submit",handleSubmit );
