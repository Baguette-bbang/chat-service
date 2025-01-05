async function fetchChatRooms() {
  const response = await fetch("http://localhost:3000/chat-room");
  const rooms = await response.json();

  const list = document.getElementById("chat-room-list");
  list.innerHTML = rooms.map((room) => `<li>${room.name} (참가자: ${room.participantCount})</li>`).join("");
}

fetchChatRooms();
