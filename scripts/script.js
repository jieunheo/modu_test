(() => {
  // dom
  const hrs = document.getElementById("hrs");
  const min = document.getElementById("min");
  const sec = document.getElementById("sec");

  const btnStart = document.getElementById("btn-start");
  const btnStop = document.getElementById("btn-stop");
  const btnReset = document.getElementById("btn-reset");

  // 변수
  let isRunning = false;
  let timer = null;
  let time = 0;

  // 이벤트
  hrs.addEventListener("click", (e) => {
    if (isRunning) return; // 타이머 실행중에는 클릭 안되도록
    setTime(3600); // 1 * 60 * 60 => 1시간
  });
  min.addEventListener("click", (e) => {
    if (isRunning) return;
    setTime(60); // 1 * 60 => 1분
  });
  sec.addEventListener("click", (e) => {
    if (isRunning) return;
    setTime(10); // 1 * 10 => 10초
  });

  btnStart.addEventListener("click", () => {
    if (time === 0) return; // 0인 경우 시작 안되도록

    isRunning = true;

    // 스타트 -> 스탑
    btnStart.style.display = "none";
    btnStop.style.display = "flex";

    // 인터벌 시작
    timer = setInterval(() => {
      setTime(-1); // 1초씩 빼기
    }, 1000);
  });

  btnStop.addEventListener("click", () => {
    // 스탑 -> 스타트
    btnStop.style.display = "none";
    btnStart.style.display = "flex";

    clearInterval(timer);
    isRunning = false;
  });

  btnReset.addEventListener("click", () => {
    time = 0; // 시간 초기화
    clearInterval(timer); // 인터벌 클리어

    setTime(); // 00:00:00 세팅
    resetBtn();
  });

  function endTimer() {
    clearInterval(timer);
    resetBtn();

    alert("Finish"); // 알림
  }

  // 시간 세팅
  function setTime(num) {
    // 버튼 활성화
    btnStart.disabled = false;
    btnReset.disabled = false;

    // num 있는 경우 처리
    if (num) {
      time += num; // 1시간
    }

    // 시간 계산
    let h = Math.floor(time / 3600);
    let m = Math.floor((time - h * 3600) / 60);
    let s = Math.floor(time - h * 3600 - m * 60);

    // html에 세팅
    hrs.innerText = h < 10 ? `0${h}` : h;
    min.innerText = m < 10 ? `0${m}` : m;
    sec.innerText = s < 10 ? `0${s}` : s;

    // 타이머 시간 다 된 경우
    if (time === 0 && num === -1) endTimer();
  }

  // 버튼 리셋
  function resetBtn() {
    btnStop.style.display = "none";
    btnStart.style.display = "flex";

    // 버튼 비활성화
    btnStart.disabled = true;
    btnReset.disabled = true;

    isRunning = false;
  }
})();
