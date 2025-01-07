const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get("roomId");
const chatBox = document.getElementById("chat-box");
const roomName = document.getElementById("room-name");
const userUuid = localStorage.getItem("userUuid");

// 채팅방 정보 및 메시지 불러오기
async function loadChatRoom() {
  const response = await fetch(`http://localhost:3000/chat-room/${roomId}`);
  const room = await response.json();

  if (!room) {
    alert("채팅방을 찾을 수 없습니다.");
    window.location.href = "room-list.html";
    return;
  }

  roomName.textContent = room.name;

  const messages = await fetch(`http://localhost:3000/message/${roomId}`);
  const chatMessages = await messages.json();

  chatBox.innerHTML = chatMessages
    .map((msg) => {
      const isMyMessage = msg.senderUuid === userUuid;
      return `
        <div class="message ${isMyMessage ? "my-message" : "other-message"}">
          <span>${msg.nickname}:</span> ${msg.content}
        </div>
      `;
    })
    .join("");
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 메시지 전송
document.getElementById("chat-form").onsubmit = async (e) => {
  e.preventDefault();
  const message = document.getElementById("message").value;
  // senderUuid가 없으면 로그인 페이지로 리다이렉트
  if (!userUuid) {
    alert("로그인이 필요합니다.");
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(`http://localhost:3000/message/${roomId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message, senderUuid: userUuid }),
  });

  if (response.ok) {
    document.getElementById("message").value = "";
    await loadChatRoom(); // 메시지 전송 후 다시 메시지 불러오기
  } else {
    alert("메시지 전송 실패");
  }
};

loadChatRoom();
