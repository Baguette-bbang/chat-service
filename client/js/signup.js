document.getElementById("signup-form").onsubmit = async (e) => {
  e.preventDefault();
  try {
    const userId = document.getElementById("userId").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!userId || !nickname || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 아이디 중복 체크
    const response = await fetch(`http://localhost:3000/user/check/userId?userId=${encodeURIComponent(userId)}`);
    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    // 회원가입 요청
    const signupResponse = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, nickname, password }),
    });

    if (signupResponse.ok) {
      alert("회원가입 성공!");
      localStorage.setItem("chat-username", nickname);
      window.location.href = "index.html"; // 회원가입 후 로그인 페이지로 이동
    } else {
      const errorData = await signupResponse.json();
      alert(errorData.message || "회원가입 실패");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
