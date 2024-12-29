document.getElementById("signup-form").onsubmit = async (e) => {
  e.preventDefault();
  try {
    const nickname = document.getElementById("username").value.trim(); // trim() 추가

    if (!nickname) {
      alert("닉네임을 입력해주세요");
      return;
    }

    // 닉네임 중복 체크
    const response = await fetch(`http://localhost:3000/user/check?nickname=${encodeURIComponent(nickname)}`);
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
      body: JSON.stringify({ nickname }),
    });

    if (signupResponse.ok) {
      alert("회원가입 성공!");
      localStorage.setItem("chat-username", nickname);
      window.location.href = "chat.html";
    } else {
      const errorData = await signupResponse.json();
      alert(errorData.message || "회원가입 실패");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
