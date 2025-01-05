document.getElementById("create-room-form").onsubmit = async (e) => {
  e.preventDefault();
  const roomName = document.getElementById("roomName").value;
  const creatorUuid = localStorage.getItem("userUuid"); // 로그인 시 저장된 UUID

  if (!creatorUuid) {
    alert("로그인이 필요합니다.");
    window.location.href = "/";
    return;
  }

  const response = await fetch("http://localhost:3000/chat-room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: roomName, creatorUuid }),
  });

  if (response.ok) {
    alert("채팅방이 생성되었습니다!");
    window.location.href = "room-list.html";
  } else {
    const result = await response.json();
    alert(result.message || "채팅방 생성 실패!");
  }
};
