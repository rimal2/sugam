
 var name = window. prompt("Enter your name: "); alert("Your name is " + name);

const batch = 533;
// using endpoint ':channel/messages'
const baseUrl = `https://wagon-chat.herokuapp.com/${batch}/messages`;

// selecting the elements
const refreshBtn = document.getElementById("refresh");
const listOfMessages = document.getElementById("list");
const comment = document.getElementById("your-message");
const sender = document.getElementById("your-name");
const submitBtn = document.getElementById("submit");

// http GET request to refresh the list of comments
const refreshChat = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then((data) => {
      // to clean the list and avoid repetition
      listOfMessages.innerHTML = "";
      // digging into the json
      const messages = data.messages;
      messages.forEach((message) => {
        const content = message.content;
        const author = message.author;
        const minutesAgo = Math.round((new Date() - new Date(message.created_at)) / 60000);
        const fullMessage = `<li>${message.content}   [${author}]</li>`;
        listOfMessages.insertAdjacentHTML("afterbegin", fullMessage);
      });
    });
};

refreshBtn.addEventListener("click", refreshChat);

// http POST request to write messages, send them to the API and display them in the chat
const postMessage = () => {
  const myMessage = { author: sender.value, content: comment.value };
  console.log(myMessage);
  fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(myMessage)
  })
    // parse response as a json
    .then(response => response.json())
    .then((data) => {
      refreshChat();
    });
};

submitBtn.addEventListener("click", (event) => {
  // avoid the default behavior of page loading
  event.preventDefault();
  postMessage();
});

// refresh the app automatically
document.addEventListener("DOMContentLoaded", refreshChat);
