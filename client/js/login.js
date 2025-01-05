document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  try {
    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!userId || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 로그인 요청
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("로그인 성공!");
      localStorage.setItem("chat-username", result.nickname);
      localStorage.setItem("userUuid", result.userUuid);
      window.location.href = "room-list.html";
    } else {
      alert(result.message || "로그인 실패");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
