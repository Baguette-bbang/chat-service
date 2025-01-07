// 채팅방 목록 불러오기 및 클릭 시 채팅방 이동
async function fetchChatRooms() {
  const response = await fetch("http://localhost:3000/chat-room");
  const rooms = await response.json();

  const list = document.getElementById("chat-room-list");
  list.innerHTML = rooms
    .map(
      (room) => `
        <li>
          <a href="chat-room.html?roomId=${room.id}">
            ${room.name} (참가자: ${room.participantCount})
          </a>
        </li>
      `
    )
    .join("");
}

fetchChatRooms();
